import React from "react";
import styles from "./contacts.module.css";

function Contacts() {
  return (
    <section className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.heroBadge}>Contact / Store Info</div>

        <div className={styles.heroGrid}>
          <div className={styles.heroLeft}>
            <h1 className={styles.title}>Контакты</h1>
            <p className={styles.subtitle}>
              Здесь собрана вся основная информация о магазине: адрес,
              электронная почта, телефон, часы работы и способы связи. Если у
              вас есть вопросы по заказу, доставке, возврату или ассортименту,
              вы можете связаться с нами любым удобным способом.
            </p>

            <div className={styles.quickInfo}>
              <div className={styles.quickCard}>
                <span className={styles.quickLabel}>Телефон</span>
                <span className={styles.quickValue}>+7 (999) 999-99-99</span>
              </div>

              <div className={styles.quickCard}>
                <span className={styles.quickLabel}>E-mail</span>
                <span className={styles.quickValue}>hello@420shop.ru</span>
              </div>

              <div className={styles.quickCard}>
                <span className={styles.quickLabel}>Адрес</span>
                <span className={styles.quickValue}>Москва, ул. Тверская, 15</span>
              </div>
            </div>
          </div>

          <div className={styles.heroRight}>
            <div className={styles.statusCard}>
              <span className={styles.statusTitle}>Мы на связи</span>
              <span className={styles.statusValue}>ежедневно</span>
              <p className={styles.statusText}>
                Поддержка отвечает по вопросам заказов, доставки, размеров,
                возвратов и доступности товаров.
              </p>
            </div>

            <div className={styles.statusCard}>
              <span className={styles.statusTitle}>Время работы</span>
              <span className={styles.statusValue}>10:00 — 22:00</span>
              <p className={styles.statusText}>
                Магазин и консультационная поддержка доступны без выходных.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.infoGrid}>
        <article className={styles.infoCard}>
          <div className={styles.iconWrap}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 13.5C13.6569 13.5 15 12.1569 15 10.5C15 8.84315 13.6569 7.5 12 7.5C10.3431 7.5 9 8.84315 9 10.5C9 12.1569 10.3431 13.5 12 13.5Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M19.5 10.5C19.5 16.5 12 21 12 21C12 21 4.5 16.5 4.5 10.5C4.5 8.51088 5.29018 6.60322 6.6967 5.1967C8.10322 3.79018 10.0109 3 12 3C13.9891 3 15.8968 3.79018 17.3033 5.1967C18.7098 6.60322 19.5 8.51088 19.5 10.5Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </div>
          <h2 className={styles.cardTitle}>Адрес магазина</h2>
          <p className={styles.cardText}>
            Москва, ул. Тверская, 15<br />
            Бизнес-центр Fashion House, 2 этаж
          </p>
        </article>

        <article className={styles.infoCard}>
          <div className={styles.iconWrap}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M4.5 6.75H19.5C20.3284 6.75 21 7.42157 21 8.25V15.75C21 16.5784 20.3284 17.25 19.5 17.25H4.5C3.67157 17.25 3 16.5784 3 15.75V8.25C3 7.42157 3.67157 6.75 4.5 6.75Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M3.75 8.25L12 13.5L20.25 8.25"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </div>
          <h2 className={styles.cardTitle}>Электронная почта</h2>
          <p className={styles.cardText}>
            hello@420shop.ru<br />
            support@420shop.ru
          </p>
        </article>

        <article className={styles.infoCard}>
          <div className={styles.iconWrap}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 16.92V19.92C21.0001 20.1985 20.8967 20.4671 20.7099 20.6737C20.5231 20.8803 20.266 21.01 19.99 21.04C19.5128 21.0919 19.0301 21.12 18.54 21.12C10.89 21.12 4.68 14.91 4.68 7.26C4.68 6.77 4.71 6.29 4.76 5.81C4.78999 5.53402 4.91969 5.2769 5.12629 5.09011C5.33288 4.90332 5.6015 4.79991 5.88 4.8H8.88C9.01653 4.79865 9.14899 4.84408 9.25593 4.92886C9.36287 5.01364 9.43791 5.1327 9.468 5.265L9.948 7.665C9.97725 7.79313 9.97236 7.92659 9.9338 8.05231C9.89524 8.17803 9.82434 8.29141 9.728 8.38199L8.688 9.423C9.85272 11.4685 11.5515 13.1673 13.597 14.332L14.638 13.292C14.7286 13.1957 14.842 13.1248 14.9677 13.0862C15.0934 13.0476 15.2269 13.0428 15.355 13.072L17.755 13.552C17.8873 13.5821 18.0064 13.6571 18.0911 13.7641C18.1759 13.871 18.2214 14.0035 18.22 14.14V17.14"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </div>
          <h2 className={styles.cardTitle}>Телефон</h2>
          <p className={styles.cardText}>
            +7 (999) 999-99-99<br />
            +7 (495) 123-45-67
          </p>
        </article>

        <article className={styles.infoCard}>
          <div className={styles.iconWrap}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 6V12L15.75 14.25"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </div>
          <h2 className={styles.cardTitle}>Часы работы</h2>
          <p className={styles.cardText}>
            Ежедневно<br />
            10:00 — 22:00
          </p>
        </article>
      </div>

      <div className={styles.bottomGrid}>
        <div className={styles.mapCard}>
          <div className={styles.blockHead}>
            <span className={styles.blockBadge}>Map</span>
            <h2 className={styles.blockTitle}>Как нас найти</h2>
          </div>

          <div className={styles.mapWrap}>
            <iframe
              title="map"
              className={styles.map}
              src="https://yandex.ru/map-widget/v1/?um=constructor%3A9d8a4d8f2e7b6f2b6e9e7f9f3c7a6c53d1b1f2e2c3d4a5b6c7d8e9f0a1b2c3d4&amp;source=constructor"
              frameBorder="0"
            ></iframe>
          </div>
        </div>

        <div className={styles.sideColumn}>
          <div className={styles.contactPanel}>
            <div className={styles.blockHead}>
              <span className={styles.blockBadge}>Details</span>
              <h2 className={styles.blockTitle}>Дополнительная информация</h2>
            </div>

            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Самовывоз</span>
              <span className={styles.detailValue}>
                Возможен в часы работы магазина после подтверждения заказа
              </span>
            </div>

            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Поддержка</span>
              <span className={styles.detailValue}>
                По вопросам доставки, оплаты, возврата и размеров
              </span>
            </div>

            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Соцсети</span>
              <span className={styles.detailValue}>
                Telegram / VK / Instagram
              </span>
            </div>
          </div>

          <div className={styles.socialCard}>
            <div className={styles.blockHead}>
              <span className={styles.blockBadge}>Social</span>
              <h2 className={styles.blockTitle}>Оставайтесь на связи</h2>
            </div>

            <div className={styles.socialList}>
              <a href="/" className={styles.socialLink}>Telegram</a>
              <a href="/" className={styles.socialLink}>VK</a>
              <a href="/" className={styles.socialLink}>Instagram</a>
            </div>

            <p className={styles.socialText}>
              В соцсетях можно следить за новыми поступлениями, подборками,
              акциями и обновлениями каталога.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contacts;