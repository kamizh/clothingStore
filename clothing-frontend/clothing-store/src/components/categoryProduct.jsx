import styles from "./categoryProduct.module.css";

function CategoryProduct() {
    const features = [
        {
            title: "Современный каталог",
            text: "Структурированная система категорий, брендов и фильтров для быстрого поиска нужных товаров."
        },
        {
            title: "Premium UX",
            text: "Минималистичный интерфейс, единая визуальная система и аккуратная подача ключевых разделов."
        },
        {
            title: "Актуальные коллекции",
            text: "Подборки новинок, базовых вещей и сезонных предложений в одном пространстве."
        }
    ];

    const quickLinks = [
        { title: "Мужская одежда", subtitle: "Основные категории", href: "/catalog/men" },
        { title: "Женская одежда", subtitle: "Новые поступления", href: "/catalog/women" },
        { title: "Sale & Trends", subtitle: "Лучшие предложения", href: "/catalog" }
    ];

    return (
        <section className={styles.category}>
            <div className={styles.category_content}>
                <div className={styles.hero_block}>
                    <p className={styles.eyebrow}>Store presentation</p>
                    <h2 className={styles.title}>Простая навигация и сильная подача каталога</h2>
                    <p className={styles.description}>
                        Эта секция помогает быстро сориентироваться в магазине:
                        перейти к ключевым разделам, увидеть преимущества интерфейса
                        и почувствовать цельный premium dark стиль проекта.
                    </p>

                    <div className={styles.actions}>
                        <a href="/catalog" className={styles.primary_button}>
                            Перейти в каталог
                        </a>
                        <a href="/catalog/news" className={styles.secondary_button}>
                            Смотреть новинки
                        </a>
                    </div>
                </div>

                <div className={styles.features_grid}>
                    {features.map((item) => (
                        <div key={item.title} className={styles.feature_card}>
                            <div className={styles.feature_glow}></div>
                            <h3 className={styles.feature_title}>{item.title}</h3>
                            <p className={styles.feature_text}>{item.text}</p>
                        </div>
                    ))}
                </div>

                <div className={styles.quick_links}>
                    {quickLinks.map((item) => (
                        <a key={item.title} href={item.href} className={styles.quick_card}>
                            <div className={styles.quick_card_top}>
                                <span className={styles.quick_label}>{item.subtitle}</span>
                                <span className={styles.quick_arrow}>→</span>
                            </div>
                            <p className={styles.quick_title}>{item.title}</p>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default CategoryProduct;