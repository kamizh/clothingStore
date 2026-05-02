import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./profile.module.css";
import MyProfile from "../components/userData";
import PersonData from "../components/personData";
import FavoriteList from "../components/favorite";
import LoginOffer from "../components/loginoffer";
import OrderList from "../components/ordersList";

export default function Profile() {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [openData, setOpenData] = useState(true);
  const [openFavorite, setOpenFavorite] = useState(false);
  const [openOrders, setOpenOrders] = useState(false);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    axios
      .get("http://localhost:5095/api/Entrance/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error("Ошибка при запросе /me:", err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  const handleUserUpdate = async (updatedUser) => {
    try {
      if (!updatedUser) {
        const res = await axios.get("http://localhost:5095/api/Entrance/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
        return;
      }

      const res = await axios.put("http://localhost:5095/api/profile/update", updatedUser);
      setUser(res.data);
      alert("Данные успешно обновлены!");
    } catch (err) {
      console.error("Ошибка при обновлении данных:", err);
      alert("Ошибка при обновлении данных");
    }
  };

  const handleExitButton = (event) => {
    event.preventDefault();
    logout();
    navigate("/catalog");
  };

  if (loading) return null;
  if (!token) return <LoginOffer />;
  if (error) return <LoginOffer />;
  if (!user) return <LoginOffer />;

  return (
    <section className={styles.container}>
      <div className={styles.pageHeader}>
        <div>
          <p className={styles.eyebrow}>Account</p>
          <h1 className={styles.pageTitle}>Мой профиль</h1>
        </div>
      </div>

      <div className={styles.container_content}>
        <div className={styles.topProfileCard}>
          <MyProfile user={user} />
        </div>

        <div className={styles.middle_section}>
          <aside className={styles.sidebar}>
            <div className={styles.sidebarCard}>
              <p className={styles.sidebarTitle}>Навигация</p>

              <div className={styles.links}>
                <button
                  onClick={() => {
                    setOpenData(true);
                    setOpenOrders(false);
                    setOpenFavorite(false);
                  }}
                  className={openData ? styles.active_link : styles.link}
                >
                  Личные данные
                </button>

                <button
                  onClick={() => {
                    setOpenData(false);
                    setOpenOrders(true);
                    setOpenFavorite(false);
                  }}
                  className={openOrders ? styles.active_link : styles.link}
                >
                  Заказы
                </button>

                <button
                  onClick={() => {
                    setOpenData(false);
                    setOpenOrders(false);
                    setOpenFavorite(true);
                  }}
                  className={openFavorite ? styles.active_link : styles.link}
                >
                  Избранное
                </button>

                <button onClick={handleExitButton} className={styles.link}>
                  Выйти
                </button>
              </div>
            </div>
          </aside>

          <div className={styles.main_container}>
            {openData && <PersonData user={user} onUpdate={handleUserUpdate} />}
            {openFavorite && <FavoriteList user={user} />}
            {openOrders && <OrderList user={user} />}
          </div>
        </div>
      </div>
    </section>
  );
}