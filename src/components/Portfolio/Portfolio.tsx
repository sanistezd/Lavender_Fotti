'use client';
import { useState } from 'react';
import { X } from 'lucide-react';
import styles from './Portfolio.module.css';

const categories = ['Все', 'Premium', 'Быстрое', 'Редактирование'];

const examples = [
  { id: 1, category: 'Premium', title: 'Оживление пейзажа', type: 'video', src: '/sample-video.mp4' },
  { id: 2, category: 'Быстрое', title: 'Анимация портрета', type: 'video', src: '/sample-video.mp4' },
  { id: 3, category: 'Редактирование', title: 'Цветокоррекция', type: 'image', src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&h=800&fit=crop' },
  { id: 4, category: 'Premium', title: 'Видео-коллаж', type: 'video', src: '/sample-video.mp4' },
  { id: 5, category: 'Быстрое', title: 'Оживление питомца', type: 'video', src: '/sample-video.mp4' },
  { id: 6, category: 'Редактирование', title: 'Ретушь фото', type: 'image', src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=600&h=800&fit=crop' },
];

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('Все');
  const [selectedMedia, setSelectedMedia] = useState<{type: string, src: string} | null>(null);

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
            <div 
              className={styles.itemOverlay} 
              onClick={() => setSelectedMedia({ type: item.type, src: item.src })}
            >
              <div className={styles.overlayContent}>
                <h3 className={styles.itemTitle}>{item.title}</h3>
                <span className={styles.itemCategory}>{item.category}</span>
                <span className={styles.expandHint}>Нажмите, чтобы открыть</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedMedia && (
        <div className={styles.lightbox} onClick={() => setSelectedMedia(null)}>
          <button className={styles.lightboxClose} onClick={() => setSelectedMedia(null)}>
            <X size={32} />
          </button>
          <div className={styles.lightboxContent} onClick={e => e.stopPropagation()}>
            {selectedMedia.type === 'video' ? (
              <video src={selectedMedia.src} controls autoPlay className={styles.lightboxMedia} />
            ) : (
              <img src={selectedMedia.src} alt="Full screen" className={styles.lightboxMedia} />
            )}
          </div>
        </div>
      )}
    </section>
  );
}
