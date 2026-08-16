import { NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8886885060:AAECUYufrMRMsa5gNLbrKEfSm1mixKMnJIc';
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '-1003861088020';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (data.event === 'payment.succeeded') {
      const payment = data.object;
      const metadata = payment.metadata || {};
      
      const messageId = metadata.telegram_message_id;
      const contact = metadata.contact || 'Не указан';
      const amount = payment.amount.value;

      if (messageId) {
        const replyText = `✅ <b>ОПЛАЧЕНО!</b>\nСумма: ${amount} ₽\nКонтакт: ${contact}\nЗаказ можно брать в работу.`;
        
        await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            reply_to_message_id: parseInt(messageId, 10),
            text: replyText,
            parse_mode: 'HTML',
          }),
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
