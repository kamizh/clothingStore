import styles from "./detailsCatalog.module.css"
import CatalogCard from "./UI/catalogCard";

function DetailsCatalog(props)
{
    let gender = props.gender;
    let link = props.link;
    
    link = link === "mans" ? "men" : "women";

    return (
        <div className={styles.detailsCatalog}>
            <div className={styles.details_catalog_content}>
                <div className={styles.catalog_column}>
                    <p className={styles.title}>{gender}</p>
                    <a href={"/catalog/" + link} className={styles.catalog_link}>Посмотреть все</a>
                    <a href={"/catalog/" + link} className={styles.catalog_link}>Одежда</a>
                    <a href={"/catalog/" + link + "/shoes"} className={styles.catalog_link}>Обувь</a>
                    <a href={"/catalog/" + link + "/jackets"}  className={styles.catalog_link}>Пуховики и куртки</a>
                    <a href={"/catalog/" + link + "/hoodies"}  className={styles.catalog_link}>Толстовки</a>
                    <a href={"/catalog/" + link + "/tshirts"}  className={styles.catalog_link}>Футболки</a>
                    <a href={"/catalog/" + link}  className={styles.catalog_link}>Спортивная одежда</a>
                    <a href={"/catalog/" + link + "/accessoryses"}  className={styles.catalog_link}>Аксессуары</a>
                </div>
                <div className={styles.catalog_column}>
                    <p className={styles.title}>Новинки брендов</p>

                    <a href={"/catalog/" + link + "/champion"} className={styles.catalog_link}>Champion</a>
                    <a href={"/catalog/" + link + "/bape"} className={styles.catalog_link}>Bape</a>
                    <a href={"/catalog/" + link + "/nike"} className={styles.catalog_link}>Nike</a>
                    <a href={"/catalog/" + link + "/carhartt"} className={styles.catalog_link}>Carhartt</a>
                    <a href={"/catalog/" + link + "/thenorthface"} className={styles.catalog_link}>The North Face</a>
                    <a href={"/catalog/" + link + "/dickies"} className={styles.catalog_link}>Dickies</a>
                    <a href={"/catalog/" + link + "/stoneisland"} className={styles.catalog_link}>Stone Island</a>
                    <a href={"/catalog/" + link + "/adidas"} className={styles.catalog_link}>Adidas</a>
                </div>
                <div className={styles.catalog_column}>
                    <p className={styles.title}>Топ избранных</p>

                    <div className={styles.cards}>
                        <a href={"/catalog/" + link + "/tshirts"}>
                        <div className={styles.card}>
                            <div className={styles.circle_card}>
                                <img src="https://i.ibb.co/MxQXMqgg/6122c0b47af7a814ea5235cdf77e54e13c2866d2.png" alt="" className={styles.card_img} />
                            </div>
                            <p className={styles.card_text}>Футболки</p>
                        </div>
                        </a>
                        
                        <a href={"/catalog/" + link + "/hoodies"}>
                            <div className={styles.card}>
                                <div className={styles.circle_card}>
                                    <img src="https://i.ibb.co/fjw5b6W/eea96c9db144e10dbe35d3c0d53fa1f51897e931.png" alt="" className={styles.card_img} />
                                </div>
                                <p className={styles.card_text}>Худи</p>
                            </div>
                        </a>
                        
                        <a href={"/catalog/" + link + "/sweetshots"}>
                            <div className={styles.card}>
                                <div className={styles.circle_card}>
                                    <img src="https://i.ibb.co/bjn9m163/6d666d395d6e688bc3d56af7c65e8930fdf0116a.png" alt="" className={styles.card_img} />
                                </div>
                                <p className={styles.card_text}>Свитшоты</p>
                            </div>
                        </a>
                        
                        <a href={"/catalog/" + link + "/tshirts"}>
                            <div className={styles.card}>
                                <div className={styles.circle_card}>
                                    <img src="https://i.ibb.co/7fKdqcD/7e2b57a0df9f713bd09eb0e8f3b5d0f8d8c3d3e4.png" alt="" className={styles.card_img} />
                                </div>
                                <p className={styles.card_text}>Лонгсливы</p>
                            </div>
                        </a>
                        
                    </div>
                </div>
                <div className={styles.catalog_column_right}>
                    <CatalogCard className={styles.rigth} img="https://i.ibb.co/xKQ1LCyM/9de12937d3e2ceae799cf4672a7b2944884e866c.png" text="ВЕТРОВКИ" src={"/catalog/" + link + "/jackets"}/>

                    <CatalogCard img="https://i.ibb.co/WNhVbSWD/2f13c6ad97d597d9f2efc599c392dbc3a1287f27.png" text="ХУДИ И ТОЛСТОВКИ" src={"/catalog/" + link + "/hoodies"}/>
                </div>

                    
            </div>
        </div>
    )
}

export default DetailsCatalog;