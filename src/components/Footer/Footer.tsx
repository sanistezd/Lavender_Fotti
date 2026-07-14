'use client';

import { useState } from 'react';
import styles from './Footer.module.css';
import { Sparkles, Send, Mail } from 'lucide-react';

const VkIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.77 17.29h.31v-3.57c2.01.2 3.53 1.67 4.14 3.57h2.84c-.78-2.84-2.83-4.41-4.11-5.01 1.28-.74 3.08-2.54 3.51-4.98h-2.58c-.56 1.98-2.22 3.78-3.8 3.95V7.3H10.5v6.92c-1.6-.4-3.62-2.34-3.71-6.92H4.05c.13 6.24 3.25 9.99 8.72 9.99Z" />
  </svg>
);

export default function Footer() {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [contactMethod, setContactMethod] = useState<'telegram' | 'vk' | 'email'>('telegram');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText('Fottymotion@gmail.com');
    alert('Email Fottymotion@gmail.com скопирован в буфер обмена!');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !contact) {
      alert('Пожалуйста, заполните все поля');
      return;
    }
    
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('service', 'Индивидуальный заказ');
      formData.append('description', 'Заявка из футера (Нужен индивидуальный заказ)');
      formData.append('contactMethod', contactMethod);
      formData.append('contactInfo', `Имя: ${name} | Контакт: ${contact}`);

      const res = await fetch('/api/order', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setIsSuccess(true);
      } else {
        alert('Ошибка при отправке. Попробуйте еще раз.');
      }
    } catch (err) {
      alert('Ошибка соединения. Проверьте интернет.');
    }
    setIsSubmitting(false);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.ctaSection}>
        {isSuccess ? (
          <div className={styles.successScreen}>
            <div className={styles.successIcon}>
              <Sparkles size={48} className={styles.star} color="var(--color-gold)" />
            </div>
            <h2 className={styles.title}>Спасибо за заявку!</h2>
            <p className={styles.subtitle}>Мы получили ваши контакты и свяжемся с вами в ближайшее время для обсуждения индивидуального заказа.</p>
          </div>
        ) : (
          <>
            <h2 className={styles.title}>Нужен индивидуальный заказ?</h2>
            <p className={styles.subtitle}>Если готовые услуги не подходят или у вас есть особая идея, оставьте контакт - мы свяжемся с вами, обсудим задачу и предложим подходящий формат.</p>
            <form id="order-form" className={styles.form} onSubmit={handleSubmit}>
              <input 
                type="text" 
                placeholder="Ваше имя" 
                className={styles.input}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <div className={styles.contactSelectors}>
                <div 
                  className={`${styles.contactMethod} ${contactMethod === 'telegram' ? styles.contactMethodActive : ''}`}
                  onClick={() => setContactMethod('telegram')}
                >
                  <div className={styles.contactIconCircle}>
                    <Send size={24} className={contactMethod === 'telegram' ? styles.iconGold : styles.iconGray} />
                  </div>
                  <span>Telegram</span>
                </div>

                <div 
                  className={`${styles.contactMethod} ${contactMethod === 'vk' ? styles.contactMethodActive : ''}`}
                  onClick={() => setContactMethod('vk')}
                >
                  <div className={styles.contactIconCircle}>
                    <VkIcon size={28} />
                  </div>
                  <span>VK</span>
                </div>

                <div 
                  className={`${styles.contactMethod} ${contactMethod === 'email' ? styles.contactMethodActive : ''}`}
                  onClick={() => setContactMethod('email')}
                >
                  <div className={styles.contactIconCircle}>
                    <Mail size={24} className={contactMethod === 'email' ? styles.iconGold : styles.iconGray} />
                  </div>
                  <span>Email</span>
                </div>
              </div>

              <input 
                type="text" 
                placeholder={
                  contactMethod === 'telegram' ? 'Введите ваш @username в Telegram' :
                  contactMethod === 'vk' ? 'Введите ссылку на профиль VK' :
                  'Введите Email'
                } 
                className={styles.input}
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
              <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
              </button>
              <p className={styles.formNote}>Стоимость и срок индивидуального заказа обсуждаются отдельно. Оплата — после согласования деталей.</p>
            </form>
          </>
        )}
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
