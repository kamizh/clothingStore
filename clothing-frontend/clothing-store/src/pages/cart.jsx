import React, { useContext, useEffect, useState } from "react";
import styles from "./cart.module.css";
import { AuthContext } from "../context/AuthContext";
import LoginOffer from "../components/loginoffer";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import SuccessMessage from "../components/sucsessMessage";
import PaymentModal from "../components/PaymentModal";

function Cart() {
  const { token } = useContext(AuthContext);

  const [currentUser, setCurrentUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [phone, setPhone] = useState("");
  const [nameUser, setNameUser] = useState("");
  const [emailUser, setEmailUser] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPayment,setShowPayment] = useState(false);
  const [completedOrder,setCompletedOrder] = useState(null);

  const fetchCartItems = () => {
    if (!currentUser?.Id) return;

    axios
      .get(`http://localhost:5095/api/cart/everything?UserId=${currentUser.Id}`)
      .then((res) => setCartItems(res.data))
      .catch(() => console.error("Ошибка при загрузке корзины"));
  };

  useEffect(() => {
    if (!token) return;

    axios
      .get("http://localhost:5095/api/Entrance/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setCurrentUser(res.data))
      .catch(() => console.error("Ошибка при получении пользователя"));
  }, [token]);

  useEffect(() => {
    if (!token || !currentUser) return;
    fetchCartItems();
  }, [token, currentUser]);

  useEffect(() => {
    setIsEmpty(cartItems.length === 0);
  }, [cartItems]);

  

  const handleIncrease = (item) => {
    const id = item.CartId;

    axios
      .put(`http://localhost:5095/api/cart/plus?CartItemId=${id}`)
      .then(() => fetchCartItems())
      .catch(() => console.log("Ошибка при увеличении количества"));
  };

  const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:5095/api/cart/delete?CartItemId=${id}`);

    setCartItems((prev) => prev.filter((item) => item.CartId !== id));

    fetchCartItems();
  } catch (err) {
    console.log("Ошибка при удалении товара");
  }
};

  const totalPrice = cartItems.reduce((sum, item) => sum + item.Price * item.Count, 0);
  const discount = Math.round(
    cartItems.reduce((sum, item) => sum + ((item.Price * item.Discount) / 100) * item.Count, 0)
  );
  const finalTotal = totalPrice - discount;
  const delivery = cartItems.length === 0 ? 0 : finalTotal > 3000 ? 0 : 500;
  const grandTotal = finalTotal + delivery;

  const clearAll = () => {
    setCartItems([]);
    setIsEmpty(true);
    setIsSuccess(true);
  };

  const handleMakeButton = () => {
  if (cartItems.length === 0) {
    alert("Ваша корзина пуста");
    return;
  }

  const isPhoneValid = phone && phone.length === 11 && phone.startsWith("7");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(emailUser);
  const isNameValid = nameUser.trim().length >= 2;

  if (!isNameValid || !isEmailValid || !isPhoneValid) {
    alert("Пожалуйста, корректно заполните все поля!");
    return;
  }

  setShowPayment(true);
};

const handlePaymentSuccess = async () => {
  if (cartItems.length === 0) {
    alert("Корзина пуста");
    setShowPayment(false);
    return;
  }

  const orderData = {
    orderNumber: `ORD-${currentUser?.Id || 0}-${Date.now().toString().slice(-5)}`,
    total: grandTotal,
    itemsCount: cartItems.length,
    items: [...cartItems],
  };

  const cartItemsId = cartItems.map((item) => item.CartId);

  const dto = {
    UserId: currentUser.Id,
    CartItems: cartItemsId,
    Phone: phone,
    Price: finalTotal,
  };

  try {
    await axios.post("http://localhost:5095/api/cart/create-order", dto);

    setCompletedOrder(orderData);
    setShowPayment(false);
    setCartItems([]);
    setIsEmpty(true);
    setIsSuccess(true);
  } catch (err) {
    alert("Ошибка при создании заказа");
  }
};

  if (!token) return <LoginOffer />;

  if (!currentUser) return null;

  return (
    <section className={styles.cart}>
      {isSuccess && completedOrder && (
  <SuccessMessage
    orderNumber={completedOrder.orderNumber}
    total={completedOrder.total}
    itemsCount={completedOrder.itemsCount}
    items={completedOrder.items}
  />
)}

{showPayment && (
  <PaymentModal
    total={grandTotal}
    onClose={() => setShowPayment(false)}
    onSuccess={handlePaymentSuccess}
  />
)}

      <div className={styles.pageHeader}>
        <div>
          <p className={styles.eyebrow}>Checkout</p>
          <h1 className={styles.pageTitle}>Корзина</h1>
        </div>

        <div className={styles.pageMeta}>
          <span className={styles.metaChip}>Товаров: {cartItems.length}</span>
          {!isEmpty && <span className={styles.metaChip}>Итого: {grandTotal} ₽</span>}
        </div>
      </div>

      <div className={styles.layout}>
        <div className={styles.leftColumn}>
          <div className={styles.block}>
            <div className={styles.blockHeader}>
              <h2 className={styles.blockTitle}>Информация о клиенте</h2>
              <p className={styles.blockDescription}>
                Заполните данные получателя для оформления заказа.
              </p>
            </div>

            <div className={styles.formGrid}>
              <div className={styles.inputSection}>
                <label className={styles.label}>Ваше имя*</label>
                <span className={styles.helper}>Имя получателя заказа</span>
                <input
                  onChange={(e) => setNameUser(e.target.value)}
                  type="text"
                  placeholder="Ваше имя"
                  className={styles.input}
                />
              </div>

              <div className={styles.inputSection}>
                <label className={styles.label}>E-mail*</label>
                <span className={styles.helper}>
                  Для деталей заказа, статуса и уведомлений
                </span>
                <input
                  onChange={(e) => setEmailUser(e.target.value)}
                  type="text"
                  placeholder="Введите e-mail"
                  className={styles.input}
                />
              </div>

              <div className={styles.inputSection}>
                <label className={styles.label}>Телефон*</label>
                <span className={styles.helper}>
                  Чтобы мы могли связаться по доставке
                </span>
                <div className={styles.phoneWrapper}>
                  <PhoneInput country={"ru"} value={phone} onChange={setPhone} />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.block}>
            <div className={styles.blockHeader}>
              <h2 className={styles.blockTitle}>Информация о доставке</h2>
              <p className={styles.blockDescription}>
                Бесплатная доставка при заказе от 3 000 ₽.
              </p>
            </div>

            <div className={styles.deliveryList}>
              <div className={styles.deliveryItem}>
                <div className={styles.deliveryIcon}>
                  <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                    <path d="M2 15H30" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M28 23V26C28 26.2652 27.8946 26.5196 27.7071 26.7071C27.5196 26.8946 27.2652 27 27 27H24C23.7348 27 23.4804 26.8946 23.2929 26.7071C23.1054 26.5196 23 26.2652 23 26V23" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 23V26C9 26.2652 8.89464 26.5196 8.70711 26.7071C8.51957 26.8946 8.26522 27 8 27H5C4.73478 27 4.48043 26.8946 4.29289 26.7071C4.10536 26.5196 4 26.2652 4 26V23" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M28 15L24.2639 6.59386C24.1854 6.4171 24.0572 6.26691 23.895 6.16151C23.7328 6.0561 23.5436 6 23.3501 6H8.64987C8.45644 6 8.26716 6.0561 8.10496 6.16151C7.94277 6.26691 7.81463 6.4171 7.73606 6.59386L4 15V23H28V15Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <p className={styles.deliveryTitle}>Курьерская доставка</p>
                  <p className={styles.deliveryText}>Срок — от 1 дня</p>
                </div>
              </div>

              <div className={styles.deliveryItem}>
                <div className={styles.deliveryIcon}>
                  <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                    <path d="M28 22.1653V9.83496C28 9.65752 27.9528 9.48328 27.8632 9.33011C27.7736 9.17695 27.6449 9.05038 27.4903 8.96339L16.4903 2.77589C16.3406 2.69169 16.1717 2.64746 16 2.64746C15.8283 2.64746 15.6594 2.69169 15.5097 2.77589L4.50974 8.96339C4.35509 9.05038 4.22637 9.17695 4.13679 9.33011C4.04721 9.48328 4 9.65752 4 9.83496V22.1653C4 22.3427 4.04721 22.5169 4.13679 22.6701C4.22637 22.8233 4.35509 22.9498 4.50974 23.0368L15.5097 29.2243C15.6594 29.3085 15.8283 29.3528 16 29.3528C16.1717 29.3528 16.3406 29.3085 16.4903 29.2243L27.4903 23.0368C27.6449 22.9498 27.7736 22.8233 27.8632 22.6701C27.9528 22.5169 28 22.3427 28 22.1653Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M27.8623 9.3284L16.1188 16L4.13867 9.32715" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16.1193 16L16.002 29.3527" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <p className={styles.deliveryTitle}>Пункты выдачи и постаматы</p>
                  <p className={styles.deliveryText}>Срок — от 1 дня</p>
                </div>
              </div>

              <div className={styles.deliveryItem}>
                <div className={styles.deliveryIcon}>
                  <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                    <path d="M7 29H25" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 17C18.2091 17 20 15.2091 20 13C20 10.7909 18.2091 9 16 9C13.7909 9 12 10.7909 12 13C12 15.2091 13.7909 17 16 17Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M26 13C26 22 16 29 16 29C16 29 6 22 6 13C6 10.3478 7.05357 7.8043 8.92893 5.92893C10.8043 4.05357 13.3478 3 16 3C18.6522 3 21.1957 4.05357 23.0711 5.92893C24.9464 7.8043 26 10.3478 26 13V13Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <p className={styles.deliveryTitle}>Самовывоз из магазина</p>
                  <p className={styles.deliveryText}>Срок — от 1 дня</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.block}>
            <div className={styles.blockHeader}>
              <h2 className={styles.blockTitle}>Товары в корзине</h2>
              <p className={styles.blockDescription}>
                Проверьте выбранные позиции перед оформлением заказа.
              </p>
            </div>

            {isEmpty ? (
              <div className={styles.emptyState}>
                <p className={styles.emptyTitle}>Корзина пока пуста</p>
                <p className={styles.emptyText}>
                  Добавьте товары в корзину, чтобы оформить заказ.
                </p>
              </div>
            ) : (
              <div className={styles.cartList}>
                {cartItems.map((item, index) => (
                  <div key={item.CartId || index} className={styles.cartCard}>
                    <div className={styles.cardImageWrap}>
                      <img src={item.ImageUrl} alt="product" className={styles.cardImage} />
                    </div>

                    <div className={styles.cardMain}>
                      <div className={styles.cardInfo}>
                        <p className={styles.cardBrand}>{item.BrandName || "Товар"}</p>
                        <div className={styles.cardMeta}>
                          <span>Цвет: {item.Color}</span>
                          <span>Размер: {item.Size}</span>
                        </div>
                      </div>

                      <div className={styles.cardControls}>
                        <div className={styles.quantity}>
                          <button type="button" onClick={() => handleDecrease(item)}>−</button>
                          <span>{item.Count}</span>
                          <button type="button" onClick={() => handleIncrease(item)}>+</button>
                        </div>

                        <div className={styles.priceBox}>
                          <span className={styles.unitPrice}>{item.Price} ₽</span>
                          <span className={styles.totalPrice}>{item.Count * item.Price} ₽</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleDelete(item.CartId)}
                          className={styles.delete}
                        >
                          Удалить
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={styles.summaryBlock}>
            <div className={styles.summaryRow}>
              <span>Количество</span>
              <span>{cartItems.length}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Стоимость</span>
              <span>{totalPrice} ₽</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Скидка</span>
              <span className={styles.saleValue}>{discount} ₽</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Доставка</span>
              <span className={styles.saleValue}>{delivery} ₽</span>
            </div>
            <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
              <span>Итого</span>
              <span>{isEmpty ? "—" : `${grandTotal} ₽`}</span>
            </div>

            <button
              onClick={handleMakeButton}
              className={styles.orderButton}
              disabled={isEmpty}
            >
              Оформить заказ
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;