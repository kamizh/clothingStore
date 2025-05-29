import styles from './ordersList.module.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

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
        orders.map((item, index) => (
          <div key={item.id || index} className={styles.row}>
            <div className={styles.photo}>
              <img src={item.ImageUrl} alt="product" />
            </div>
            <div>{item.Color}</div>
            <div>{item.Size}</div>
            <div className={styles.bold}>{item.Price} ₽</div>
            <div className={styles.quantity}>
              <button disabled>−</button>
              <span>{item.Count}</span>
              <button disabled>+</button>
            </div>
            <div className={styles.bold}>
              {item.Count * item.Price} ₽
            </div>
          </div>
        ))
      ) : (
        <p>Заказы отсутствуют</p>
      )}
    </div>
  );
}

export default OrderList;
