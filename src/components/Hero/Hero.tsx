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
          <img src="/gold-mascot.png" alt="Lavender Fotti Logo" className={styles.logoMascot} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          Lavender Fotti
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
            <button className={styles.navBtn} onClick={() => scrollTo('howItWorks')}>Как это работает</button>
            <div className={styles.navLine}></div>
          </div>
          <div className={styles.navItem}>
            <button className={styles.navBtn} onClick={() => scrollTo('portfolio')}>Примеры</button>
            <div className={styles.navLine}></div>
          </div>
        </nav>
      </header>

      <div className={styles.content}>
        <div className={styles.textContent}>
          <span className={styles.badge}>Профессиональная обработка</span>
          
          <div className={styles.titleContainer}>
            <img src="/Web_UI_element1.png" alt="sparkles" className={styles.sparkles1} />
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
                alt="Lavender Fotti Mascot" 
                className={styles.inlineMascot}
                onError={(e) => { e.currentTarget.src = "https://placehold.co/180x180/CBAA5C/white?text=Mascot"; }}
              />
            </div>
          </div>
          
          <div className={styles.descBox}>
            <p className={styles.subtitle}>
              Создаем уникальные видео-истории и доводим ваши снимки до идеала. Индивидуальная ручная проработка каждого кадра от профессионалов.
            </p>
          </div>
          <div className={styles.ctaGroup}>
            <button className={styles.ctaPrimary} onClick={() => scrollTo('services')}>
              Выбрать услугу
            </button>
            <button className={styles.ctaSecondary} onClick={() => scrollTo('portfolio')}>Смотреть работы</button>
          </div>
        </div>

        <div className={styles.imageContentDesktop}>
          <div className={styles.glow}></div>
          <img 
            src="/mascot.png" 
            alt="Lavender Fotti Mascot" 
            className={styles.mainMascot}
            onError={(e) => { e.currentTarget.src = "https://placehold.co/500x500/CBAA5C/white?text=Mascot"; }}
          />
        </div>
      </div>
    </section>
  );
}
