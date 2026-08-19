import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const paymentId = searchParams.get('id');

  if (!paymentId) {
    return NextResponse.json({ error: 'No payment ID' }, { status: 400 });
  }

  if (!process.env.YOOKASSA_SHOP_ID || !process.env.YOOKASSA_SECRET_KEY) {
    return NextResponse.json({ error: 'YooKassa not configured' }, { status: 500 });
  }

  try {
    const authHeader = 'Basic ' + Buffer.from(`${process.env.YOOKASSA_SHOP_ID}:${process.env.YOOKASSA_SECRET_KEY}`).toString('base64');
    
    const ykRes = await fetch(`https://api.yookassa.ru/v3/payments/${paymentId}`, {
      method: 'GET',
      headers: {
        'Authorization': authHeader
      }
    });

    const ykData = await ykRes.json();

    if (ykRes.ok) {
      return NextResponse.json({ status: ykData.status });
    } else {
      return NextResponse.json({ error: 'YooKassa API Error' }, { status: 500 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
