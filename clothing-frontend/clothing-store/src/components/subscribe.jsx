import styles from "./subscribe.module.css";
import { useState } from "react";

function Subscribe() {
    const [email, setEmail] = useState("");

    const handleChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <section className={styles.subscribe}>
            <div className={styles.subscribe_content}>
                <div className={styles.left}>
                    <p className={styles.eyebrow}>Newsletter</p>
                    <h2 className={styles.text}>Получите скидку 10% на первый заказ</h2>
                    <p className={styles.subtext}>
                        Подпишитесь на рассылку, чтобы первыми узнавать о новинках,
                        сезонных релизах и закрытых предложениях.
                    </p>
                </div>

                <div className={styles.right}>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <input
                            type="email"
                            placeholder="Ваш e-mail"
                            value={email}
                            onChange={handleChange}
                            className={styles.input}
                            required
                        />
                        <button type="submit" className={styles.button}>
                            Подписаться
                        </button>
                    </form>

                    <p className={styles.note}>
                        Нажимая кнопку, вы соглашаетесь на получение писем и обработку данных.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default Subscribe;