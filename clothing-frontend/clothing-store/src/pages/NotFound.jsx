import styles from "./NotFound.module.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className={styles.notFound}>
      <div className={styles.glow}></div>

      <div className={styles.content}>
        <div className={styles.badge}>Error / 404</div>

        <div className={styles.hero}>
          <div className={styles.left}>
            <p className={styles.code}>404</p>
            <h1 className={styles.title}>Страница не найдена</h1>
            <p className={styles.text}>
              Похоже, такой страницы больше нет или ссылка была указана неверно.
              Вернитесь в каталог и продолжите просмотр коллекции.
            </p>

            <div className={styles.actions}>
              <Link to="/catalog" className={styles.primaryButton}>
                В каталог
              </Link>

              <Link to="/" className={styles.secondaryButton}>
                На главную
              </Link>
            </div>
          </div>

          <div className={styles.right}>
            <div className={styles.previewCard}>
              <div className={styles.previewTop}>
                <span className={styles.previewDot}></span>
                <span className={styles.previewDot}></span>
                <span className={styles.previewDot}></span>
              </div>

              <div className={styles.previewBody}>
                <div className={styles.previewNumber}>404</div>
                <div className={styles.previewLine}></div>
                <div className={styles.previewMiniText}>PAGE NOT FOUND</div>
              </div>
            </div>

            <div className={styles.infoRow}>
              <div className={styles.infoCard}>
                <span className={styles.infoLabel}>Совет</span>
                <span className={styles.infoValue}>Проверь адрес страницы</span>
              </div>

              <div className={styles.infoCard}>
                <span className={styles.infoLabel}>Быстрый переход</span>
                <span className={styles.infoValue}>Каталог / Главная</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;