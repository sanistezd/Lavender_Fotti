import { NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = '8886885060:AAECUYufrMRMsa5gNLbrKEfSm1mixKMnJIc';
const TELEGRAM_CHAT_ID = '-1003861088020';

export const maxDuration = 60; // Allow more time for Vercel to process uploads

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    const service = formData.get('service') as string;
    const description = formData.get('description') as string;
    const contactMethod = formData.get('contactMethod') as string;
    const contactInfo = formData.get('contactInfo') as string;

    // Collect files
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

    const message = `
🌟 <b>Новый заказ!</b>
    
<b>Услуга:</b> ${escapeHtml(service)}
<b>Способ связи:</b> ${escapeHtml(contactMethod)}
<b>Контакт:</b> ${formattedContact}

<b>Описание:</b>
${escapeHtml(description) || 'Не указано'}
    `.trim();

    let sendRes;

    if (files.length === 0) {
      // No files, just send text
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
      // 1 file, send as photo with caption
      const tgFormData = new FormData();
      tgFormData.append('chat_id', TELEGRAM_CHAT_ID);
      tgFormData.append('caption', message);
      tgFormData.append('parse_mode', 'HTML');
      tgFormData.append('photo', files[0]);

      sendRes = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`, {
        method: 'POST',
        body: tgFormData,
      });
    } else {
      // Multiple files, send as media group (album)
      const tgFormData = new FormData();
      tgFormData.append('chat_id', TELEGRAM_CHAT_ID);

      const mediaArray = files.map((f, i) => ({
        type: 'photo', // photo creates a nice grid album
        media: `attach://file${i}`,
        ...(i === 0 ? { caption: message, parse_mode: 'HTML' } : {})
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

    if (!sendRes.ok) {
      const errorData = await sendRes.text();
      console.error('Telegram API error:', errorData);
      return NextResponse.json({ error: 'Failed to send message to Telegram' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Order submission error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
