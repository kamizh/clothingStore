// PopularProducts.jsx
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
            setProducts(res.data.products);
            const cardsPerPage = Math.floor(window.innerWidth / 300); // по 300px на карточку
            const pageCount = Math.ceil(res.data.products.length / cardsPerPage);
            setTotalPages(pageCount);
        })

    }, []);


    useEffect(() => {
        axios.get("http://localhost:5095/api/product/popular")
            .then(res => setProducts(res.data.products))

    }, []);

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
    };

    const handleScroll = () => {
        if (!scrollRef.current) return;
            const scrollLeft = scrollRef.current.scrollLeft;
            const containerWidth = scrollRef.current.offsetWidth;
            const index = Math.round(scrollLeft / containerWidth);
            setActiveIndex(index);
};

    return (
        <div className={styles.container}>

            <div className={styles.hight_elems}>
                <h1 className={styles.title}>Популярное</h1>

                <a href="/catalog" className={styles.in_catalog}>В КАТАЛОГ →</a>

            </div>

            <div className={styles.scroll_wrapper}>
                <button className={`${styles.arrow_left} ${styles.arrow_button}`} onClick={scrollLeft}>
                    &#8249;
                </button>

                <div className={styles.products} ref={scrollRef}>
                    {products.map(product => (
                        <div key={product.id} className={styles.card_wrapper}>
                            <Cardproduct product={product} />
                        </div>
                    ))}
                </div>

                <button className={`${styles.arrow_right} ${styles.arrow_button}`} onClick={scrollRight}>
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

        </div>
    );
}

export default PopularProducts;
