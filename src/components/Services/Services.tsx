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
      price: "3000₽",
      description: [
        "Превратим вашу фотографии в полноценное видео до 60 секунд",
        "Можно добавить до 10 изображений",
        "Обработаем снимки, добавим движение, атмосферу и соберём готовый ролик для подарка, памяти или красивой публикации",
        "Добавление фоновой музыки по вашему вкусу",
        "Приоритетная обработка заказов"
      ],
      buttonText: "Заказать ролик (Цена 3000 р)",
      isPremium: true
    },
    {
      id: 2,
      title: "Быстрое оживление",
      price: "1490₽",
      description: [
        "Идеально подойдет для необычных сторис, аватарки и публикации в соцсетях",
        "Видеоролик длительностью до 15 секунд",
        "Возможность использовать до 3 изображений",
        "Добавление фоновой музыки по вашему вкусу"
      ],
      buttonText: "Оживить фото (Цена 1490р)",
      isPremium: false
    },
    {
      id: 1,
      title: "Редактирование фотографии",
      price: "1190₽",
      description: [
        "Аккуратное улучшение фото",
        "Возможность кардинально изменить стиль фотографии",
        "Добавление новых объектов или удаление лишних"
      ],
      buttonText: "Заказать обработку (Цена 1190р)",
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
            {service.isPremium && <div className={styles.premiumBadge}><Sparkles size={16} /> Лучший выбор</div>}
            
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>{service.title}</h3>
            </div>

            <ul className={styles.cardDescList}>
              {service.description.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
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
