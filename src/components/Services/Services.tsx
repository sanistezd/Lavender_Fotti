'use client';
import { useState } from 'react';
import { Sparkles } from 'lucide-react';
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
      price: "3 000₽",
      description: [
        "Превратим вашу фотографии в полноценное видео до 60 секунд",
        "До 10 фотографий в одном заказе",
        "Обработаем снимки, добавим движение, атмосферу и соберём готовый ролик для подарка, памяти или красивой публикации",
        "Добавление фоновой музыки по вашему вкусу",
        "Приоритетная обработка заказов"
      ],
      buttonText: "Заказать ролик",
      isPremium: true
    },
    {
      id: 2,
      title: "Быстрое оживление",
      price: "1 490₽",
      description: [
        "Видеоролик длительностью до 15 секунд",
        "До 3 фотографий в одном заказе",
        "Добавление фоновой музыки по вашему вкусу",
        "Идеально подойдет для необычных сторис, аватарки и публикации в соцсетях"
      ],
      buttonText: "Оживить фото",
      isPremium: false
    },
    {
      id: 1,
      title: "Редактирование фотографий",
      price: "1 190₽",
      description: [
        "Аккуратное улучшение фото",
        "Возможность кардинально изменить стиль фотографии",
        "Добавление новых объектов или удаление лишних"
      ],
      buttonText: "Заказать обработку",
      isPremium: false
    }
  ];

  return (
    <section id="services" className={styles.servicesSection}>
      <div className={styles.headerWrap}>
        <img src="/wing-left.png" alt="Left wing" className={styles.wingLeft} />
        <h2 className={styles.title}>Наши услуги</h2>
        <img src="/wing-right.png" alt="Right wing" className={styles.wingRight} />
      </div>
      
      <div className={styles.cardsContainer}>
        {services.map((service) => (
          <div key={service.id} className={`${styles.card} ${service.isPremium ? styles.premiumCard : ''}`}>
            {service.isPremium && <div className={styles.premiumBadge}><Sparkles size={16} /> Лучший выбор</div>}
            
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>{service.title}</h3>
            </div>

            <ul className={styles.cardDescList}>
              {service.description.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <div className={styles.priceLabel}>{service.price}</div>
            <button className={styles.ctaBtn} onClick={() => handleOpenModal(service.title)}>
              {service.buttonText}
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
