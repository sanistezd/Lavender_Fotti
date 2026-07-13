'use client';
import { useState, useEffect } from 'react';
import styles from './Hero.module.css';

export default function Hero() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsMenuOpen(false); // Close menu on click
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={styles.hero}>
      <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''}`}>
        <div className={styles.logo}>
          <img src="/gold-mascot.png" alt="Fotty Motion Logo" className={styles.logoMascot} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          Fotty Motion
        </div>
        
        <button className={`${styles.hamburger} ${isMenuOpen ? styles.hamburgerOpen : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </button>

        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
          <div className={styles.navItem}>
            <button className={styles.navBtn} onClick={() => scrollTo('services')}>Услуги</button>
            <div className={styles.navLine}></div>
          </div>
          <div className={styles.navItem}>
            <button className={styles.navBtn} onClick={() => scrollTo('howitworks')}>Как это работает</button>
            <div className={styles.navLine}></div>
          </div>
          <div className={styles.navItem}>
            <button className={styles.navBtn} onClick={() => scrollTo('portfolio')}>Примеры</button>
            <div className={styles.navLine}></div>
          </div>
          <img src="/visa-header.png" alt="Visa" className={styles.headerVisa} />
        </nav>
      </header>

      <div className={styles.content}>
        <div className={styles.textContent}>
          <span className={styles.badge}>Профессиональная обработка без промтов и сложных настроек</span>
          
          <div className={styles.titleContainer}>
            <h1 className={styles.title}>
              <span className={styles.titleFirstLine}>Оживляем</span><br className={styles.desktopBr} />
              <span className={styles.titleHighlight}>
                воспоминания
                <img src="/Web_UI_element4.2.png" alt="sparkles" className={styles.sparkles2} />
              </span>
            </h1>
            <div className={styles.mascotWrapperMobile}>
              <div className={styles.glowSmall}></div>
              <img 
                src="/mascot.png" 
                alt="Fotty Motion Mascot" 
                className={styles.inlineMascot}
                onError={(e) => { e.currentTarget.src = "https://placehold.co/180x180/CBAA5C/white?text=Mascot"; }}
              />
            </div>
          </div>
          
          <div className={styles.descBox}>
            <p className={styles.subtitle}>
              Фотти превратит ваши фотографии в живой ролик для подарка, памяти или красивой публикации. Просто отправьте снимки и коротко опишите, что хотите получить - обработку, подбор движения и финальную сборку мы берём на себя.
            </p>
          </div>
          <div className={styles.ctaGroup}>
            <button className={styles.ctaPrimary} onClick={() => scrollTo('services')}>
              Выбрать услугу
            </button>
            <button className={styles.ctaSecondary} onClick={() => scrollTo('portfolio')}>Примеры работ</button>
          </div>
        </div>

        <div className={styles.imageContentDesktop}>
          <div className={styles.glow}></div>
          <img 
            src="/mascot.png" 
            alt="Fotty Motion Mascot" 
            className={styles.mainMascot}
            onError={(e) => { e.currentTarget.src = "https://placehold.co/500x500/CBAA5C/white?text=Mascot"; }}
          />
        </div>
      </div>
    </section>
  );
}
