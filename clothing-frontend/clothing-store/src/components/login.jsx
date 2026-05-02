import React, { useState, useContext } from "react";
import styles from "./login.module.css";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function Login({ onClose }) {
  const auth = useContext(AuthContext);
  const { login } = auth;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  const validate = () => {
    const isEmailValid =
      email.trim().length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const isPasswordValid =
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password);

    setErrorEmail(!isEmailValid);
    setErrorPassword(!isPasswordValid);

    return isEmailValid && isPasswordValid;
  };

  const connectServer = async (e) => {
  e.preventDefault();
  if (!validate()) return;

  try {
    const data = { Login: email, Password: password };
    const response = await axios.post(
      "http://localhost:5095/api/Entrance/login",
      data
    );

    if (response.data.token) {
      login(response.data.token);
      onClose?.();
    }
  } catch (err) {
    setErrorPassword(true);
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

        <h1 className={styles.title}>Вход</h1>
        <p className={styles.subtitle}>
          Войдите в аккаунт, чтобы сохранить избранное, управлять корзиной
          и продолжить покупки.
        </p>

        <form onSubmit={connectServer} className={styles.form}>
          <div className={styles.section_input}>
            <p className={styles.text}>E-mail</p>
            <input
              value={email}
              type="email"
              className={styles.input_pole}
              placeholder="Введите ваш e-mail"
              onChange={(e) => setEmail(e.target.value)}
            />
            {errorEmail && (
              <p className={styles.error}>Неверный формат e-mail</p>
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
              <p className={styles.error}>Неправильный email или пароль</p>
            )}
          </div>

          <button type="submit" className={styles.button_submit}>
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}