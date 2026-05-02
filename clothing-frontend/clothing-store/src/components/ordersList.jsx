import styles from './ordersList.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function OrderList({ user }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) return;

    axios
      .get("http://localhost:5095/api/cart/orders?UserId=" + user.Id)
      .then(res => setOrders(res.data))
      .catch((err) => console.log("ошибка при запросе к заказам - " + err));
  }, [user]);

  return (
    <div className={styles.container}>
      {orders.length > 0 ? (
        <div className={styles.ordersGrid}>
          {orders.map((item, index) => (
            <div key={item.id || index} className={styles.row}>
              <div className={styles.photo}>
                <img src={item.ImageUrl} alt="product" />
              </div>

              <div>{item.Color}</div>
              <div>{item.Size}</div>
              <div className={styles.bold}>{item.Price} ₽</div>

              <div className={styles.quantity}>
                <span>{item.Count}</span>
              </div>

              <div className={styles.bold}>{item.Count * item.Price} ₽</div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <div className={styles.emptyBadge}>Orders</div>

          <h2 className={styles.emptyTitle}>У вас пока нет заказов</h2>

          <p className={styles.emptyText}>
            Здесь будет отображаться история оформленных заказов: товары, сумма,
            количество и основные детали покупки. После первого оформления
            заказа этот раздел начнёт заполняться автоматически.
          </p>

          <div className={styles.emptyActions}>
            <Link to="/catalog" className={styles.emptyButton}>
              Перейти в каталог
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderList;