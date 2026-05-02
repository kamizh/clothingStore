import styles from "./personData.module.css";
import axios from "axios";
import { useRef, useState } from "react";

function PersonData({ user, onUpdate }) {
  const [agree, setAgree] = useState(!!user?.WantReceipt);
  const [agreeOne, setAgreeOne] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const nameRef = useRef(null);
  const surnameRef = useRef(null);
  const emailRef = useRef(null);
  const birthRef = useRef(null);

  const getMaxBirthDate = () => {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 16);
    return today.toISOString().split("T")[0];
  };

  const getMinBirthDate = () => {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 100);
    return today.toISOString().split("T")[0];
  };

  const submitbutton = (event) => {
    event.preventDefault();

    if (!agreeOne) {
      alert("Согласие на обработку персональных данных обязательно!");
      return;
    }

    const birthValue = birthRef.current.value;

    if (!birthValue) {
      alert("Укажите дату рождения");
      return;
    }

    const birthDate = new Date(birthValue);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    if (age < 16 || age > 100) {
      alert("Возраст должен быть от 16 до 100 лет");
      return;
    }

    const updatedUser = {
      ...user,
      Name: nameRef.current.value.trim(),
      Surname: surnameRef.current.value.trim(),
      Email: emailRef.current.value.trim(),
      BirthDay: new Date(birthValue).toISOString(),
      WantReceipt: agree,
    };

    if (
      updatedUser.Name.length > 0 &&
      updatedUser.Surname.length > 0 &&
      updatedUser.Email.length > 0 &&
      updatedUser.BirthDay.length > 0
    ) {
      onUpdate(updatedUser);
    } else {
      alert("Все данные должны быть заполнены!");
    }
  };

  const submitPasswordButton = async (e) => {
    e.preventDefault();

    if (!newPassword) {
      alert("Поле не должно быть пустым");
      return;
    }

    const isPasswordValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(
      newPassword
    );

    if (!isPasswordValid) {
      alert("Пароль должен быть не менее 6 символов, содержать буквы и цифры");
      return;
    }

    try {
      const res = await axios.put("http://localhost:5095/api/profile/password", {
        UserId: user.Id,
        NewPassword: newPassword,
      });

      if (res.data.answer) {
        alert("Пароль изменён успешно");
        setNewPassword("");
      }
    } catch (err) {
      alert("Ошибка при смене пароля");
    }
  };

  return (
    <div className={styles.container_content}>
      <h1 className={styles.title}>Личные данные</h1>

      <div className={styles.section}>
        <p className={styles.text}>Имя*</p>
        <input
          defaultValue={user.Name || ""}
          ref={nameRef}
          type="text"
          className={styles.input}
        />
      </div>

      <div className={styles.section}>
        <p className={styles.text}>Фамилия*</p>
        <input
          defaultValue={user.Surname || ""}
          ref={surnameRef}
          type="text"
          className={styles.input}
        />
      </div>

      <div className={styles.section}>
        <p className={styles.text}>Электронная почта*</p>
        <input
          defaultValue={user.Email || ""}
          ref={emailRef}
          type="email"
          className={styles.input}
        />
      </div>

      <div className={styles.section}>
        <p className={styles.text}>Дата рождения*</p>
        <input
          defaultValue={user.BirthDay ? user.BirthDay.slice(0, 10) : ""}
          ref={birthRef}
          type="date"
          className={styles.input}
          min={getMinBirthDate()}
          max={getMaxBirthDate()}
        />
      </div>

      <div className={styles.radio_and_politic}>
        <input
          type="checkbox"
          checked={agreeOne}
          onChange={() => setAgreeOne((prev) => !prev)}
        />
        <p className={styles.politic}>
          Я согласен с политикой обработки персональных данных
        </p>
      </div>

      <div className={styles.radio_and_politic}>
        <input
          type="checkbox"
          checked={agree}
          onChange={() => setAgree((prev) => !prev)}
          className={styles.radio}
        />
        <p className={styles.politic}>
          Получать электронные чеки при покупке в рознице
        </p>
      </div>

      <button type="submit" onClick={submitbutton} className={styles.button}>
        сохранить изменения
      </button>

      <h1 className={styles.title}>Смена пароля</h1>

      <input
        type="password"
        className={styles.input}
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="Введите новый пароль"
      />

      <button
        type="submit"
        onClick={submitPasswordButton}
        className={styles.button}
      >
        сохранить изменения
      </button>
    </div>
  );
}

export default PersonData;