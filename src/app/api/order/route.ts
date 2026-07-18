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
    const customerName = formData.get('customerName') as string;
    const price = formData.get('price') as string;

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

    const nameLine = customerName ? `<b>Имя:</b> ${escapeHtml(customerName)}
` : '';

    let message = `🌟 <b>Новый заказ!</b>

${nameLine}<b>Услуга:</b> ${escapeHtml(service)}
<b>Цена:</b> ${price ? escapeHtml(price) + ((price || '').includes('Обсуждается') ? '' : ' ₽') : 'Не указана'}
<b>Способ связи:</b> ${escapeHtml(contactMethod)}
<b>Контакт:</b> ${formattedContact}

<b>Описание:</b>
${escapeHtml(description) || 'Не указано'}`;

    if (files.length > 0) {
      message += `\n\n📎 <b>Файлов прикреплено:</b> ${files.length}`;
    }

    // 1. Send text message first
    const textRes = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    const textData = await textRes.json();

    if (!textRes.ok) {
      console.error('Telegram API error:', textData);
      return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
    }

    // 2. Send files in parallel — don't block the success response
    if (files.length > 0) {
      const messageId = textData.result.message_id;

      const filePromises = files.map(async (file, i) => {
        try {
          const tgFormData = new FormData();
          tgFormData.append('chat_id', TELEGRAM_CHAT_ID);
          tgFormData.append('reply_to_message_id', messageId.toString());
          tgFormData.append('document', file);

          const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendDocument`, {
            method: 'POST',
            body: tgFormData,
          });

          if (!res.ok) {
            const errData = await res.text();
            console.error(`File ${i} (${file.name}) send error:`, errData);
          }
        } catch (err) {
          console.error(`File ${i} upload error:`, err);
        }
      });

      await Promise.all(filePromises);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Order submission error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
