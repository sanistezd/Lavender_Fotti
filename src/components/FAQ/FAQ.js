'use client';
import { useState } from 'react';
import styles from './FAQ.module.css';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    { q: "Сколько времени занимает выполнение заказа?", a: "В зависимости от сложности: простое редактирование и быстрая анимация занимают от 1 до 3 дней. Premium оживление — от 3 до 7 дней." },
    { q: "Какие форматы фото вы принимаете?", a: "Мы принимаем любые популярные форматы (JPEG, PNG, HEIC). Желательно присылать фото в максимально возможном разрешении." },
    { q: "Можно ли внести правки в готовую работу?", a: "Да, мы предоставляем возможность внести до 3 бесплатных правок, чтобы вы остались полностью довольны результатом." },
    { q: "Как происходит оплата?", a: "Оплата происходит после согласования деталей заказа. Мы работаем по 50% предоплате, остаток — после утверждения финального результата." }
  ];

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Частые вопросы</h2>
      <div className={styles.container}>
        {faqs.map((faq, i) => (
          <div 
            key={i} 
            className={`${styles.item} ${openIndex === i ? styles.open : ''}`}
            onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
          >
            <div className={styles.questionRow}>
              <h3 className={styles.question}>{faq.q}</h3>
              {openIndex === i ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
            {openIndex === i && <p className={styles.answer}>{faq.a}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
