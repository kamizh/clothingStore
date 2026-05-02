import styles from "./typeClothes.module.css";

import tshirtImg from "../assets/detailsCatalog/tshirt.png";
import snikersImg from "../assets/detailsCatalog/snikers.png";
import hoodieImg from "../assets/detailsCatalog/hoodie.png";
import loongsleveimg from "../assets/detailsCatalog/longsleeve.png";
import sweatshootImg from "../assets/detailsCatalog/swwetshoot.png";
import shirtsimg from "../assets/detailsCatalog/shirt.png";
import sweatersImg from "../assets/detailsCatalog/sweater.png";
import jeansImg from "../assets/detailsCatalog/jeans.png";
import trousersImg from "../assets/detailsCatalog/trousers.png";
import headThingsIMG from "../assets/detailsCatalog/cap.png";

function TypeClothes() {
    const items = [
        { title: "Кроссовки", subtitle: "Sneakers", img: snikersImg, href: "/catalog/snikers" },
        { title: "Футболки", subtitle: "T-shirts", img: tshirtImg, href: "/catalog/tshirts" },
        { title: "Худи", subtitle: "Hoodies", img: hoodieImg, href: "/catalog/hoodies" },
        { title: "Лонгсливы", subtitle: "Longsleeves", img: loongsleveimg, href: "/catalog/longsleeves" },
        { title: "Свитшоты", subtitle: "Sweatshirts", img: sweatshootImg, href: "/catalog/sweetshots" },
        { title: "Рубашки", subtitle: "Shirts", img: shirtsimg, href: "/catalog/shirts" },
        { title: "Свитера", subtitle: "Sweaters", img: sweatersImg, href: "/catalog/sweaters" },
        { title: "Джинсы", subtitle: "Jeans", img: jeansImg, href: "/catalog/jeans" },
        { title: "Штаны", subtitle: "Trousers", img: trousersImg, href: "/catalog/trousers" },
        { title: "Головные уборы", subtitle: "Caps", img: headThingsIMG, href: "/catalog/caps" }
    ];

    return (
        <section className={styles.type_clothes}>
            <div className={styles.shell}>
                <div className={styles.top}>
                    <div className={styles.top_left}>
                        <p className={styles.eyebrow}>Categories</p>
                        <h2 className={styles.title}>Категории товаров</h2>
                    </div>

                    
                </div>

                <div className={styles.grid}>
                    {items.map((item) => (
                        <a key={item.title} href={item.href} className={styles.card}>
                            <div className={styles.card_glow}></div>

                            <div className={styles.image_box}>
                                <img className={styles.image} src={item.img} alt={item.title} />
                            </div>

                            <div className={styles.card_body}>
                                <p className={styles.text}>{item.title}</p>
                                <span className={styles.subtext}>{item.subtitle}</span>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default TypeClothes;