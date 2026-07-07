import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.ctaSection}>
        <h2 className={styles.title}>Готовы преобразить ваши фото?</h2>
        <p className={styles.subtitle}>Оставьте заявку, и мы свяжемся с вами в ближайшее время</p>
        <form id="order-form" className={styles.form}>
          <input type="text" placeholder="Ваше имя" className={styles.input} />
          <input type="text" placeholder="Контакт для связи (Telegram/WhatsApp)" className={styles.input} />
          <button type="submit" className={styles.submitBtn}>
            Отправить заявку
          </button>
        </form>
      </div>

      <div className={styles.bottomSection}>
        <div className={styles.brand}>
          <h3 className={styles.logo}>HighQuality</h3>
          <p className={styles.desc}>Прокатись на волне креатива</p>
        </div>
        
        <div className={styles.contacts}>
          <a href="#" className={styles.socialLink}>Instagram</a>
          <a href="#" className={styles.socialLink}>Telegram</a>
          <a href="#" className={styles.socialLink}>Email</a>
        </div>
      </div>
      
      <div className={styles.copyright}>
        © {new Date().getFullYear()} Fotty Motion. Все права защищены.
      </div>
    </footer>
  );
}
