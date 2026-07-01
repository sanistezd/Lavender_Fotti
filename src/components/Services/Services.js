'use client';
import { useState } from 'react';
import styles from './Services.module.css';
import OrderModal from '../OrderModal/OrderModal';

export default function Services() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  const handleOpenModal = (serviceName) => {
    setSelectedService(serviceName);
    setIsModalOpen(true);
  };

  const services = [
    {
      id: 3,
      title: "Premium оживление",
      description: "Полноценное длинное видео из фото с возможностью добавить коллаж. Профессиональная проработка деталей.",
      isPremium: true
    },
    {
      id: 1,
      title: "Редактирование фотографий",
      description: "Базовое редактирование фото, цветокоррекция, ретушь. Отличный выбор для улучшения качества снимков.",
      isPremium: false
    },
    {
      id: 2,
      title: "Быстрое оживление",
      description: "Короткая анимация (5-15 секунд). Вдохнем жизнь в вашу фотографию для соцсетей.",
      isPremium: false
    }
  ];

  return (
    <section id="services" className={styles.servicesSection}>
      <div className={styles.headerWrap}>
        <h2 className={styles.title}>Наши услуги</h2>
      </div>
      
      <div className={styles.cardsContainer}>
        {services.map((service) => (
          <div key={service.id} className={`${styles.card} ${service.isPremium ? styles.premiumCard : ''}`}>
            <h3 className={styles.cardTitle}>{service.title}</h3>
            <p className={styles.cardDesc}>{service.description}</p>
            <button className={styles.ctaBtn} onClick={() => handleOpenModal(service.title)}>
              Начать
            </button>
          </div>
        ))}
      </div>

      <OrderModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        serviceName={selectedService} 
      />
    </section>
  );
}
