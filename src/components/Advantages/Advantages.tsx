import styles from './Advantages.module.css';
import { Sparkles, Clock, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function Advantages() {
  const advantages = [
    { icon: <Sparkles size={32} />, title: "Без промтов и настроек", desc: "Просто отправьте фото и опишите идею обычными словами. Фотти сам подберет обработку, движение и формат результата." },
    { icon: <Clock size={32} />, title: "Понятные сроки", desc: "Срок выполнения зависит от выбранной услуги. Мы не затягиваем заказы и отправляем результат в оговоренное время." },
    { icon: <ShieldCheck size={32} />, title: "Не просто генерация", desc: "Мы не отдаем случайный результат из нейросети. Снимки проходят подготовку, отбор удачных вариантов и финальную сборку." }
  ];

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Почему с Фотти удобно?</h2>
      <div className={styles.grid}>
        {advantages.map((adv, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.icon}>{adv.icon}</div>
            <h3 className={styles.cardTitle}>{adv.title}</h3>
            <p className={styles.cardDesc}>{adv.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
