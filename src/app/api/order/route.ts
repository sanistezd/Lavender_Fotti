import { NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = '8886885060:AAECUYufrMRMsa5gNLbrKEfSm1mixKMnJIc';
const TELEGRAM_CHAT_ID = '-1003861088020';

export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    const service = formData.get('service') as string;
    const description = formData.get('description') as string;
    const contactMethod = formData.get('contactMethod') as string;
    const contactInfo = formData.get('contactInfo') as string;

    const files: File[] = [];
    for (const [key, value] of formData.entries()) {
      if (key.startsWith('file') && value instanceof File) {
        files.push(value);
      }
    }

    const escapeHtml = (unsafe: string) => {
      return (unsafe || '').replace(/[&<"']/g, function (m) {
        switch (m) {
          case '&': return '&amp;';
          case '<': return '&lt;';
          case '>': return '&gt;';
          case '"': return '&quot;';
          default: return '&#039;';
        }
      });
    };

    let formattedContact = escapeHtml(contactInfo);
    if (contactMethod === 'telegram') {
      const cleanUsername = contactInfo.replace('@', '').trim();
      if (!cleanUsername.startsWith('+') && !cleanUsername.startsWith('http')) {
        formattedContact = `<a href="https://t.me/${cleanUsername}">@${cleanUsername}</a>`;
      }
    } else if (contactMethod === 'vk') {
      let cleanVk = contactInfo.trim();
      if (!cleanVk.startsWith('http')) {
        cleanVk = `https://vk.com/${cleanVk.replace('@', '')}`;
      }
      formattedContact = `<a href="${cleanVk}">${escapeHtml(contactInfo)}</a>`;
    } else if (contactMethod === 'email') {
      formattedContact = `<a href="mailto:${contactInfo.trim()}">${escapeHtml(contactInfo)}</a>`;
    }

    const message = `🌟 <b>Новый заказ!</b>

<b>Услуга:</b> ${escapeHtml(service)}
<b>Способ связи:</b> ${escapeHtml(contactMethod)}
<b>Контакт:</b> ${formattedContact}

<b>Описание:</b>
${escapeHtml(description) || 'Не указано'}`;

    let sendRes;

    if (files.length === 0) {
      // No files — just text
      sendRes = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'HTML',
        }),
      });
    } else if (files.length === 1) {
      // 1 file — send as document with caption (= one message)
      const tgFormData = new FormData();
      tgFormData.append('chat_id', TELEGRAM_CHAT_ID);
      tgFormData.append('document', files[0]);
      tgFormData.append('caption', message.substring(0, 1024));
      tgFormData.append('parse_mode', 'HTML');

      sendRes = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendDocument`, {
        method: 'POST',
        body: tgFormData,
      });
    } else {
      // Multiple files — media group with caption on first (= one message)
      const tgFormData = new FormData();
      tgFormData.append('chat_id', TELEGRAM_CHAT_ID);

      const mediaArray = files.map((_f, i) => ({
        type: 'document' as const,
        media: `attach://file${i}`,
        ...(i === 0 ? { caption: message.substring(0, 1024), parse_mode: 'HTML' } : {}),
      }));

      tgFormData.append('media', JSON.stringify(mediaArray));
      files.forEach((f, i) => {
        tgFormData.append(`file${i}`, f);
      });

      sendRes = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMediaGroup`, {
        method: 'POST',
        body: tgFormData,
      });
    }

    const data = await sendRes.json();

    if (!sendRes.ok) {
      console.error('Telegram API error:', data);
      return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Order submission error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
