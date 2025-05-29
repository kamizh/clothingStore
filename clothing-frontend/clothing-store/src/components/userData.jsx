import styles from './userData.module.css'
import React from 'react'

function MyProfile({user})
{

   

    return (
        <div className={styles.container}>
            <div className={styles.container_content}>
                <h1 className={styles.title}>Мой профиль</h1>
                <div className={styles.data_section}>
                    <div className={styles.data_container}>
                        <p className={styles.header_text}>Контакты</p>
                        <p className={styles.data_text}>{user.Email}</p>
                    </div>
                    <div className={styles.line}></div>
                    <div className={styles.data_container}>
                        <p className={styles.header_text}>Адрес доставки</p>
                        <p className={styles.data_text}>{user.Adresses.length == 0 ? "Не указано" : user.Adresses.toString()}</p>

                    </div>
                    <div className={styles.line}></div>

                    <div className={styles.data_container}>
                        <p className={styles.header_text}>Дата рождения</p>
                        <p className={styles.data_text}>{user.BirthDay === "" ? "Не указано" : user.BirthDay}</p>

                    </div>
                     <div className={styles.line}></div>

                    <div className={styles.data_container}>
                        <p className={styles.header_text}>Бонусы</p>
                        <p className={styles.data_text}>{user.BonusCount}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyProfile;

/*
{
    "Id": 21,
    "Name": null,
    "Surname": null,
    "Email": "cool@mail.ru",
    "Adresses": [],
    "BirthDay": "",
    "BonusCount": 0
} */