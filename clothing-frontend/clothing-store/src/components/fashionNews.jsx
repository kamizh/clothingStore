import { useState,useEffect } from "react"
import styles from "./fashion.module.css"


function FasionFormobile()
{

    const images  = ["https://st.peopletalk.ru/wp-content/uploads/2025/03/d104df3b4130fc0b20b844f5c92ac2ac-scaled.jpg",
        "https://st.peopletalk.ru/wp-content/uploads/2025/03/674c64ade5b42d110dab74f8fe7e3943.jpeg",
        "https://st.peopletalk.ru/wp-content/uploads/2025/03/38896409eee33fb926f88e1c5a2cb0ea-scaled.jpg"
    ]
    const text =  ["Кендалл Дженнер показала идеальный образ","Демна Гвасалия стал новым креативным директором Gucci",
        "Редкий выход Беллы Хадид на подиуме"
    ]

    const [currentContent,setCurrentContent] = useState(0);

    return (
        <div className={styles.main}>
            <h2 className={styles.title}>
                    Модные новости
                </h2>
            <button className={styles.button} onClick={() => {
                if(currentContent == 2)
                    setCurrentContent(0);
                else
                    setCurrentContent(currentContent + 1);
            }}>
                <div className={styles.card}>
                    <img className={styles.image} src={images[currentContent]} alt="" />
                    <p className={styles.text}>
                    {text[currentContent]}
                    </p>
                </div>
            </button>
            <div className={styles.low_elems}>
            <div className={styles.indicators}>
                <div  style={{ backgroundColor: currentContent === 0 ? "#565656" : "#bdbbbb" }} className={styles.line}></div>
                <div style={{ backgroundColor: currentContent === 1 ? "#565656" : "#bdbbbb" }} className={styles.line}></div>
                <div style={{ backgroundColor: currentContent === 2 ? "#565656" : "#bdbbbb" }} className={styles.line}></div>
            </div>
            </div>
        </div>
        
    )
}


function FashionNews()
{
    const [width, setWidth] = useState(window.innerWidth);
    
        useEffect(() => {
            const handleResize = () => setWidth(window.innerWidth);
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }, []);

    if(width <= 750)
    {
        return <FasionFormobile/>;
    }
    return (
        <div className={styles.fashion}>
            <h2 className={styles.title}>
                    Модные новости
                </h2>
            <div className={styles.fashion_content}>
                
                <div className={styles.card}>
                    <img className={styles.image} src="https://st.peopletalk.ru/wp-content/uploads/2025/03/d104df3b4130fc0b20b844f5c92ac2ac-scaled.jpg" alt="" />
                    <p className={styles.text}>
                    Кендалл Дженнер показала идеальный образ
                    </p>
                </div>
                <div className={styles.card}>
                    <img className={styles.image} src="https://st.peopletalk.ru/wp-content/uploads/2025/03/674c64ade5b42d110dab74f8fe7e3943.jpeg" alt="" />
                    <p className={styles.text}>
                    Демна Гвасалия стал новым креативным директором Gucci
                    </p>
                </div>
                <div className={styles.card}>
                    <img className={styles.image} src="https://st.peopletalk.ru/wp-content/uploads/2025/03/38896409eee33fb926f88e1c5a2cb0ea-scaled.jpg" alt="" />
                    <p className={styles.text}>
                    Редкий выход Беллы Хадид на подиуме
                    </p>
                </div>
            </div>
        </div>
    )
}
export default FashionNews;