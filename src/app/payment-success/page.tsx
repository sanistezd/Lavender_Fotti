import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function PaymentSuccess() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000', color: '#fff', textAlign: 'center', padding: '20px' }}>
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
