'use client';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PaymentSuccess() {
  const [isValid, setIsValid] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const paymentId = localStorage.getItem('pendingPaymentId');
    if (!paymentId) {
      router.replace('/');
      return;
    }

    const checkPayment = async () => {
      try {
        const res = await fetch(`/api/check-payment?id=${paymentId}`);
        const data = await res.json();
        if (data.status === 'succeeded') {
          setIsValid(true);
          localStorage.removeItem('pendingPaymentId');
        } else if (data.status === 'pending') {
          // If still pending, they probably cancelled or closed YooKassa
          router.replace('/');
        } else {
          router.replace('/');
        }
      } catch (e) {
        router.replace('/');
      }
    };

    checkPayment();
  }, [router]);

  if (!isValid) {
    return (
      <main style={{ minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000', color: '#fff' }}>
        <p>Проверка платежа...</p>
      </main>
    );
  }

  return (
    <main style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000', color: '#fff', textAlign: 'center', padding: '20px' }}>
      <div style={{ background: 'rgba(255,255,255,0.05)', padding: '40px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Sparkles size={64} style={{ color: '#d4af37', marginBottom: '24px' }} />
        <h1 style={{ fontSize: '2rem', marginBottom: '16px', fontFamily: 'var(--font-playfair)' }}>Оплата успешно завершена!</h1>
        <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '32px', maxWidth: '400px', lineHeight: '1.6' }}>
          Спасибо за ваш заказ! Мы уже получили подтверждение от банка и передали ваши материалы в работу. Готовый результат будет отправлен по указанным контактам.
        </p>
        <Link href="/" style={{ backgroundColor: '#d4af37', color: '#000', padding: '12px 32px', borderRadius: '30px', textDecoration: 'none', fontWeight: 'bold' }}>
          На главную
        </Link>
      </div>
    </main>
  );
}
