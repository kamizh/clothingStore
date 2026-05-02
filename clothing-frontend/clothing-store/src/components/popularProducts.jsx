import axios from "axios";
import styles from "./popularProducts.module.css";
import { useEffect, useState, useRef } from "react";
import Cardproduct from "./cardproduct";

function PopularProducts() {
    const [products, setProducts] = useState([]);
    const scrollRef = useRef(null);

    const [activeIndex, setActiveIndex] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        axios.get("http://localhost:5095/api/product/popular")
            .then(res => {
                const loadedProducts = res.data.products || [];
                setProducts(loadedProducts);

                const cardsPerPage = Math.max(1, Math.floor(window.innerWidth / 300));
                const pageCount = Math.ceil(loadedProducts.length / cardsPerPage);
                setTotalPages(pageCount);
            })
            .catch(() => console.log("Ошибка при загрузке популярных товаров"));
    }, []);

    const scrollLeft = () => {
        if (scrollRef.current) {
            const containerWidth = scrollRef.current.offsetWidth;
            scrollRef.current.scrollBy({ left: -containerWidth, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            const containerWidth = scrollRef.current.offsetWidth;
            scrollRef.current.scrollBy({ left: containerWidth, behavior: "smooth" });
        }
    };

    const handleScroll = () => {
        if (!scrollRef.current) return;

        const currentScroll = scrollRef.current.scrollLeft;
        const containerWidth = scrollRef.current.offsetWidth;
        const index = Math.round(currentScroll / containerWidth);
        setActiveIndex(index);
    };

    return (
        <section className={styles.container}>
            <div className={styles.section_header}>
                <div className={styles.section_title_box}>
                    <p className={styles.section_eyebrow}>Popular selection</p>
                    <h2 className={styles.section_title}>Популярное</h2>
                </div>

                <a href="/catalog" className={styles.section_link}>
                    Весь каталог
                </a>
            </div>

            <div className={styles.scroll_wrapper}>
                <button
                    className={`${styles.arrow_left} ${styles.arrow_button}`}
                    onClick={scrollLeft}
                    aria-label="Прокрутить влево"
                    type="button"
                >
                    &#8249;
                </button>

                <div
                    className={styles.products}
                    ref={scrollRef}
                    onScroll={handleScroll}
                >
                    {products.map(product => (
                        <div key={product.Id} className={styles.card_wrapper}>
                            <Cardproduct product={product} />
                        </div>
                    ))}
                </div>

                <button
                    className={`${styles.arrow_right} ${styles.arrow_button}`}
                    onClick={scrollRight}
                    aria-label="Прокрутить вправо"
                    type="button"
                >
                    &#8250;
                </button>
            </div>

            <div className={styles.dots}>
                {Array.from({ length: totalPages }).map((_, index) => (
                    <span
                        key={index}
                        className={index === activeIndex ? styles.dotActive : styles.dot}
                    ></span>
                ))}
            </div>
        </section>
    );
}

export default PopularProducts;