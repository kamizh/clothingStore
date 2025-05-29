import { useState } from "react";
import styles from "./login.module.css"


function Regist({onClose})
{

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

        if (validate()) {
            
            const data = {
                Login : Email,
                Password : password
            };
    
            try {
                const response = await fetch('http://localhost:5095/api/Entrance/regist', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });
    
                const result = await response.json();
    
                if (response.ok) {

                    onClose();
                } else {
                }
            } catch (error) {
            }
        }
        
    };


    return ( 
        
            <div className={styles.entrance}>
                <div className={styles.entrance_content}>
                    <button className={styles.exitButton} onClick={onClose}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.545 1.45459L1.4541 14.5455" stroke="#565656" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round" />
                            <path d="M14.545 14.5455L1.4541 1.45459" stroke="#565656" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <h1 className={styles.title}>Регистрация</h1>
        
                    <form onSubmit={connectServer} method="post">
                        <div className={styles.section_input}>
                            <p className={styles.text}>Введите ваш e-mail</p>
                            <input value={Email} type="email" className={styles.input_pole} onChange={(e) => {setEmail(e.target.value)} } />
                            {errorEmail && (<p className={styles.error}> Введите корректный e-mail </p> )}
                        </div>
                        
                        <div className={styles.section_input}>
                            <p className={styles.text}>Введите ваш пароль</p>
                            <input value={password} type="password" className={styles.input_pole} onChange={(e) => {setPassword(e.target.value)} } />
                            {errorPassword && <p className={styles.error}>Пароль от 6 символов, минимум 1 буква и 1 цифра, только латинские</p>}
                        </div>
                        <button type="submit" className={styles.button_submit}>
                            ЗАРЕГИСТРИРОВАТЬСЯ
                        </button>
                    </form>
                </div>
            </div>
        ) 
    
}

export default Regist;