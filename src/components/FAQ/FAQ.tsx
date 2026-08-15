'use client';
import { useState } from 'react';
import styles from './FAQ.module.css';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    { q: "Сколько времени занимает выполнение заказа?", a: "Большинство заказов выполняется в течение нескольких рабочих часов. Premium-заказы выполняем в приоритетном порядке. Если потребуется больше времени, заранее сообщим срок.\n\nЧасы выполнения заказов: ежедневно с 10:00 до 21:00 по московскому времени." },
    { q: "Как происходит оплата?", a: "После выбора услуги вы загружаете фотографии, указываете пожелания и контакт для связи. Затем переходите к оплате заказа. После успешной оплаты заявка автоматически передается нам в работу, а Фотти приступает к обработке материалов." },
    { q: "Можно ли внести правки в готовый результат?", a: "Да. После получения результата можно прислать один список небольших изменений, а в Premium - до трёх. Доработаем результат в рамках первоначального запроса. Новая идея или замена исходных фотографий оплачивается отдельно." },
    { q: "Мои фотографии будут конфиденциальны?", a: "Да. Фотти бережно относится к личным материалам: фотографии используются только для выполнения заказа. Мы не публикуем исходники, готовые работы, переписку и детали заказа без вашего отдельного разрешения." }
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
