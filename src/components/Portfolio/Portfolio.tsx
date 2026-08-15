'use client';
import { useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import styles from './Portfolio.module.css';

const categories = ['Оживление', 'Редактирование'];

interface PortfolioItem {
  id: number;
  category: string;
  isPremium: boolean;
  title: string;
  type: string;
  src?: string;
  srcBefore?: string;
  srcAfter?: string;
}

const examples: PortfolioItem[] = [
  { 
    id: 1, 
    category: 'Оживление', 
    isPremium: true, 
    title: 'Анимация кота', 
    type: 'before-after', 
    srcBefore: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=600&h=800&fit=crop', 
    srcAfter: '/premium1.mp4' 
  }
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
