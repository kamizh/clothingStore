import React, { useContext } from "react";
import styles from "./burgerMenu.module.css";
import { CityContext } from "../context/CityContext";

import newsImg from "../assets/headerImg/news.png";
import menImg from "../assets/headerImg/womans.png";
import womenImg from "../assets/headerImg/image.png";

function BurgerMenu({ isOpen, setIsOpen }) {
  const { city } = useContext(CityContext);

  return (
    <>
      <div
        className={`${styles.burger_overlay} ${isOpen ? styles.burger_overlay_open : ""}`}
        onClick={() => setIsOpen(false)}
      ></div>

      <aside className={`${styles.burger_menu} ${isOpen ? styles.open : ""}`}>
        <div className={styles.burger_menu_content}>
          <div className={styles.burger_top}>
            <div className={styles.burger_brand_row}>
              <a className={styles.logo_burger} href="/">
                LOGO
              </a>

              <div className={styles.city_box_burger}>
                <svg
                  className={styles.ico_city}
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_8968_133)">
                    <path
                      d="M8.00002 1.33334C5.20002 1.33334 2.66669 3.48001 2.66669 6.80001C2.66669 9.01334 4.44669 11.6333 8.00002 14.6667C11.5534 11.6333 13.3334 9.01334 13.3334 6.80001C13.3334 3.48001 10.8 1.33334 8.00002 1.33334ZM8.00002 8.00001C7.26669 8.00001 6.66669 7.40001 6.66669 6.66668C6.66669 5.93334 7.26669 5.33334 8.00002 5.33334C8.73335 5.33334 9.33335 5.93334 9.33335 6.66668C9.33335 7.40001 8.73335 8.00001 8.00002 8.00001Z"
                      fill="currentColor"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_8968_133">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <p className={styles.city}>{city}</p>
              </div>
            </div>

            <button onClick={() => setIsOpen(false)} className={styles.close_button}>
              <span>Закрыть</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M12 4L4 12M4 4L12 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <div className={styles.hight_line}></div>

          <div className={styles.burger_sections}>
            <div className={styles.burger_section}>
              <div className={styles.burger_section_header}>
                <span className={styles.burger_badge}>Catalog</span>
                <h2 className={styles.catalog_title}>Категории</h2>
              </div>

              <div className={styles.catalog_elems}>
                <a href="/catalog" className={styles.catalog_link}>Посмотреть всё</a>
                <a href="/catalog" className={styles.catalog_link}>Одежда</a>
                <a href="/catalog/shoes" className={styles.catalog_link}>Обувь</a>
                <a href="/catalog/jackets" className={styles.catalog_link}>Пуховики и куртки</a>
                <a href="/catalog/hoodies" className={styles.catalog_link}>Толстовки</a>
                <a href="/catalog/tshirts" className={styles.catalog_link}>Футболки</a>
                <a href="/catalog/sportclothes" className={styles.catalog_link}>Спортивная одежда</a>
                <a href="/catalog/accessorys" className={styles.catalog_link}>Аксессуары</a>
              </div>
            </div>

            <div className={styles.burger_section}>
              <div className={styles.burger_section_header}>
                <span className={styles.burger_badge}>Brands</span>
                <h2 className={styles.catalog_title}>Популярные бренды</h2>
              </div>

              <div className={styles.catalog_elems}>
                <a href="/catalog/adidas" className={styles.catalog_link}>Adidas</a>
                <a href="/catalog/newbalance" className={styles.catalog_link}>New Balance</a>
                <a href="/catalog/bape" className={styles.catalog_link}>Bape</a>
                <a href="/catalog/nike" className={styles.catalog_link}>Nike</a>
                <a href="/catalog/carhartt" className={styles.catalog_link}>Carhartt</a>
                <a href="/catalog/thenorthface" className={styles.catalog_link}>The North Face</a>
                <a href="/catalog/dickies" className={styles.catalog_link}>Dickies</a>
                <a href="/catalog/stoneisland" className={styles.catalog_link}>Stone Island</a>
              </div>
            </div>
          </div>

          <div className={styles.sale_box}>
            <a href="/catalog/sale" className={styles.sale_chip}>
              Sale / специальные предложения
            </a>
          </div>

        </div>
      </aside>
    </>
  );
}

export default BurgerMenu;