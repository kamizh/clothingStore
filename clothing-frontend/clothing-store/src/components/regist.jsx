import { useState, useContext } from "react";
import axios from "axios";
import styles from "./login.module.css";
import { AuthContext } from "../context/AuthContext";

function Regist({ onClose }) {
  const { login } = useContext(AuthContext);

  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  const validate = () => {
    const isEmailValid =
      Email.trim().length > 0 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email);

    const isPasswordValid =
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password);

    setErrorEmail(!isEmailValid);
    setErrorPassword(!isPasswordValid);

    return isEmailValid && isPasswordValid;
  };

  const connectServer = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const data = {
      Login: Email,
      Password: password,
    };

    try {
      const registResponse = await axios.post(
        "http://localhost:5095/api/Entrance/regist",
        data
      );

      if (registResponse.status >= 200 && registResponse.status < 300) {
        const loginResponse = await axios.post(
          "http://localhost:5095/api/Entrance/login",
          data
        );

        if (loginResponse.data.token) {
          login(loginResponse.data.token);
          onClose?.();
        }
      }
    } catch (error) {
      setErrorEmail(true);
    }
  };

  return (
    <div className={styles.entrance} onClick={onClose}>
      <div
        className={styles.entrance_content}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.exitButton} onClick={onClose} type="button">
          ×
        </button>

        <div className={styles.badge}>Account access</div>

        <h1 className={styles.title}>Регистрация</h1>
        <p className={styles.subtitle}>
          Создайте аккаунт, чтобы сохранять избранное, оформлять заказы
          и получить доступ к персональному профилю.
        </p>

        <form onSubmit={connectServer} className={styles.form}>
          <div className={styles.section_input}>
            <p className={styles.text}>E-mail</p>
            <input
              value={Email}
              type="email"
              className={styles.input_pole}
              placeholder="Введите ваш e-mail"
              onChange={(e) => setEmail(e.target.value)}
            />
            {errorEmail && (
              <p className={styles.error}>Введите корректный e-mail</p>
            )}
          </div>

          <div className={styles.section_input}>
            <p className={styles.text}>Пароль</p>
            <input
              value={password}
              type="password"
              className={styles.input_pole}
              placeholder="Введите ваш пароль"
              onChange={(e) => setPassword(e.target.value)}
            />
            {errorPassword && (
              <p className={styles.error}>
                Пароль от 6 символов, минимум 1 буква и 1 цифра, только латинские
              </p>
            )}
          </div>

          <button type="submit" className={styles.button_submit}>
            Зарегистрироваться
          </button>
        </form>
      </div>
    </div>
  );
}

export default Regist;