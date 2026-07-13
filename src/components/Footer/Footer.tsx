'use client';

import styles from './Footer.module.css';

export default function Footer() {
  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText('Fottymotion@gmail.com');
    alert('Email Fottymotion@gmail.com скопирован в буфер обмена!');
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.ctaSection}>
        <h2 className={styles.title}>Нужен индивидуальный заказ?</h2>
        <p className={styles.subtitle}>Если готовые услуги не подходят или у вас есть особая идея, оставьте контакт - мы свяжемся с вами, обсудим задачу и предложим подходящий формат.</p>
        <form id="order-form" className={styles.form}>
          <input type="text" placeholder="Ваше имя" className={styles.input} />
          <input type="text" placeholder="Контакт для связи (Telegram/WhatsApp)" className={styles.input} />
          <button type="submit" className={styles.submitBtn}>
            Отправить заявку
          </button>
          <p className={styles.formNote}>Стоимость и срок индивидуального заказа обсуждаются отдельно. Оплата — после согласования деталей.</p>
        </form>
      </div>

      <div className={styles.bottomSection}>
        <div className={styles.brand}>
          <h3 className={styles.logo}>Fotty Motion</h3>
        </div>
        
        <div className={styles.rightSection}>
          <div className={styles.paymentMethods}>
            <span className={styles.visaText}>VISA</span>
          </div>
          <div className={styles.contacts}>
            <a href="https://vk.com/prostomarl" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>VK</a>
            <a href="https://t.me/prostomarl" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>Telegram</a>
            <a href="mailto:Fottymotion@gmail.com" onClick={handleEmailClick} className={styles.socialLink}>Email</a>
          </div>
        </div>
      </div>
      
      <div className={styles.copyright}>
        <div className={styles.legalLinks}>
          <a href="/legal" className={styles.legalBtn}>Правовая информация</a>
        </div>
        © {new Date().getFullYear()} Fotty Motion. Все права защищены.
      </div>
    </footer>
  );
}
