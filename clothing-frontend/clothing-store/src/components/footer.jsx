import styles from "./footer.module.css";

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footer_content}>
                <div className={styles.top}>
                    <div className={styles.brand_block}>
                        <a href="/" className={styles.logo}>LOGO</a>
                        <p className={styles.brand_text}>
                            Premium dark fashion store с акцентом на минимализм,
                            чистую типографику и современный пользовательский опыт.
                        </p>

                        <div className={styles.contact_list}>
                            <a href="tel:+79999999999" className={styles.contact_item}>+7 (999) 999-99-99</a>
                            <a href="mailto:hello@420shop.ru" className={styles.contact_item}>hello@420shop.ru</a>
                            <p className={styles.contact_item}>Москва, Россия</p>
                        </div>

                        <div className={styles.socials}>
                            <a href="/" className={styles.social} aria-label="Telegram">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                    <path d="M21.5 4.5L3 11.8L9.7 13.9L17.4 8.1L11.6 15.2V20L14.9 16.8L19.1 19.9L21.5 4.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                                </svg>
                            </a>
                            <a href="/" className={styles.social} aria-label="Instagram">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                    <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.5"/>
                                    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/>
                                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
                                </svg>
                            </a>
                            <a href="/" className={styles.social} aria-label="VK">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                    <path d="M4 7H6.3C6.5 7 6.7 7.1 6.8 7.3L8.5 11.1C9.3 12.8 10.3 14 11.3 14.7V7.7C11.3 7.3 11.6 7 12 7H13.8C14.2 7 14.5 7.3 14.5 7.7V11.4C15.5 10.7 16.6 9.5 17.4 7.7C17.5 7.3 17.9 7 18.4 7H20C20.5 7 20.8 7.5 20.6 7.9C19.8 9.8 18.7 11.6 17.3 13C18.9 14 20.1 15.3 21 17C21.2 17.4 20.9 18 20.4 18H18.7C18.3 18 17.9 17.8 17.7 17.5C16.8 16.1 15.8 15.1 14.5 14.5V17.2C14.5 17.6 14.2 18 13.8 18H12.5C8.1 18 5.2 13.9 3.4 7.9C3.3 7.4 3.6 7 4 7Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div className={styles.nav_box}>
                        <div className={styles.nav_panel}>
                            <p className={styles.nav_title}>Помощь</p>
                            <a href="/search" className={styles.nav_link}>Мой аккаунт</a>
                            <a href="/search" className={styles.nav_link}>Где мой заказ</a>
                            <a href="/search" className={styles.nav_link}>Доставка и оплата</a>
                            <a href="/search" className={styles.nav_link}>Правила возврата</a>
                            <a href="/search" className={styles.nav_link}>Подобрать размер</a>
                        </div>

                        <div className={styles.nav_panel}>
                            <p className={styles.nav_title}>Каталог</p>
                            <a href="/catalog/news" className={styles.nav_link}>Новинки</a>
                            <a href="/catalog/clothes" className={styles.nav_link}>Одежда</a>
                            <a href="/catalog/shoes" className={styles.nav_link}>Обувь</a>
                            <a href="/catalog/accessories" className={styles.nav_link}>Аксессуары</a>
                            <a href="/catalog/brands" className={styles.nav_link}>Любимые бренды</a>
                            <a href="/" className={`${styles.nav_link} ${styles.sale}`}>Sale</a>
                        </div>

                        <div className={styles.nav_panel}>
                            <p className={styles.nav_title}>Компания</p>
                            <a href="/about" className={styles.nav_link}>О нас</a>
                            <a href="/about" className={styles.nav_link}>Философия бренда</a>
                            <a href="/about" className={styles.nav_link}>Блог</a>
                            <a href="/contact" className={styles.nav_link}>Контакты</a>
                            <a href="/about" className={styles.nav_link}>FAQ</a>
                        </div>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <div className={styles.payment_method}>
                        <svg width="43" height="44" viewBox="0 0 43 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_9008_106)">
                                <path fillRule="evenodd" clipRule="evenodd" d="M17.4401 17.1489L13.3548 26.871L10.6081 26.8744L8.28214 18.7312L8.09367 18.1176L8.10921 18.1263L8.13476 18.1408L8.10969 18.1274L8.10939 18.1264C8.12159 18.1332 8.13359 18.14 8.14574 18.1468C8.56422 18.3736 10.422 19.4577 11.5707 21.2138C11.7456 22.1069 11.913 22.9182 12.1494 23.7933L14.6909 17.1489H17.4401L17.4401 17.1489Z" fill="#006CB5"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M28.4918 23.6969C28.4726 25.7207 26.7034 27.0274 23.9759 27.0274C22.8133 27.0146 21.6921 26.7806 21.0833 26.5075L21.4479 24.3269L21.7832 24.4839C22.6372 24.8476 23.1879 24.9935 24.227 24.9935C24.9736 24.9935 25.7718 24.694 25.7775 24.04C25.7808 23.6132 25.4422 23.3103 24.4322 22.8332C23.4488 22.3663 22.1452 21.5863 22.1617 20.1865C22.1742 18.2927 23.9827 16.9724 26.5466 16.9724C27.5507 16.9724 28.3549 17.1824 28.8703 17.382L28.5185 19.4926L28.2832 19.3792C27.8078 19.183 27.1921 18.9926 26.3414 19.0061C25.328 19.0061 24.8559 19.4399 24.8559 19.8461C24.8525 20.2992 25.4065 20.6031 26.3123 21.0529C27.8111 21.7467 28.505 22.5901 28.4918 23.6969H28.4918Z" fill="#006CB5"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M35.5264 17.1489H33.5229C32.9008 17.1489 32.4346 17.3222 32.1643 17.9589L28.31 26.8838H31.0333C31.0333 26.8838 31.4794 25.6838 31.5813 25.4201C31.8773 25.4201 34.5263 25.4269 34.9041 25.4269C34.9793 25.7675 35.2169 26.8838 35.2169 26.8838H37.625L35.5264 17.1489V17.1489ZM32.3268 23.4297C32.7931 22.2179 33.2606 20.9973 33.7047 19.7761C33.9601 20.9947 34.2212 22.212 34.4805 23.4297H32.3268H32.3268Z" fill="#006CB5"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M18.4894 17.1389H21.0833L19.4602 26.8806H16.867L18.4894 17.1389Z" fill="#006CB5"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M5.37499 17.053L9.76406 17.0561C10.3052 17.0757 10.7415 17.2523 10.8949 17.8455L11.5707 21.2139C10.422 19.4578 8.5642 18.3737 8.14573 18.1469C8.13357 18.1401 8.12157 18.1333 8.10937 18.1265L8.10967 18.1275L8.13474 18.1409L8.1092 18.1264C8.03924 18.0872 7.96852 18.0485 7.89712 18.0106C7.1305 17.6035 6.28263 17.2771 5.37498 17.053L5.37499 17.053Z" fill="#FAA841"/>
                            </g>
                            <defs><clipPath id="clip0_9008_106"><rect width="43" height="44" fill="white"/></clipPath></defs>
                        </svg>

                        <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M28.7734 14.5001C28.7734 19.2126 24.9672 23.0642 20.2094 23.0642C15.4969 23.0642 11.6453 19.2126 11.6453 14.5001C11.6453 9.7876 15.4516 5.93604 20.1641 5.93604C24.9672 5.93604 28.7734 9.7876 28.7734 14.5001Z" fill="#FFB600"/>
                            <path d="M20.2094 5.93604C24.9219 5.93604 28.7734 9.7876 28.7734 14.5001C28.7734 19.2126 24.9672 23.0642 20.2094 23.0642C15.4969 23.0642 11.6453 19.2126 11.6453 14.5001" fill="#F7981D"/>
                            <path d="M20.2094 5.93604C24.9219 5.93604 28.7734 9.7876 28.7734 14.5001C28.7734 19.2126 24.9672 23.0642 20.2094 23.0642" fill="#FF8500"/>
                            <path d="M8.7 5.93604C4.03281 5.98135 0.226562 9.7876 0.226562 14.5001C0.226562 19.2126 4.03281 23.0642 8.79062 23.0642C11.0109 23.0642 13.0047 22.2032 14.5453 20.8438C14.8625 20.572 15.1344 20.2548 15.4062 19.9376H13.6391C13.4125 19.6657 13.1859 19.3485 13.0047 19.0767H16.0406C16.2219 18.8048 16.4031 18.4876 16.5391 18.1704H12.5062C12.3703 17.8985 12.2344 17.5813 12.1437 17.2642H16.8562C17.1281 16.4032 17.3094 15.497 17.3094 14.5454C17.3094 13.911 17.2187 13.322 17.1281 12.7329H11.8719C11.9172 12.4157 12.0078 12.1438 12.0984 11.8267H16.8109C16.7203 11.5095 16.5844 11.1923 16.4484 10.9204H12.4609C12.5969 10.6032 12.7781 10.3313 12.9594 10.0142H15.9953C15.8141 9.69697 15.5875 9.37979 15.3156 9.10791H13.6391C13.9109 8.79072 14.1828 8.51885 14.5 8.24697C13.0047 6.84229 10.9656 6.02666 8.74531 6.02666C8.74531 5.93604 8.74531 5.93604 8.7 5.93604Z" fill="#FF5050"/>
                        </svg>

                        <svg width="33" height="9" viewBox="0 0 33 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M3.71955 0.193152C4.00258 0.191428 4.84371 0.114268 5.2 1.33901C5.44 2.16401 5.82231 3.5154 6.34692 5.39317H6.56057C7.12317 3.41349 7.50965 2.0621 7.72 1.33901C8.08 0.10151 8.98 0.193177 9.34 0.193177L12.1175 0.19318V8.99316H9.2866V3.80718H9.09677L7.51869 8.99316H5.3888L3.81072 3.80334H3.62089V8.99316H0.79V0.19318L3.71955 0.193152ZM16.1826 0.19318V5.38302H16.4084L18.328 1.11545C18.7006 0.266193 19.4948 0.19318 19.4948 0.19318H22.2343V8.99318H19.3443V3.80334H19.1184L17.2365 8.07091C16.8639 8.91632 16.032 8.99318 16.032 8.99318H13.2926V0.19318H16.1826ZM32.2234 4.375C31.8203 5.53852 30.5543 6.3718 29.1527 6.3718H26.122V8.99318H23.3738V4.375H32.2234Z" fill="#0F754E"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M29.2853 0.193115H23.2296C23.3738 2.15229 25.0303 3.82948 26.7451 3.82948H32.4144C32.7416 2.20117 31.6153 0.193115 29.2853 0.193115Z" fill="url(#paint0_linear_9008_101)"/>
                            <defs>
                                <linearGradient id="paint0_linear_9008_101" x1="32.47" y1="2.48054" x2="23.2296" y2="2.48054" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#1F5CD7"/>
                                    <stop offset="1" stopColor="#02AEFF"/>
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>

                    <div className={styles.bottom_links}>
                        <a className={styles.bottom_link} href="/faq">Условия пользования</a>
                        <a className={styles.bottom_link} href="/faq">Политика конфиденциальности</a>
                    </div>

                    <p className={styles.copy}>© 2026 4:20 shop. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;