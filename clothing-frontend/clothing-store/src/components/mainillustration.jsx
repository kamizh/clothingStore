import styles from "./mainillustration.module.css";
import heroImage from "../assets/headerImg/background2.jpg";

function MainIllustration() {
    return (
        <section className={styles.hero}>
            <div className={styles.hero_media}>
                <img src={heroImage} alt="Новая коллекция" className={styles.hero_image} />
                <div className={styles.overlay}></div>
            </div>

            <div className={styles.hero_content}>
                <p className={styles.eyebrow}>New season / premium drop</p>

                <h1 className={styles.title}>
                    Новая коллекция <br />
                    в premium dark стиле
                </h1>

                <p className={styles.text}>
                    Современные силуэты, базовые оттенки и акцентные вещи,
                    которые работают на каждый день.
                </p>

                <div className={styles.actions}>
                    <a href="/catalog" className={styles.primaryButton}>
                        В каталог
                        <svg width="22" height="8" viewBox="0 0 25 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M24.3536 4.35355C24.5488 4.15829 24.5488 3.84171 24.3536 3.64644L21.1716 0.464464C20.9763 0.269202 20.6597 0.269202 20.4645 0.464464C20.2692 0.659727 20.2692 0.976309 20.4645 1.17157L23.2929 4L20.4645 6.82843C20.2692 7.02369 20.2692 7.34027 20.4645 7.53553C20.6597 7.73079 20.9763 7.73079 21.1716 7.53553L24.3536 4.35355ZM0 4.5H24V3.5H0V4.5Z"
                                fill="currentColor"
                            />
                        </svg>
                    </a>

                    <a href="/catalog/news" className={styles.secondaryButton}>
                        Смотреть новинки
                    </a>
                </div>

                <div className={styles.metrics}>
                    <div className={styles.metric}>
                        <span className={styles.metric_value}>120+</span>
                        <span className={styles.metric_label}>моделей в каталоге</span>
                    </div>
                    <div className={styles.metric}>
                        <span className={styles.metric_value}>Premium</span>
                        <span className={styles.metric_label}>новая визуальная система</span>
                    </div>
                    <div className={styles.metric}>
                        <span className={styles.metric_value}>24/7</span>
                        <span className={styles.metric_label}>онлайн доступ к магазину</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default MainIllustration;