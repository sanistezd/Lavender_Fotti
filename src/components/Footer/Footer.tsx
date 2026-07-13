import styles from './Footer.module.css';

export default function Footer() {
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
            <svg viewBox="0 0 38 12" width="60" height="20" fill="#1434CB" aria-label="Visa">
              <path d="M15.42 11.58L17.86 0h3.69l-2.44 11.58h-3.69zm18.91-11.23c-1.01-.27-2.61-.53-4.22-.53-4.63 0-7.89 2.22-7.92 5.39-.03 2.34 2.28 3.65 4.02 4.43 1.78.79 2.38 1.31 2.38 2.02-.03 1.08-1.42 1.58-2.73 1.58-1.84 0-2.82-.25-4.32-.87l-.59-.26-.53 3.1c1.07.45 3.02.83 5.06.85 5.02 0 8.23-2.28 8.26-5.5.03-1.87-1.28-3.3-3.86-4.44-1.6-.74-2.58-1.24-2.58-2 0-.69.83-1.41 2.61-1.41 1.48-.03 2.58.28 3.44.64l.42.17.56-3.17zm-21.73 9.3l-1.92-8.54c-.26-1.12-1.04-1.45-1.92-1.45h-4.3L0 11.58h3.87s.6-.57.73-1.1c.14-.52 2.1-9.1 2.1-9.1h.06l3.35 10.2h3.9l1.68-11.23h-3.52v9.3zM34.78 0h-2.88c-1.08 0-1.89.31-2.35 1.41l-4.44 10.17h3.9l.78-2.01h4.74l.45 2.01h3.45L34.78 0zm-2.45 6.94c.15-.38 2.37-5.57 2.37-5.57h.03s.4 2.11.75 3.51c.36 1.4.36 1.4.36 1.4h-3.51z"/>
            </svg>
          </div>
          <div className={styles.contacts}>
            <a href="https://instagram.com/prostomarl" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>Instagram</a>
            <a href="https://t.me/prostomarl" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>Telegram</a>
            <a href="mailto:Fottymotion@gmail.com" className={styles.socialLink}>Email</a>
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
