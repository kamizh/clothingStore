import styles from "./detailsCatalog.module.css";

function DetailsCatalog(props) {
    let gender = props.gender;
    let link = props.link;

    link = link === "mans" ? "men" : "women";

    const categories = [
        { label: "Посмотреть все", href: `/catalog/${link}` },
        { label: "Одежда", href: `/catalog/${link}` },
        { label: "Обувь", href: `/catalog/${link}/shoes` },
        { label: "Пуховики и куртки", href: `/catalog/${link}/jackets` },
        { label: "Толстовки", href: `/catalog/${link}/hoodies` },
        { label: "Футболки", href: `/catalog/${link}/tshirts` },
        { label: "Спортивная одежда", href: `/catalog/${link}` },
        { label: "Аксессуары", href: `/catalog/${link}/accessoryses` }
    ];

    const brands = [
        { label: "Champion", href: `/catalog/${link}/champion` },
        { label: "Bape", href: `/catalog/${link}/bape` },
        { label: "Nike", href: `/catalog/${link}/nike` },
        { label: "Carhartt", href: `/catalog/${link}/carhartt` },
        { label: "The North Face", href: `/catalog/${link}/thenorthface` },
        { label: "Dickies", href: `/catalog/${link}/dickies` },
        { label: "Stone Island", href: `/catalog/${link}/stoneisland` },
        { label: "Adidas", href: `/catalog/${link}/adidas` }
    ];

    return (
        <div className={styles.detailsCatalog}>
            <div className={styles.details_catalog_content}>
                <div className={styles.heroCard}>
                    <p className={styles.eyebrow}>{gender}</p>
                    <h3 className={styles.heroTitle}>Новая подборка сезона</h3>
                    <p className={styles.heroText}>
                        Минималистичные силуэты, базовые оттенки и акцентные вещи,
                        которые легко встроить в повседневный гардероб.
                    </p>

                    <div className={styles.heroStats}>
                        <div className={styles.statCard}>
                            <span className={styles.statLabel}>Категорий</span>
                            <span className={styles.statValue}>8</span>
                        </div>
                        <div className={styles.statCard}>
                            <span className={styles.statLabel}>Брендов</span>
                            <span className={styles.statValue}>8</span>
                        </div>
                    </div>

                    <a href={`/catalog/${link}`} className={styles.primaryLink}>
                        Открыть каталог
                    </a>
                </div>

                <div className={styles.linksArea}>
                    <div className={styles.catalog_column}>
                        <p className={styles.title}>{gender}</p>
                        <div className={styles.linksGrid}>
                            {categories.map((item) => (
                                <a key={item.label} href={item.href} className={styles.catalog_link}>
                                    {item.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className={styles.catalog_column}>
                        <p className={styles.title}>Новинки брендов</p>
                        <div className={styles.linksGrid}>
                            {brands.map((item) => (
                                <a key={item.label} href={item.href} className={styles.catalog_link}>
                                    {item.label}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailsCatalog;