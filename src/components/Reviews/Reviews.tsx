import styles from './Reviews.module.css';
import { Star } from 'lucide-react';

export default function Reviews() {
  const reviews = [
    { name: "Анна С.", text: "Заказывала оживление старой фотографии бабушки. Результат превзошел все ожидания, расплакалась от счастья!", rating: 5 },
    { name: "Игорь М.", text: "Отличное качество Premium видео. Сделали коллаж из фото с отпуска под музыку, получилось очень атмосферно.", rating: 5 },
    { name: "Мария В.", text: "Быстрая анимация для сторис — то, что нужно! Подписчики в восторге. Буду обращаться еще.", rating: 5 }
  ];

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Отзывы клиентов</h2>
      <div className={styles.grid}>
        {reviews.map((rev, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.stars}>
              {[...Array(rev.rating)].map((_, j) => (
                <Star key={j} size={18} fill="currentColor" />
              ))}
            </div>
            <p className={styles.text}>"{rev.text}"</p>
            <h4 className={styles.name}>{rev.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
}
