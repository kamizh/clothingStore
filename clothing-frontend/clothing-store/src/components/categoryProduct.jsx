import { use, useState } from "react"
import styles from "./categoryProduct.module.css"
import twoImage from "../assets/mainPhoto/kid.png"
import threeImage from "../assets/mainPhoto/woman.png"
import oneImage from "../assets/categoryProductImages/leftMain.png"
import { color } from "@cloudinary/url-gen/qualifiers/background"


import shoesImg from '../assets/categoryProductImages/Shoes.png';
import manImg from '../assets/categoryProductImages/manClothes.png'
import womanImg from '../assets/categoryProductImages/womanClothes.png'
import kidimg from '../assets/categoryProductImages/kidClothes.png'

function CategoryProduct()
{
    const Images = [oneImage,twoImage,threeImage]

    const [currentImage,setCurrentImage] = useState(0);



    return (
        <div className={styles.category}>
            <div className={styles.category_content}>
                <button onClick={ () => {
                    if(currentImage == 2)
                        setCurrentImage(0)
                    else
                        setCurrentImage(currentImage + 1)
                }} className={styles.button}>
                <div className={styles.left_section}>
                    <img className={styles.main_image} src={Images[currentImage]} alt="" />
                </div>
                </button>
                <div className={styles.right_section}>
                    <h2 className={styles.title}>Категории товаров</h2>
                    <p className={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec dui nunc mattis. Enim blandit volutpat maecenas volutpat blandit aliquam etiam.</p>
                    <div className={styles.categories}>
                    <a href="/catalog/men">
                            <div className={styles.card}>
                                <img src={manImg} alt="" className={styles.image} />
                                <p className={styles.text}>Мужская одежда</p>
                            </div>
                        </a>
                        <a href="/catalog/women">
                            <div className={styles.card}>
                                <img src={womanImg} alt="" className={styles.image} />
                                <p className={styles.text}>Женская одежда</p>
                            </div>
                        </a>
                        <a href="/catalog/kids">
                            <div className={styles.card}>
                                <img src={kidimg} alt="" className={styles.image} />
                                <p className={styles.text}>Детям</p>
                            </div>
                        </a>
                        <a href="/catalog/shoes">
                            <div className={styles.card}>
                                <img src={shoesImg} alt="" className={styles.image} />
                                <p className={styles.text}>Обувь</p>
                            </div>
                        </a>
                    </div>
                    <div className={styles.indicators}>
                        <div  style={{ backgroundColor: currentImage === 0 ? "#565656" : "#bdbbbb" }} className={styles.line}></div>
                        <div style={{ backgroundColor: currentImage === 1 ? "#565656" : "#bdbbbb" }} className={styles.line}></div>
                        <div style={{ backgroundColor: currentImage === 2 ? "#565656" : "#bdbbbb" }} className={styles.line}></div>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default CategoryProduct;