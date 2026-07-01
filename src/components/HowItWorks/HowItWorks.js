import styles from './HowItWorks.module.css';

export default function HowItWorks() {
  const steps = [
    {
      title: "Выберите услугу",
      desc: "Определитесь, что именно вам нужно: легкая ретушь, короткая анимация или полноценный видео-коллаж."
    },
    {
      title: "Загрузите материалы",
      desc: "Отправьте нам ваши фотографии в хорошем качестве через удобную форму заказа."
    },
    {
      title: "Опишите пожелания",
      desc: "Расскажите, какой результат вы ожидаете. Мы учтем все детали, чтобы вы остались довольны."
    },
    {
      title: "Получите результат",
      desc: "В оговоренные сроки мы пришлем вам готовую работу на проверку в высоком разрешении. Мы ценим качество и ваше время."
    }
  ];

  return (
    <section id="howitworks" className={styles.section}>
      <h2 className={styles.title}>Как это работает?</h2>
      <div className={styles.stepsContainer}>
        {steps.map((step, index) => (
          <div key={index} className={styles.step}>
            <div className={styles.stepNumber}>{index + 1}</div>
            <div className={styles.stepContent}>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
