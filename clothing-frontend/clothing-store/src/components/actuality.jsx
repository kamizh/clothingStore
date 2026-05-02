import styles from "./actuality.module.css";

function Actuality() {
    const brands = [
        "Nike",
        "Carhartt",
        "Stone Island",
        "The North Face",
        "Fred Perry",
        "Champion",
        "Dickies",
        "Adidas"
    ];

    return (
        <section className={styles.actuality}>
            <div className={styles.actuality_content}>
                <div className={styles.intro_card}>
                    <p className={styles.eyebrow}>Editorial selection</p>
                    <h2 className={styles.title}>Актуальные силуэты, чистые формы и сильные бренды</h2>
                    <p className={styles.description}>
                        В подборке собраны вещи, которые легко работают в повседневном гардеробе:
                        базовые модели, акцентные позиции и узнаваемые бренды с характером.
                    </p>
                </div>

                <div className={styles.side_cards}>
                    <div className={styles.info_card}>
                        <p className={styles.card_label}>Фокус</p>
                        <h3 className={styles.card_title}>База на каждый день</h3>
                        <p className={styles.card_text}>
                            Футболки, худи, рубашки, деним и верхняя одежда —
                            основные категории, которые формируют устойчивый гардероб.
                        </p>
                    </div>

                    <div className={styles.info_card}>
                        <p className={styles.card_label}>Подборка</p>
                        <h3 className={styles.card_title}>Бренды с узнаваемым почерком</h3>
                        <p className={styles.card_text}>
                            От спортивной классики до утилитарного streetwear —
                            коллекция собрана вокруг сильных и понятных fashion-направлений.
                        </p>
                    </div>
                </div>

                <div className={styles.brand_strip}>
                    <div className={styles.brand_strip_header}>
                        <p className={styles.brand_eyebrow}>Selected brands</p>
                        <p className={styles.brand_text}>
                            Ключевые бренды, представленные в каталоге
                        </p>
                    </div>

                    <div className={styles.brand_list}>
                        {brands.map((brand) => (
                            <div key={brand} className={styles.brand_chip}>
                                {brand}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Actuality;