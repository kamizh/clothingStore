import React, { useState } from "react";
import styles from "./loginOffer.module.css";
import Login from "./login.jsx";
import Regist from "./regist.jsx";

function LoginOffer() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegist, setShowRegist] = useState(false);

  const handleOpenRegist = () => setShowRegist(true);
  const handleCloseRegist = () => setShowRegist(false);

  const handleOpenLogin = () => setShowLogin(true);
  const handleCloseLogin = () => setShowLogin(false);

  return (
    <section className={styles.wrapper}>
      <div className={styles.hero}>
        <div className={styles.badge}>Account access</div>

        <h1 className={styles.title}>Войдите, чтобы продолжить покупки</h1>

        <p className={styles.text}>
          Авторизуйтесь, чтобы сохранять избранное, работать с корзиной,
          оформлять заказы и получать доступ к персональному профилю.
        </p>

        <div className={styles.actions}>
          <button onClick={handleOpenLogin} className={styles.primaryButton} type="button">
            Войти
          </button>

          <button onClick={handleOpenRegist} className={styles.secondaryButton} type="button">
            Зарегистрироваться
          </button>
        </div>

        <div className={styles.features}>
          <div className={styles.featureCard}>
            <span className={styles.featureNumber}>01</span>
            <h3 className={styles.featureTitle}>Избранное</h3>
            <p className={styles.featureText}>
              Сохраняйте понравившиеся товары и возвращайтесь к ним позже.
            </p>
          </div>

          <div className={styles.featureCard}>
            <span className={styles.featureNumber}>02</span>
            <h3 className={styles.featureTitle}>Корзина</h3>
            <p className={styles.featureText}>
              Добавляйте товары, выбирайте размеры и быстро переходите к заказу.
            </p>
          </div>

          <div className={styles.featureCard}>
            <span className={styles.featureNumber}>03</span>
            <h3 className={styles.featureTitle}>Профиль</h3>
            <p className={styles.featureText}>
              Управляйте своими данными, заказами и историей покупок в одном месте.
            </p>
          </div>
        </div>
      </div>

      {showLogin && <Login onClose={handleCloseLogin} />}
      {showRegist && <Regist onClose={handleCloseRegist} />}
    </section>
  );
}

export default LoginOffer;