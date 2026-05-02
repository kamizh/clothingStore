import React from "react";
import styles from "./sucsessMessage.module.css";
import { useNavigate } from "react-router-dom";

export default function SuccessMessage({
  orderNumber = "A-20481",
  total = 0,
  itemsCount = 0,
  items = [],
}) {
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate("/catalog");
  };

  const handleGoProfile = () => {
    navigate("/profile");
  };

  const visibleItems = items.slice(0, 3);

  return (
    <div className={styles.overlay}>
      <div className={styles.messageBox}>
        <div className={styles.badge}>ORDER CONFIRMED</div>

        <h2 className={styles.title}>Заказ успешно оформлен</h2>

        <p className={styles.text}>
          Спасибо за покупку. Мы приняли ваш заказ в обработку и скоро свяжемся
          с вами для подтверждения деталей доставки.
        </p>

        <div className={styles.summaryGrid}>
          <div className={styles.summaryCard}>
            <span className={styles.summaryLabel}>Номер заказа</span>
            <span className={styles.summaryValue}>{orderNumber}</span>
          </div>

          <div className={styles.summaryCard}>
            <span className={styles.summaryLabel}>Товаров</span>
            <span className={styles.summaryValue}>{itemsCount}</span>
          </div>

          <div className={styles.summaryCard}>
            <span className={styles.summaryLabel}>Сумма</span>
            <span className={styles.summaryValue}>{total} ₽</span>
          </div>
        </div>

        {visibleItems.length > 0 && (
          <div className={styles.itemsBlock}>
            <p className={styles.itemsTitle}>Состав заказа</p>

            <div className={styles.itemsList}>
              {visibleItems.map((item, index) => (
                <div key={item.CartId || item.Id || index} className={styles.itemRow}>
                  <div className={styles.itemImageWrap}>
                    <img
                      src={item.ImageUrl}
                      alt={item.Name || "Товар"}
                      className={styles.itemImage}
                    />
                  </div>

                  <div className={styles.itemInfo}>
                    <p className={styles.itemName}>{item.Name || "Товар"}</p>
                    <p className={styles.itemMeta}>
                      {item.Color ? `${item.Color}` : ""}
                      {item.Size ? ` · ${item.Size}` : ""}
                      {item.Count ? ` · ${item.Count} шт.` : ""}
                    </p>
                  </div>

                  <div className={styles.itemPrice}>
                    {(item.Price || 0) * (item.Count || 1)} ₽
                  </div>
                </div>
              ))}
            </div>

            {items.length > 3 && (
              <p className={styles.moreText}>И ещё {items.length - 3} товар(а) в заказе.</p>
            )}
          </div>
        )}

        <div className={styles.infoPanel}>
          <div className={styles.infoRow}>
            <span className={styles.infoDot}></span>
            <span>Подтверждение заказа сохранено в системе</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoDot}></span>
            <span>Детали заказа можно посмотреть в профиле</span>
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.secondaryButton} onClick={handleGoProfile}>
            В профиль
          </button>
          <button className={styles.primaryButton} onClick={handleContinueShopping}>
            Продолжить покупки
          </button>
        </div>
      </div>
    </div>
  );
}