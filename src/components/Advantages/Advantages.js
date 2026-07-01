import styles from './Advantages.module.css';
import { Sparkles, Clock, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function Advantages() {
  const advantages = [
    { icon: <Sparkles size={32} />, title: "Безупречное качество", desc: "Детальная ручная проработка каждого снимка и профессиональный софт студийного уровня." },
    { icon: <Clock size={32} />, title: "Точные сроки", desc: "Выполняем заказы строго в оговоренное время без задержек и отговорок." },
    { icon: <ShieldCheck size={32} />, title: "Гарантия результата", desc: "Работаем над вашим проектом до полного утверждения. Для нас важен идеальный итог." },
    { icon: <HeartHandshake size={32} />, title: "Индивидуальный подход", desc: "Никаких шаблонов. Мы внимательно изучаем ваши пожелания и создаем эксклюзивный материал." }
  ];

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Почему выбирают нас</h2>
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
