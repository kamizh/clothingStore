import styles from "./userData.module.css";
import React from "react";

function MyProfile({ user }) {
  const fullName =
    `${user?.Name || ""} ${user?.Surname || ""}`.trim() || "Пользователь";

  const addressText =
    user?.Adresses && user.Adresses.length > 0
      ? `${user.Adresses[0].City || ""}${
          user.Adresses[0].Street ? `, ${user.Adresses[0].Street}` : ""
        }${user.Adresses[0].House ? `, ${user.Adresses[0].House}` : ""}${
          user.Adresses[0].Apartament ? `, ${user.Adresses[0].Apartament}` : ""
        }`.trim()
      : "Не указано";

  const birthText =
    user?.BirthDay && user.BirthDay !== ""
      ? new Date(user.BirthDay).toLocaleDateString("ru-RU")
      : "Не указано";

  return (
    <section className={styles.container}>
      <div className={styles.container_content}>
        <div className={styles.profile_intro}>
          <div className={styles.avatar}>{fullName.charAt(0).toUpperCase()}</div>

          <div className={styles.intro_texts}>
            <p className={styles.eyebrow}>Account overview</p>
            <h2 className={styles.title}>{fullName}</h2>
            <p className={styles.subtitle}>{user?.Email}</p>
          </div>
        </div>

        <div className={styles.data_section}>
          <div className={styles.data_card}>
            <p className={styles.header_text}>Контакты</p>
            <p className={styles.data_text}>{user?.Email}</p>
          </div>

         

          <div className={styles.data_card}>
            <p className={styles.header_text}>Дата рождения</p>
            <p className={styles.data_text}>{birthText}</p>
          </div>

          <div className={styles.data_card}>
            <p className={styles.header_text}>Бонусы</p>
            <p className={styles.data_text}>{user?.BonusCount ?? 0}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MyProfile;