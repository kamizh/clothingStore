import React from "react";
import styles from './cart.module.css'
import { useState,useContext,useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import PopularProducts from "../components/popularProducts";
import LoginOffer from "../components/loginoffer";
import axios from "axios";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import SuccessMessage from "../components/sucsessMessage";
function Cart(props)
{

    const {token} = useContext(AuthContext);

    const [currentUser,setCurrentUser] = useState(null);

    const [cartItems,setCartItems] = useState([]);

    const [phone,setPhone] = useState("");

    const [nameUser,setNameUser] = useState("");
    const [emailUser,setEmailUser] = useState("");

    const [isEmpty,setIsEmpty] = useState(false);

    const [isSuccess,setIsSuccess] = useState(false);
    
    const fetchCartItems = () => {
    axios
        .get(`http://localhost:5095/api/cart/everything?UserId=${currentUser.Id}`)
        .then(res => setCartItems(res.data))
        .catch(err => {
        console.error();
        });
    };


    useEffect(() => {
        if (!token) return;

        axios.get("http://localhost:5095/api/Entrance/me", {
        headers: {
            Authorization: `Bearer ${token}`
        }
        })
        .then(res => setCurrentUser(res.data))
        .catch(err => {
        console.error();
        });
    }, [token]);

    useEffect(() => {
        if (!token || !currentUser) return;

          fetchCartItems();

        }, [token, currentUser]);


    const handleDecrease = (item) => {
    const id = item.CartId;

    axios
        .put(`http://localhost:5095/api/cart/minus?CartItemId=${id}`)
        .then(() => fetchCartItems())
        .catch((err) => console.log());
    };

    const handleIncrease = (item) => {
        const id = item.CartId;

        axios
            .put(`http://localhost:5095/api/cart/plus?CartItemId=${id}`)
            .then(() => fetchCartItems())
            .catch((err) => console.log());
        };

    const handleDelete = (id) => {
        axios
            .delete(`http://localhost:5095/api/cart/delete?CartItemId=${id}`)
            .then(() => fetchCartItems())
            .catch((err) => console.log());
        };

    const totalPrice = cartItems.reduce((sum, item) => sum + item.Price * item.Count, 0);
    const discount = Math.round(cartItems.reduce((sum, item) => sum + (item.Price * item.Discount / 100) * item.Count, 0));
    
    const finalTotal = totalPrice - discount;
    const delivery = finalTotal > 3000 ? 0 : 500;




    const clearAll = () => {

        setCartItems([]);
        setIsEmpty(true);
        setIsSuccess(true);

    }

    const handleMakeButton = (event) => {
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

        const cartItemsId = cartItems.map(item => item.CartId);

        const dto = {
            UserId: currentUser.Id,
            CartItems: cartItemsId,
            Phone: phone,
            Price: finalTotal
        };


         axios.post("http://localhost:5095/api/cart/create-order", dto)
             .then(() => clearAll())


    };

    useEffect(() => {
        setIsEmpty(cartItems.length === 0);
    }, [cartItems]);


    if(!token)
        return <LoginOffer/>

    

    if(currentUser != undefined)
    {
         return (
        <div className={styles.cart}>
            {isSuccess && <SuccessMessage/>}
            <div className={styles.container_content}>
                <div className={styles.client_information_container}>
                    <h1 className={styles.title}>Информация о клиенте</h1>
                    <div className={styles.input_section}>
                        <p className={styles.text}>Ваше имя*</p>
                        <p className={styles.text_sub}>Имя получателя заказа</p>
                        <input  onChange={(e) => setNameUser(e.target.value)} type="text" placeholder="Ваше имя" className={styles.input} />
                    </div>
                    <div className={styles.input_section}>
                        <p className={styles.text}>e-mail*</p>
                        <p className={styles.text_sub}>Для отправки деталей заказа, статуса производства и доставки</p>
                        <input  onChange={(e) => setEmailUser(e.target.value)} type="text" placeholder="Введите e-mail" className={styles.input} />
                    </div>
                    <div className={styles.input_section}>
                        <p className={styles.text}>телефон*</p>
                        <p className={styles.text_sub}>Чтобы мы могли связаться для уточнения деталей доставки или заказанного товара</p>
                        <PhoneInput
                        country={'ru'}
                        value={phone}
                        onChange={setPhone}
                        />                    
                    </div>
                </div>
                <div className={styles.items_container}>
                    <h1 className={styles.title}>Предметы</h1>

                    <div className={styles.cart_table}>
                        <div className={`${styles.row} ${styles.header}`}>
                            <div>ФОТО</div>
                            <div>ЦВЕТ</div>
                            <div>РАЗМЕР</div>
                            <div>ЦЕНА</div>
                            <div>КОЛ-ВО</div>
                            <div>СУММА</div>
                        </div>
                        {isEmpty && <p className={styles.cart_empty}>Корзина пустая</p>}
                        {cartItems.map((item, index) => (
                        <div key={item.id || index} className={styles.row}>
                            <div className={styles.photo}>
                            <img src={item.ImageUrl} alt="product" />
                            </div>
                            <div>{item.Color}</div>
                            <div>{item.Size}</div>
                            <div className={styles.bold}>{item.Price} ₽</div>

                            <div className={styles.quantity}>
                            <button onClick={() => handleDecrease(item)}>−</button>
                            <span>{item.Count}</span>
                            <button onClick={() => handleIncrease(item)}>+</button>
                            </div>

                            <div className={styles.bold}>
                            {item.Count * item.Price} ₽
                            </div>

                            <div className={styles.actions}>
                            <button onClick={() => handleDelete(item.id)} className={styles.delete}>Удалить</button>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>

            </div>

            <div className={styles.container_content_two}>
                <div className={styles.dilivery_info}>
                    <h1 className={styles.title}>Информация о доставке</h1>
                    <p className={styles.text_sub}>Бесплатная доставка при заказе от 3 000 руб.
                            Вы можете выбрать подходящий для вас способ доставки товара:</p>
                    <div className={styles.info_section}>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 15H30" stroke="#565656" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M28 23V26C28 26.2652 27.8946 26.5196 27.7071 26.7071C27.5196 26.8946 27.2652 27 27 27H24C23.7348 27 23.4804 26.8946 23.2929 26.7071C23.1054 26.5196 23 26.2652 23 26V23" stroke="#565656" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M9 23V26C9 26.2652 8.89464 26.5196 8.70711 26.7071C8.51957 26.8946 8.26522 27 8 27H5C4.73478 27 4.48043 26.8946 4.29289 26.7071C4.10536 26.5196 4 26.2652 4 26V23" stroke="#565656" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M8 19H10" stroke="#565656" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M22 19H24" stroke="#565656" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M28 15L24.2639 6.59386C24.1854 6.4171 24.0572 6.26691 23.895 6.16151C23.7328 6.0561 23.5436 6 23.3501 6H8.64987C8.45644 6 8.26716 6.0561 8.10496 6.16151C7.94277 6.26691 7.81463 6.4171 7.73606 6.59386L4 15V23H28V15Z" stroke="#565656" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>

                        <p className={styles.info_text}>Курьерская доставка. Срок – от 1 дня.</p>
                    </div>
                    <div className={styles.info_section}>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M28 22.1653V9.83496C28 9.65752 27.9528 9.48328 27.8632 9.33011C27.7736 9.17695 27.6449 9.05038 27.4903 8.96339L16.4903 2.77589C16.3406 2.69169 16.1717 2.64746 16 2.64746C15.8283 2.64746 15.6594 2.69169 15.5097 2.77589L4.50974 8.96339C4.35509 9.05038 4.22637 9.17695 4.13679 9.33011C4.04721 9.48328 4 9.65752 4 9.83496V22.1653C4 22.3427 4.04721 22.5169 4.13679 22.6701C4.22637 22.8233 4.35509 22.9498 4.50974 23.0368L15.5097 29.2243C15.6594 29.3085 15.8283 29.3528 16 29.3528C16.1717 29.3528 16.3406 29.3085 16.4903 29.2243L27.4903 23.0368C27.6449 22.9498 27.7736 22.8233 27.8632 22.6701C27.9528 22.5169 28 22.3427 28 22.1653Z" stroke="#565656" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M22.1278 19.0639V12.5639L10 5.875" stroke="#565656" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M27.8623 9.3284L16.1188 16L4.13867 9.32715" stroke="#565656" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M16.1193 16L16.002 29.3527" stroke="#565656" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>

                        <p className={styles.info_text}>Пункты выдачи заказов и постаматы. Срок – от 1 дня.</p>
                    </div>
                    <div className={styles.info_section}>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 29H25" stroke="#565656" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M16 17C18.2091 17 20 15.2091 20 13C20 10.7909 18.2091 9 16 9C13.7909 9 12 10.7909 12 13C12 15.2091 13.7909 17 16 17Z" stroke="#565656" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M26 13C26 22 16 29 16 29C16 29 6 22 6 13C6 10.3478 7.05357 7.8043 8.92893 5.92893C10.8043 4.05357 13.3478 3 16 3C18.6522 3 21.1957 4.05357 23.0711 5.92893C24.9464 7.8043 26 10.3478 26 13V13Z" stroke="#565656" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>


                        <p className={styles.info_text}>Самовывозом из магазина. Срок – от 1 дня.</p>
                    </div>
                </div>
                <div className={styles.itog_section}>
                    <div className={styles.itog_div}>
                        <p className={styles.text_sub}>Количество</p>
                        <div className={styles.dots}></div>
                        <p className={styles.info_text}>{cartItems.length}</p>
                    </div>
                    <div className={styles.itog_div}>
                        <p className={styles.text_sub}>Стоимость</p>
                        <div className={styles.dots}></div>
                        <p className={styles.info_text}>{totalPrice} ₽</p>
                    </div>
                    <div className={styles.itog_div}>
                        <p className={styles.text_sub}>Скидка</p>
                        <div className={styles.dots}></div>
                        <p className={styles.info_text_sale}>{discount} ₽</p>
                    </div>
                    <div className={styles.itog_div}>
                        <p className={styles.text_sub}>Доставка</p>
                        <div className={styles.dots}></div>
                        <p className={styles.info_text_sale}>{delivery} ₽</p>
                    </div>
                    <div className={styles.itog_div}>
                        <p className={styles.text_itog}>ИТОГО</p>
                        <div className={styles.dots}></div>
                        <p className={styles.info_text_sum}>{finalTotal + delivery}</p>
                    </div>
                    <button onClick={handleMakeButton} className={styles.itog_button}>Оформить заказ</button>

                </div>
            </div>
            <PopularProducts/>
        </div>
    )
    }
    else 
        return <LoginOffer/>

   
}
export default Cart;