'use client';

import { useState } from 'react';
import styles from './Footer.module.css';
import { Sparkles } from 'lucide-react';

export default function Footer() {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
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
      formData.append('contactMethod', 'telegram/vk/email');
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
              <input 
                type="text" 
                placeholder="Контакт для связи (Telegram/VK/Email)" 
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
