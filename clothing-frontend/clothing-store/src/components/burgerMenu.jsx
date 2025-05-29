import React, { use } from "react";
import styles from "./header.module.css"
import { useContext,useState } from "react";
import { CityContext } from "../context/CityContext";
import Card from "./UI/catalogCard.jsx"
function BurgerMenu({isOpen, setIsOpen })
{
    

    const {city} = useContext(CityContext);


    return (
       


        <div className={`${styles.burger_menu} ${isOpen ? styles.open : ""}`}>
            
            <div className={styles.burger_menu_content}>
                <div className={styles.fixed_elems}>
                    <div className={styles.hight_elems}>
                    <a className={styles.logo_burger} href="/">Logo</a>
                            <div className={styles.city_box_burger}>
                                <svg className={styles.ico_city} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_8968_133)">
                                <path d="M8.00002 1.33334C5.20002 1.33334 2.66669 3.48001 2.66669 6.80001C2.66669 9.01334 4.44669 11.6333 8.00002 14.6667C11.5534 11.6333 13.3334 9.01334 13.3334 6.80001C13.3334 3.48001 10.8 1.33334 8.00002 1.33334ZM8.00002 8.00001C7.26669 8.00001 6.66669 7.40001 6.66669 6.66668C6.66669 5.93334 7.26669 5.33334 8.00002 5.33334C8.73335 5.33334 9.33335 5.93334 9.33335 6.66668C9.33335 7.40001 8.73335 8.00001 8.00002 8.00001Z" fill="#565656"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_8968_133">
                                <rect width="16" height="16" fill="white"/>
                                </clipPath>
                                </defs>
                                </svg>                              
                            <p className={styles.city}>{city}</p>
                            </div>
                    </div>
                    <div className={styles.hight_line}></div>

                    <button onClick={() => setIsOpen(false)} className={styles.close_button} >{"Назад"}<svg width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.3536 4.35355C15.5488 4.15829 15.5488 3.84171 15.3536 3.64645L12.1716 0.464467C11.9763 0.269205 11.6597 0.269205 11.4645 0.464467C11.2692 0.659729 11.2692 0.976312 11.4645 1.17157L14.2929 4L11.4645 6.82843C11.2692 7.02369 11.2692 7.34027 11.4645 7.53553C11.6597 7.7308 11.9763 7.7308 12.1716 7.53553L15.3536 4.35355ZM-4.37114e-08 4.5L15 4.5L15 3.5L4.37114e-08 3.5L-4.37114e-08 4.5Z" fill="#565656"/>
                        </svg>
                    </button>
                </div>
                <div className={styles.catalog_elems}>
                    <h2 className={styles.catalog_title}>НОВИНКИ</h2>

                    <a href="/catalog" className={styles.catalog_link}>Посмотреть все</a>
                    <a href="/catalog" className={styles.catalog_link}>Одежда</a>
                    <a href="/catalog/shoes" className={styles.catalog_link}>Обувь</a>
                    <a href="/catalog/jackets" className={styles.catalog_link}>Пуховики и куртки</a>
                    <a href="/catalog/hoodies" className={styles.catalog_link}>Толстовки</a>
                    <a href="/catalog/tshirts" className={styles.catalog_link}>Футболки</a>
                    <a href="/catalog/sportclothes" className={styles.catalog_link}>Спортивная одежда</a>
                    <a href="/catalog/accessorys" className={styles.catalog_link}>Аксессуары</a>
                    
                    <h2 className={styles.catalog_title}>НОВИНКИ БРЕНДОВ</h2>

                    <a href="/catalog/adidas" className={styles.catalog_link}>Adidas</a>
                    <a href="/catalog/newbalance" className={styles.catalog_link}>New Balance</a>
                    <a href="/catalog/bape" className={styles.catalog_link}>Bape</a>
                    <a href="/catalog/nike" className={styles.catalog_link}>Nike</a>
                    <a href="/catalog/carhartt" className={styles.catalog_link}>Carhartt</a>
                    <a href="/catalog/thenorthface" className={styles.catalog_link}>The North Face</a>
                    <a href="/catalog/dickies" className={styles.catalog_link}>Dickies</a>
                    <a href="/catalog/stoneisland" className={styles.catalog_link}>Stone Island</a>
                    <a href="/catalog/adidas" className={styles.catalog_link}>Adidas</a>

                </div>
                <div className={styles.search_box}>
                    <input type="text" placeholder="Поиск" />
                    <button>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.8748 18.75C15.224 18.75 18.7498 15.2242 18.7498 10.875C18.7498 6.52576 15.224 3 10.8748 3C6.52551 3 2.99976 6.52576 2.99976 10.875C2.99976 15.2242 6.52551 18.75 10.8748 18.75Z" stroke="#565656" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M16.4429 16.4438L20.9992 21.0001" stroke="#565656" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>

                    </button>
                </div>
                <div className={styles.sale_box}>
                    <p className={styles.sale_text}>SALE %</p>
                </div>
                <div className={styles.cards}>
                    <Card text="НОВИНКИ" img="src\assets\headerImg\news.png" src="/catalog/news"/>
                    <Card text="Мужчинам" img="src\assets\headerImg\womans.png" src="/catalog/men"/>
                    <Card text="Женщинам" img="src\assets\headerImg\image.png" src="/catalog/women"/>
                    <Card text="Детям" img="src\assets\headerImg\kids.png" src="/catalog/kids"/>



                </div>
            </div>
        </div>
    )

}
export default BurgerMenu;