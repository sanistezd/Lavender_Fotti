'use client';
import { useState } from 'react';
import styles from './HowItWorks.module.css';

export default function HowItWorks() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const steps = [
    {
      title: "Выберите услугу",
      desc: "Выберите формат: Premium-ролик, быстрое оживление, или редактирование фотографии."
    },
    {
      title: "Отправьте фото и пожелания",
      desc: "Загрузите фотографии и коротко опишите, что хотите получить. Не нужно писать промты или разбираться в нейросетях - достаточно объяснить идею обычными словами."
    },
    {
      title: "Подтвердите заказ и оплатите",
      desc: "После оплаты заявка попадет к Фотти в работу. Мы изучим материалы, при необходимости уточним детали и начнём обработку."
    },
    {
      title: "Получите готовый результат",
      desc: "Готовый результат отправим на указанный вами контакт. Видео передаётся в формате MP4, обработанные фотографии - в PNG или JPG."
    }
  ];


  return (
    <section id="howitworks" className={styles.section}>
      <h2 className={styles.title}>Как это работает?</h2>
      <div className={styles.stepsContainer}>
        {steps.map((step, index) => (
          <div 
            key={index} 
            className={styles.step}
            onMouseEnter={() => setHoveredStep(index)}
            onMouseLeave={() => setHoveredStep(null)}
          >
            <div className={styles.stepNumber}>{index + 1}</div>
            <div className={styles.stepContent}>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.desc}</p>
            </div>
            {hoveredStep === index && (
              <img src="/hand.jpg" alt="Pointer" className={styles.handPointer} />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
