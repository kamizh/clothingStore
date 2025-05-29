import { useState, useEffect } from "react";
import styles from "./mainillustration.module.css";
import man from "../assets/mainPhoto/man.png";
import woman from "../assets/mainPhoto/woman.png";
import kid from "../assets/mainPhoto/kid.png";

function ForMobile() {
    const images = [man, woman, kid];
    const colors = ["#13ED1C", "#FFF500", "#FD6E06"];
    const [currentIndex, setCurrentIndex] = useState(0);

    // Функция для смены изображения при клике на фон
    const handleBackgroundClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    return (
        <div 
            className={styles.mobile_container} 
            style={{ backgroundColor: colors[currentIndex] }} 
            onClick={handleBackgroundClick} // Смена при клике
        >
            <div className={styles.box_mobile}>
                <img src={images[currentIndex]} className={styles.image_mobile} alt="Фото" />
            </div>

            {/* Индикаторы (точки) */}
            <div className={styles.indicators}>
                {images.map((_, index) => (
                    <span 
                        key={index} 
                        className={`${styles.dot} ${index === currentIndex ? styles.active : ""}`}
                    />
                ))}
            </div>
        </div>
    );
}

function MainIllustration() {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (width <= 700) {
        return (
            <div>
                <ForMobile/>
                <div className={styles.center_elem}>
                <div className={styles.center_elem_content}>
                    <h1 className={styles.title}>Spring mood</h1>
                    <p className={styles.text}>-20% на новую коллекцию.</p>
                    <a href="/catalog"><button className={styles.button}>
                        В каталог
                        <svg width="25" height="8" viewBox="0 0 25 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M24.3536 4.35355C24.5488 4.15829 24.5488 3.84171 24.3536 3.64644L21.1716 0.464464C20.9763 0.269202 20.6597 0.269202 20.4645 0.464464C20.2692 0.659727 20.2692 0.976309 20.4645 1.17157L23.2929 4L20.4645 6.82843C20.2692 7.02369 20.2692 7.34027 20.4645 7.53553C20.6597 7.73079 20.9763 7.73079 21.1716 7.53553L24.3536 4.35355ZM4.37114e-08 4.5L24 4.5L24 3.5L-4.37114e-08 3.5L4.37114e-08 4.5Z"
                                fill="white"
                            />
                        </svg>
                    </button></a>
                </div>
            </div>
            </div>
        )
    }

    return (
        <div className={styles.main}>
            <div className={styles.main_container}>
                <div className={`${styles.box} ${styles.box_green}`}>
                    <img src={man} alt="Мужчина" className={styles.image} />
                </div>
                <div className={`${styles.box} ${styles.box_yellow}`}>
                    <img src={woman} alt="Женщина" className={styles.image} />
                </div>
                <div className={`${styles.box} ${styles.box_orange}`}>
                    <img src={kid} alt="Ребенок" className={styles.image} />
                </div>
            </div>
            <div className={styles.center_elem}>
                <div className={styles.center_elem_content}>
                    <h1 className={styles.title}>Spring mood</h1>
                    <p className={styles.text}>-20% на новую коллекцию.</p>
                    <a href="/catalog"><button className={styles.button}>
                        В каталог
                        <svg width="25" height="8" viewBox="0 0 25 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M24.3536 4.35355C24.5488 4.15829 24.5488 3.84171 24.3536 3.64644L21.1716 0.464464C20.9763 0.269202 20.6597 0.269202 20.4645 0.464464C20.2692 0.659727 20.2692 0.976309 20.4645 1.17157L23.2929 4L20.4645 6.82843C20.2692 7.02369 20.2692 7.34027 20.4645 7.53553C20.6597 7.73079 20.9763 7.73079 21.1716 7.53553L24.3536 4.35355ZM4.37114e-08 4.5L24 4.5L24 3.5L-4.37114e-08 3.5L4.37114e-08 4.5Z"
                                fill="white"
                            />
                        </svg>
                    </button></a>
                </div>
            </div>
        </div>
    );
}

export default MainIllustration;
