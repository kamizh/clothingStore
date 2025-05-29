import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import styles from './profile.module.css'
import MyProfile from "../components/userData";
import PersonData from "../components/personData";
import FavoriteList from '../components/favorite'
import LoginOffer from "../components/loginoffer";
import OrderList from "../components/ordersList";

export default function Profile() {
  
  const { token, logout } = useContext(AuthContext); 
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [openData,setOpenData] = useState(true);
   const [openFavorite, setOpenFavorite] = useState(false);
   const [openOrders,setOpenOrders] = useState(false);

  useEffect(() => {
  if (!token) {
    setLoading(false);
    return;
  }

  axios.get("http://localhost:5095/api/Entrance/me", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      setUser(res.data);
    })
    .catch(err => {
      console.error("Ошибка при запросе /me:", err);
      setError(err);
    })
    .finally(() => {
      setLoading(false);
    });
}, [token]);


  if (loading) return <p>Загрузка...</p>;
  if (!token) return <LoginOffer/>
  if (error) return <LoginOffer/>;

  console.log(user);


  const handleUserUpdate = async (updatedUser) => {
    try {
      const res = await axios.put('http://localhost:5095/api/profile/update', updatedUser, {

      });

      // Обновим user в стейте
      setUser(res.data); // если API возвращает обновлённые данные
      alert("Данные успешно обновлены!");
    } catch (err) {
      console.error("Ошибка при обновлении данных:", err);
      alert("Ошибка при обновлении данных");
    }
  };


  const handleExitButton = (event) => {
    event.preventDefault();

    logout();
    navigator('/catalog');
  }
  

  if(!user)
  {
    return <LoginOffer/>
  }
   

  return (
        <div className={styles.container}>
            <div className={styles.container_content}>
                <MyProfile user={user}/>
                <div className={styles.middle_section}>
                    <div className={styles.container_link}>
                        <div className={styles.links}>
                            <button onClick={() => {
                              setOpenData(true);
                              setOpenOrders(false);
                              setOpenFavorite(false);
                            }} className={openData ? styles.active_link : styles.link}>Личные данные</button>
                            <button onClick={() =>{
                              setOpenData(false);
                              setOpenOrders(true);
                              setOpenFavorite(false);
                            }} className={openOrders ? styles.active_link : styles.link}>Заказы</button>
                            <button onClick={() => {
                              setOpenData(false);
                              setOpenOrders(false);
                              setOpenFavorite(true);
                            }} className={openFavorite ? styles.active_link : styles.link}>избранное</button>
                            <button onClick={(event) => handleExitButton(event)} href="" className={styles.link}>выйти</button>

                        </div>
                    </div>
                    <div className={styles.main_container}>
                        { openData && <PersonData user={user} onUpdate={handleUserUpdate}/>}
                        {openFavorite && <FavoriteList user={user}/>}
                        {openOrders && <OrderList user={user}/> }
                    </div>
                </div>
            </div>
        </div>
    )

}


