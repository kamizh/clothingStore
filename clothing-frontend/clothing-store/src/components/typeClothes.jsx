import styles from "./typeClothes.module.css"

import tshirtImg from '../assets/detailsCatalog/tshirt.png'
import snikersImg from '../assets/detailsCatalog/snikers.png'
import hoodieImg from '../assets/detailsCatalog/hoodie.png'
import loongsleveimg from '../assets/detailsCatalog/longsleeve.png'
import sweatshootImg from '../assets/detailsCatalog/swwetshoot.png'
import shirtsimg from '../assets/detailsCatalog/shirt.png'
import sweatersImg from '../assets/detailsCatalog/sweater.png'
import jeansImg from '../assets/detailsCatalog/jeans.png'
import trousersImg from '../assets/detailsCatalog/trousers.png'
import headThingsIMG from '../assets//detailsCatalog/cap.png'

function TypeClothes()
{
    
    return (
        <div className={styles.type_clothes}>
            <div className={styles.type_clothes_content}>
            <a href="/catalog/snikers">
                    <div className={styles.link}>
                        <img className={styles.image} src={snikersImg} alt="" />
                    </div>
                    <p className={styles.text}>Кроссовки</p>
                </a>
                <a href="/catalog/tshirts">
                    <div className={styles.link}>
                        <img className={styles.image} src={tshirtImg} alt="" />
                    </div>
                    <p className={styles.text}>Футболки</p>
                </a>
                <a href="/catalog/hoodies">
                    <div className={styles.link}>
                        <img className={styles.image} src={hoodieImg} alt="" />
                    </div>
                    <p className={styles.text}>Худи</p>
                </a>
                <a href="/catalog/longsleeves">
                    <div className={styles.link}>
                        <img className={styles.image} src={loongsleveimg} alt="" />
                    </div>
                    <p className={styles.text}>Лонгсливы</p>
                </a>
                <a href="/catalog/sweetshots">
                    <div className={styles.link}>
                        <img className={styles.image} src={sweatshootImg} alt="" />
                    </div>
                    <p className={styles.text}>Свитшоты</p>
                </a>
                <a href="/catalog/shirts">
                    <div className={styles.link}>
                        <img className={styles.image} src={shirtsimg} alt="" />
                    </div>
                    <p className={styles.text}>Рубашки</p>
                </a>
                <a href="/catalog/sweaters">
                    <div className={styles.link}>
                        <img className={styles.image} src={sweatersImg} alt="" />
                    </div>
                    <p className={styles.text}>Свитера</p>
                </a>
                <a href="/catalog/jeans">
                    <div className={styles.link}>
                        <img className={styles.image} src={jeansImg} alt="" />
                    </div>
                    <p className={styles.text}>Джинсы</p>
                </a>
                <a href="/catalog/trousers">
                    <div className={styles.link}>
                        <img className={styles.image} src={trousersImg} alt="" />
                    </div>
                    <p className={styles.text}>Штаны</p>
                </a>
                <a href="/catalog/caps">
                    <div className={styles.link}>
                        <img className={styles.image} src={headThingsIMG} alt="" />
                    </div>
                    <p className={styles.text}>Головнык уборы</p>
                </a>
                
            </div>
            
        </div>
    )
}
export default TypeClothes;