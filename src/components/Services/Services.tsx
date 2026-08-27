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
      id: 1,
      title: "Редактирование фотографий",
      price: "1 090 ₽",
      description: [
        "Изменим фотографии по вашему желанию: фон, стиль, детали или отдельные объекты",
        "Можем создать общий кадр из разных фотографий - например, поместить вместе людей с разных снимков или сделать так, будто они обнимаются",
        "При необходимости улучшим качество и детализацию изображения",
        "В стоимость входит работа с 2 фотографиями: отдельно или для создания одного общего кадра",
        "Можно добавить ещё до 3 фотографий - по 175 ₽ за каждую"
      ],
      buttonText: "Заказать обработку",
      isPremium: false
    },
    {
      id: 3,
      title: "Premium оживление",
      price: "3 290 ₽",
      description: [
        "Превратим одну или несколько ваших фотографий в видео длительностью до 15 секунд",
        "В одном итоговом видеоролике можно использовать до 3 изображений",
        "Подходит для оживления людей, животных, персонажей, природы и отдельных элементов кадра",
        "Приоритетное выполнение заказа"
      ],
      buttonText: "Заказать ролик",
      isPremium: true
    },
    {
      id: 2,
      title: "Быстрое оживление",
      price: "1 390 ₽",
      description: [
        "Превратим одну вашу фотографию в видео длительностью до 8 секунд",
        "Добавим движение ключевым элементам кадра",
        "Подходит для сторис, публикаций и приятного сюрприза близкому человеку"
      ],
      buttonText: "Оживить фото",
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
      <p className={styles.sectionSubtitle}>Выберите одну или несколько услуг под вашу задачу.</p>
      
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
