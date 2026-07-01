'use client';
import { useState } from 'react';
import styles from './Portfolio.module.css';

const categories = ['Все', 'Premium', 'Быстрое', 'Редактирование'];

const examples = [
  { id: 1, category: 'Premium', title: 'Оживление пейзажа', type: 'video', src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
  { id: 2, category: 'Быстрое', title: 'Анимация портрета', type: 'video', src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4' },
  { id: 3, category: 'Редактирование', title: 'Цветокоррекция', type: 'image', src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&h=800&fit=crop' },
  { id: 4, category: 'Premium', title: 'Видео-коллаж', type: 'video', src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4' },
  { id: 5, category: 'Быстрое', title: 'Оживление питомца', type: 'video', src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4' },
  { id: 6, category: 'Редактирование', title: 'Ретушь фото', type: 'image', src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=600&h=800&fit=crop' },
];

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('Все');

  const filteredExamples = activeTab === 'Все' 
    ? examples 
    : examples.filter(ex => ex.category === activeTab);

  return (
    <section id="portfolio" className={styles.section}>
      <h2 className={styles.title}>Примеры работ</h2>
      
      <div className={styles.tabs}>
        {categories.map(cat => (
          <button 
            key={cat}
            className={`${styles.tabBtn} ${activeTab === cat ? styles.activeTab : ''}`}
            onClick={() => setActiveTab(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {filteredExamples.map(item => (
          <div key={item.id} className={`${styles.item} animate-fade-in`}>
            {item.type === 'video' ? (
              <video 
                src={item.src} 
                className={styles.itemImage} 
                autoPlay 
                loop 
                muted 
                playsInline
              />
            ) : item.type === 'animated-image' ? (
              <img src={item.src} alt={item.title} className={styles.itemImageAnimated} />
            ) : (
              <img src={item.src} alt={item.title} className={styles.itemImage} />
            )}
            <div className={styles.itemOverlay}>
              <h3 className={styles.itemTitle}>{item.title}</h3>
              <span className={styles.itemCategory}>{item.category}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
