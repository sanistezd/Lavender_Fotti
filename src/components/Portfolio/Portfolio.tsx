'use client';
import { useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import styles from './Portfolio.module.css';

const categories = ['Оживление', 'Редактирование'];

const examples = [
  { id: 1, category: 'Оживление', isPremium: true, title: 'Анимация кота', type: 'before-after', srcBefore: '/cat-before.jpg', srcAfter: '/cat-after.mp4' },
  { id: 2, category: 'Оживление', isPremium: false, title: 'Анимация портрета', type: 'video', src: '/fast1.mp4' },
  { id: 3, category: 'Редактирование', isPremium: false, title: 'Цветокоррекция', type: 'image', src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&h=800&fit=crop' },
  { id: 4, category: 'Оживление', isPremium: true, title: 'Видео-коллаж', type: 'video', src: '/fast1.mp4' },
  { id: 5, category: 'Оживление', isPremium: false, title: 'Оживление питомца', type: 'video', src: '/premium1.mp4' },
  { id: 6, category: 'Редактирование', isPremium: false, title: 'Ретушь фото', type: 'image', src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=600&h=800&fit=crop' },
];

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('Оживление');
  const [selectedMedia, setSelectedMedia] = useState<{type: string, src: string} | null>(null);

  const filteredExamples = examples.filter(ex => ex.category === activeTab);

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
            {item.type === 'before-after' ? (
              <div className={styles.splitContainer}>
                <img src={item.srcBefore} alt="Before" className={styles.beforeImage} />
                <video src={item.srcAfter} autoPlay loop muted playsInline className={styles.afterVideo} />
                <div className={styles.splitLine}>
                  <div className={styles.splitBadge}>ДО / ПОСЛЕ</div>
                </div>
              </div>
            ) : item.type === 'video' ? (
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
            
            {item.isPremium && (
              <div className={styles.premiumBadge}>
                <Sparkles size={14} className={styles.sparkleIcon} /> Premium
              </div>
            )}
            <div 
              className={styles.itemOverlay} 
              onClick={() => setSelectedMedia({ type: item.type === 'before-after' ? 'video' : item.type, src: item.type === 'before-after' && item.srcAfter ? item.srcAfter : item.src || '' })}
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
