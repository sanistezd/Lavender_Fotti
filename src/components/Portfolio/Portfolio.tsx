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
    title: 'Анимация', 
    type: 'before-after', 
    srcBefore: '/cat-before.jpg', 
    srcAfter: '/cat-after.mp4' 
  },
  { 
    id: 2, 
    category: 'Оживление', 
    isPremium: true, 
    title: 'Оживление пейзажа', 
    type: 'before-after', 
    srcBefore: '/landscape-before.jpg', 
    srcAfter: '/landscape-after.mp4' 
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
          <div key={item.id} className={`${styles.item} ${item.type === 'before-after' ? styles.itemSpan2 : ''} animate-fade-in`}>
            {item.type === 'before-after' ? (
              <div className={styles.beforeAfterLayout}>
                <div className={styles.mediaWrapper}>
                  <img src={item.srcBefore} alt="Before" className={styles.mediaContent} />
                  <span className={styles.mediaLabel}>ДО</span>
                </div>
                
                <div className={styles.arrowContainer}>
                  <img src="/arrow.png" alt="Вправо" className={styles.arrowIcon} />
                </div>
                
                <div className={styles.mediaWrapper}>
                  <video src={item.srcAfter} autoPlay loop muted playsInline className={styles.mediaContent} />
                  <span className={styles.mediaLabel}>ПОСЛЕ</span>
                  
                  {item.isPremium && (
                    <div className={styles.premiumBadge}>
                      <Sparkles size={14} className={styles.sparkleIcon} /> Premium
                    </div>
                  )}

                  <div 
                    className={styles.clickOverlay} 
                    onClick={() => setSelectedMedia({ type: 'video', src: item.srcAfter || '' })}
                  >
                    <span className={styles.expandHint}>Нажмите, чтобы открыть</span>
                  </div>
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
            
            {item.type !== 'before-after' && item.isPremium && (
              <div className={styles.premiumBadge}>
                <Sparkles size={14} className={styles.sparkleIcon} /> Premium
              </div>
            )}
            
            {item.type !== 'before-after' && (
              <div 
                className={styles.itemOverlay} 
                onClick={() => setSelectedMedia({ type: item.type, src: item.src || '' })}
              >
                <div className={styles.overlayContent}>
                  <h3 className={styles.itemTitle}>{item.title}</h3>
                  <span className={styles.itemCategory}>{item.category}</span>
                  <span className={styles.expandHint}>Нажмите, чтобы открыть</span>
                </div>
              </div>
            )}
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
