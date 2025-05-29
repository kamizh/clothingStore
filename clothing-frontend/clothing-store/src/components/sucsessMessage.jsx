import React from 'react';
import styles from './sucsessMessage.module.css'
import { useNavigate } from 'react-router-dom';

export default function SuccessMessage() {
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate('/catalog'); // путь к каталогу
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.messageBox}>
        <h2 className={styles.title}>Спасибо за заказ!</h2>
        <p className={styles.text}>Ваш заказ был успешно оформлен. Мы свяжемся с вами в ближайшее время.</p>
        <button className={styles.button} onClick={handleContinueShopping}>Покупать дальше</button>
      </div>
    </div>
  );
}
