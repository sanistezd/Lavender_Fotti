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
  srcBefore1?: string;
  srcBefore2?: string;
  srcPlus?: string;
}

const examples: PortfolioItem[] = [
  { 
    id: 6, 
    category: 'Оживление', 
    isPremium: true, 
    title: 'Объединение фото', 
    type: 'merge-before-after', 
    srcBefore1: '/merge-girl.jpg', 
    srcBefore2: '/merge-guy.jpg',
    srcPlus: '/plus-icon.png',
    srcAfter: '/hug.mp4' 
  },
  { 
    id: 2, 
    category: 'Оживление', 
    isPremium: false, 
    title: 'Оживление пейзажа', 
    type: 'before-after', 
    srcBefore: '/landscape-before.jpg', 
    srcAfter: '/landscape-after.mp4' 
  },
  { 
    id: 1, 
    category: 'Оживление', 
    isPremium: false, 
    title: 'Анимация', 
    type: 'before-after', 
    srcBefore: '/cat-before.jpg', 
    srcAfter: '/cat-after.mp4' 
  },
  { 
    id: 3, 
    category: 'Редактирование', 
    isPremium: false, 
    title: 'Улучшение фото', 
    type: 'before-after', 
    srcBefore: '/cat2-before.jpg', 
    srcAfter: '/cat2-after.jpg' 
  },
  { 
    id: 4, 
    category: 'Редактирование', 
    isPremium: false, 
    title: 'Цветокоррекция', 
    type: 'before-after', 
    srcBefore: '/tree-before.jpg', 
    srcAfter: '/tree-after.jpg' 
  },
  { 
    id: 5, 
    category: 'Редактирование', 
    isPremium: false, 
    title: 'Редактирование авто', 
    type: 'before-after', 
    srcBefore: '/porsche-before.jpg', 
    srcAfter: '/porsche-after.jpg' 
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

      <div className={styles.portfolioWrapper}>
        <div className={styles.grid}>
          {filteredExamples.map(item => (
            <div key={item.id} className={`${styles.item} ${item.type.includes('before-after') ? styles.itemSpan2 : ''} animate-fade-in`}>
            {item.type.includes('before-after') ? (
              <div className={styles.beforeAfterLayout}>
                <div className={item.type === 'merge-before-after' ? styles.mediaWrapperMergeLeft : styles.mediaWrapper}>
                  {item.type === 'merge-before-after' ? (
                    <div className={styles.mergeBeforeContainer}>
                      <img src={item.srcBefore1} alt="Before 1" className={styles.mergeImage} />
                      <img src={item.srcPlus} alt="+" className={styles.mergePlus} />
                      <img src={item.srcBefore2} alt="Before 2" className={styles.mergeImage} />
                    </div>
                  ) : (
                    <img src={item.srcBefore} alt="Before" className={styles.mediaContent} />
                  )}
                  <span className={styles.mediaLabel}>ДО</span>
                </div>
                
                <div className={styles.arrowContainer}>
                  <img src="/arrow.png" alt="Вправо" className={styles.arrowIcon} />
                </div>
                
                <div className={styles.mediaWrapper}>
                  {item.srcAfter?.endsWith('.mp4') ? (
                    <video src={item.srcAfter} autoPlay loop muted playsInline webkit-playsinline="true" className={styles.mediaContent} />
                  ) : (
                    <img src={item.srcAfter} alt="After" className={styles.mediaContent} />
                  )}
                  <span className={styles.mediaLabel}>ПОСЛЕ</span>
                  
                  {item.isPremium && (
                    <div className={styles.premiumBadge}>
                      <Sparkles size={14} className={styles.sparkleIcon} /> Premium
                    </div>
                  )}

                  <div 
                    className={styles.clickOverlay} 
                    onClick={() => setSelectedMedia({ type: item.srcAfter?.endsWith('.mp4') ? 'video' : 'image', src: item.srcAfter || '' })}
                  >
                    <span className={styles.expandHint}>Нажмите, чтобы открыть</span>
                  </div>
                </div>
              </div>
            ) : item.type === 'video' ? (
              <video 
                src={item.src} 
                autoPlay 
                loop 
                muted 
                playsInline 
                webkit-playsinline="true"
                className={styles.itemVideo} 
              />
            ) : item.type === 'animated-image' ? (
              <img src={item.src} alt={item.title} className={styles.itemImageAnimated} />
            ) : (
              <img src={item.src} alt={item.title} className={styles.itemImage} />
            )}
            
            {!item.type.includes('before-after') && item.isPremium && (
              <div className={styles.premiumBadge}>
                <Sparkles size={14} className={styles.sparkleIcon} /> Premium
              </div>
            )}
            
            {!item.type.includes('before-after') && (
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
      </div>

      {selectedMedia && (
        <div className={styles.lightbox} onClick={() => setSelectedMedia(null)}>
          <button className={styles.lightboxClose} onClick={() => setSelectedMedia(null)}>
            <X size={32} />
          </button>
          <div className={styles.lightboxContent} onClick={e => e.stopPropagation()}>
            {selectedMedia.type === 'video' ? (
              <video src={selectedMedia.src} controls autoPlay playsInline webkit-playsinline="true" className={styles.lightboxMedia} />
            ) : (
              <img src={selectedMedia.src} alt="Full screen" className={styles.lightboxMedia} />
            )}
          </div>
        </div>
      )}
    </section>
  );
}
