import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./loginOffer.module.css";
import PopularProducts from "./popularProducts";
import Login from './login.jsx';
import Regist from "./regist.jsx";

function LoginOffer() {
  const [showLogin, setShowLogin] = useState(false);

  const [showRegist,setShowRegist] = useState(false);

    const handleOpenRegist = () => {
    setShowRegist(true);
  };

  const handleCloseRegist = () => {
    setShowRegist(false);
  };

  const handleOpenLogin = () => {
    setShowLogin(true);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.text}>Войдите в аккаунт, чтобы продолжить</div>
        <button onClick={handleOpenLogin} className={styles.button}>
          Войти
        </button>
        <button onClick={handleOpenRegist} className={styles.button}>
          Зарегистрироваться
        </button>
      </div>

      {showLogin && <Login onClose={handleCloseLogin} />}
      {showRegist && <Regist onClose={handleCloseRegist}/>}
      <PopularProducts />
    </div>
  );
}

export default LoginOffer;
