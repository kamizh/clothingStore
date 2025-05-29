import styles from "./subscribe.module.css"
import { useState } from "react";

function Subscribe()
{
    const [email, setEmail] = useState("");

    // Функция обработки ввода
    const handleChange = (event) => {
        setEmail(event.target.value);
    };


    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <div className={styles.subscribe}>
            <div className={styles.subscribe_content}>
                <h1 className={styles.text}>Скидка 10% на подписку</h1>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <input
                        type="email"
                        placeholder="Ваш E-mail"
                        value={email}
                        onChange={handleChange}
                        className={styles.input}
                        required
                    />
                    <button type="submit" className={styles.button}>Подписаться</button>
                </form>
            </div>
        </div>


    )
}
export default Subscribe;