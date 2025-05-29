import styles from './personData.module.css'
import axios from 'axios';
import { useRef, useState,useEffect } from 'react';

function PersonData({ user,onUpdate  }) {
  const [agree, setAgree] = useState(false);
  const [agreeOne, setAgreeOne] = useState(false);
  const [adress,setAdress] = useState(null);

  // Рефы
  const nameRef = useRef(null);
  const surnameRef = useRef(null);
  const emailRef = useRef(null);
  const birthRef = useRef(null);

  const submitbutton = (event) => {
    event.preventDefault();

    if (!agreeOne) {
        alert("Согласие на обработку персональных данных обязательно!");
        return;
    }

    const updatedUser = {
        ...user,
        Name: nameRef.current.value,
        Surname: surnameRef.current.value,
        Email: emailRef.current.value,
        BirthDay: birthRef.current.value,
        WantReceipt: agree
    };

    if (
        updatedUser.Name.length > 0 &&
        updatedUser.Surname.length > 0 &&
        updatedUser.Email.length > 0 &&
        updatedUser.BirthDay.length > 0
    ) {
        // Передаём наверх
        onUpdate(updatedUser);
    } else {
        alert("Все данные должны быть заполнены!");
    }
    
    };


    useEffect(() => {
    if (user.Adresses && user.Adresses.length > 0) {
        setAdress(user.Adresses[0]);
    } else {
        setAdress({
        City: "",
        Street: "",
        House: "",
        Apartament: ""
        });
    }
    }, [user.Adresses]);
  




    const cityRef = useRef(null);
    const streetRef = useRef(null);
    const houseRef = useRef(null);
    const apartamentRef = useRef(null);


    const  submitbuttonAdress =  async (event) => {
        event.preventDefault();

        const city = cityRef.current.value;
        const street = streetRef.current.value;
        const house = houseRef.current.value;
        const apartament = apartamentRef.current.value;
        
        if(city.length > 0 && street.length > 0 && house.length > 0 && apartament.length > 0)
        {
            setAdress({
                City: city,
                Street: street,
                House: house,
                Apartament: apartament
            });

            const addressToSend = {
                ...adress,
                UserId: user.Id  
            };

            try {
                await axios.put("http://localhost:5095/api/profile/adress", addressToSend); // или PUT, если ты обновляешь
                onUpdate(); // повторно загружаем данные профиля
            } catch (err) {
            }


        }
        else {
            alert("Все поля должны быть заполнены!");
        }
    }


    const password = useRef(null);

    const [newPassword, setNewPassword] = useState("");

    const submitPasswordButton = async (e) => {
        e.preventDefault();

        if (!newPassword) {
        alert("Поле не должно быть пустым");
        return;
        }

        const isPasswordValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(newPassword);
        if (!isPasswordValid) {
        alert("Пароль должен быть не менее 6 символов, содержать буквы и цифры");
        return;
        }



        try {
            const res = await axios.put("http://localhost:5095/api/profile/password", {
                UserId: user.Id,
                NewPassword: newPassword
            });



        if (res.data.answer) {
            alert("Пароль изменён успешно");
            setNewPassword(""); // очистить поле
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
        <input defaultValue={user.Name} ref={nameRef} type="text" className={styles.input} />
      </div>

      <div className={styles.section}>
        <p className={styles.text}>Фамилия*</p>
        <input defaultValue={user.Surname} ref={surnameRef} type="text" className={styles.input} />
      </div>

      <div className={styles.section}>
        <p className={styles.text}>электронная почта*</p>
        <input defaultValue={user.Email} ref={emailRef} type="email" className={styles.input} />
      </div>

      <div className={styles.section}>
        <p className={styles.text}>дата рождения*</p>
        <input defaultValue={user.BirthDay} ref={birthRef} type="datetime-local" className={styles.input} />
      </div>

      <div className={styles.radio_and_politic}>
        <input type="checkbox" checked={agreeOne} onChange={() => setAgreeOne((prev) => !prev)} />
        <p className={styles.politic}>Я согласен с политикой обработки персональных данных</p>
      </div>

      <div className={styles.radio_and_politic}>
        <input type="checkbox" checked={agree} onChange={() => setAgree((prev) => !prev)} className={styles.radio} />
        <p className={styles.politic}>Получать электронные чеки при покупке в рознице</p>
      </div>

      <button type="submit" onClick={submitbutton} className={styles.button}>сохранить изменения</button>

      <h1 className={styles.title}>Адрес доставки</h1>


        <div className={styles.section_adress}>
            <div className={styles.child_section}>
                <div className={styles.section}>
                    <p className={styles.text}>город</p>
                    <input defaultValue={adress?.City} ref={cityRef} type="text" className={styles.input} />
                </div>
                <div className={styles.section}>
                    <p className={styles.text}>Дом,квартира,офис</p>
                    <input defaultValue={adress?.House} ref={houseRef} type="text" className={styles.input} />
                </div>
                
            </div>
            <div className={styles.child_section}>
                <div className={styles.section}>
                    <p className={styles.text}>Улица</p>
                    <input defaultValue={adress?.Street} ref={streetRef} type="text" className={styles.input} />
                </div>
                <div className={styles.section}>
                    <p className={styles.text}>__</p>

                    <input placeholder='Квартира/офис' defaultValue={adress?.Apartament} ref={apartamentRef} type="text" className={styles.input} />
                </div>
                
            </div>
        </div>
        <button type="submit" onClick={submitbuttonAdress} className={styles.button}>сохранить изменения</button>

        <h1 className={styles.title}>Смена пароля</h1>
        <input
                type="password"
                className={styles.input}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Введите новый пароль"
            />        
            <button type="submit" onClick={submitPasswordButton} className={styles.button}>сохранить изменения</button>


    </div>
  );
}

export default PersonData;
