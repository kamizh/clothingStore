
import styles from "./cardproduct.module.css"
import { useState,useRef } from "react";
import { Link } from "react-router-dom";

function Cardproduct(props)
{



    const images = props.product.ImagesUrl;


    

    const [currentIndexImage,setCurrentIndexImage] = useState(0)

    const startX = useRef(null);

    const imageCount = images.length;

    const Discount = props.product.Discount;

    const price = Discount != 0 ? Math.round(props.product.Price - (props.product.Price /  Discount)) : props.product.Price;

    const handleMouseDown = (e) => {
        startX.current = e.clientX;
    }

    const handleMouseUp = (e) => {
        if(startX.current == null)
            return;

        const diff = e.clientX - startX.current;

        if(diff > 50)
        {
            setCurrentIndexImage((prev) => ( prev > 0 ? prev -1  : images.length -1));
        }
        else if(diff < 50)
        {
            setCurrentIndexImage((prev) => (prev < images.length -1 ? prev + 1 : 0));
        }

        startX.current = null;

    }

    return (
        <Link to={`/product/${props.product.Id}`} className={styles.card_wrapper}>
            <div className={styles.container}>
            <div className={styles.container_content}>


                <div className={styles.indicators}>
                    {Array.from({ length: imageCount }).map((_, index) => (
                        <div
                        key={index}
                        className={index === currentIndexImage ? styles.choice_indicator : styles.indicator}
                        ></div>
                    ))}
                </div>



                <button className={styles.favorite_button}>
                    <svg width="30" height="26" viewBox="0 0 30 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.23574 3.44333C5.24232 -0.810189 11.5084 -0.815289 14.5231 3.43313L14.9935 4.09614L15.4153 3.49127C18.4047 -0.787748 24.6819 -0.829569 27.7269 3.40865C28.756 4.84043 29.2599 6.58814 29.1525 8.35304C29.0451 10.1179 28.3331 11.7904 27.1381 13.0846L15.739 25.4249C15.6444 25.5275 15.5298 25.6093 15.4024 25.6652C15.275 25.7211 15.1375 25.75 14.9985 25.75C14.8596 25.75 14.7221 25.7211 14.5947 25.6652C14.4673 25.6093 14.3527 25.5275 14.258 25.4249L2.85082 13.0397C1.66816 11.7557 0.961116 10.0996 0.849059 8.35089C0.737002 6.6022 1.22679 4.86808 2.23574 3.44129V3.44333ZM12.8781 4.62044C10.6718 1.50935 6.084 1.51343 3.88269 4.62758C3.14452 5.67199 2.7863 6.9412 2.8685 8.221C2.9507 9.5008 3.46828 10.7128 4.33387 11.6525L15.0006 23.2319L25.6571 11.6954C26.5327 10.7472 27.0545 9.5219 27.1333 8.22882C27.2121 6.93574 26.843 5.65521 26.0891 4.60616C23.8584 1.50119 19.2595 1.53281 17.0693 4.66736L15.826 6.44629C15.733 6.57927 15.6098 6.68787 15.4666 6.76303C15.3234 6.83819 15.1645 6.87772 15.0031 6.87831C14.8417 6.87891 14.6825 6.84057 14.5388 6.76647C14.3951 6.69238 14.2711 6.58469 14.1771 6.45241L12.8771 4.62044H12.8781Z" fill="white"/>
                    </svg>
                </button>



                <img onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} className={styles.image} src={images[currentIndexImage]} alt="" ></img>
                
                { Discount != 0  && <div className={styles.sale}>SALE - {Discount}%</div>}


                <div className={styles.price_and_bag}>
                    <p className={styles.price}>{price} ₽</p>
                    <button className={styles.bag_button}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.25 6.75H3.75C3.33579 6.75 3 7.08579 3 7.5V19.5C3 19.9142 3.33579 20.25 3.75 20.25H20.25C20.6642 20.25 21 19.9142 21 19.5V7.5C21 7.08579 20.6642 6.75 20.25 6.75Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M8.25 9.75V6.75C8.25 5.75544 8.64509 4.80161 9.34835 4.09835C10.0516 3.39509 11.0054 3 12 3C12.9946 3 13.9484 3.39509 14.6517 4.09835C15.3549 4.80161 15.75 5.75544 15.75 6.75V9.75" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>

                <p className={styles.brand}>{props.product.BrandName}</p>
                <p className={styles.name}>{props.product.Name}</p>


            </div>
        </div>
        </Link>
    )

}
export default Cardproduct;