import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PopularProducts from "../components/popularProducts";
import styles from "./product.module.css";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Product() {


  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [variantIndex, setVariantIndex] = useState(0);
  const [mainImage, setMainImage] = useState("");
  const [isLikeButtonActive,setLikeButtonActive] = useState(false);
  const [selectedSize,setSelectedSize] = useState("S");

  const [favorite,setFavorite] = useState(false);

  const navigate = useNavigate();

  const { token } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(null);

  const [isHaveCart,setIsHaveCart] = useState(false); 

  useEffect(() => {
    if (!token) return;

    axios.get("http://localhost:5095/api/Entrance/me", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => setCurrentUser(res.data))
    .catch(err => {
      console.error("Ошибка при получении пользователя по токену", err);
    });
  }, [token]);


  

  useEffect(() => {
    axios
      .get(`http://localhost:5095/api/product/detail/${id}`)
      .then((res) => {
        const dto = res.data.dto;
        setProduct(dto);
        setImages(dto.Variants[0].Images);
        setMainImage(dto.Variants[0].Images[0]);
      })
      .catch(console.error);
  }, [id]);



  useEffect(() => {
    if (!token || !product || !currentUser) return;

    const dto = {
      ProductVariantId: product.Variants[0].Id,
      UserId: currentUser.Id
    };

    console.log(dto);

    axios
      .post("http://localhost:5095/api/product/favorite/find",dto )
      .then(res => setLikeButtonActive(res.data.answer))
      .catch(err => console.log("Ошибка при поиске избранного"));
  }, [token, currentUser, product]); 





  if (!product) return <div className={styles.loading}>Загрузка...</div>;

  const variant = product.Variants[variantIndex];

  const desAndCondition = {
    "Описание товара" : product.Description,
    "Условия доставки" : "dsldsldlsdlsdl"
  }

  const handleAddDeleteFavorite = async (event) => {
    event.preventDefault();


    if(!token)
    {

      alert("Чтобы добавлять в избранное, вы должны быть авторизованным пользователем.");
      return;
    }

    const dto = {
        ProductVariantId : product.Variants[0].Id,
        UserId : currentUser.Id
      }

    try {
    if (isLikeButtonActive) {
      await axios.delete("http://localhost:5095/api/product/favorite/delete", {
        data: dto
      });
      setLikeButtonActive(false);
    }
    else {
      await axios.post("http://localhost:5095/api/product/favorite/add", dto);
      setLikeButtonActive(true);  
    }
  } catch (err) {
    console.error("Ошибка при работе с избранным", err);
    alert("Произошла ошибка");
  }
    
  }


  const handleAddCart = (event) => {
    event.preventDefault();

    if(!token)
    {
      alert("Чтобы добавить в корзину, вы должны быть авторизованным пользователем");
      return;
    }

    if(isHaveCart)
    {
      navigate("/cart");
      return;
    }

    const SmallCartDto = {
        ProductVariantId : product.Variants[variantIndex].Id,
        UserId : currentUser.Id,
        CurrentSize : selectedSize
      }

      try {
        axios.post("http://localhost:5095/api/cart/add",SmallCartDto)
        .then(res => setIsHaveCart(res.data.answer))
        .catch((err) => console.log("ошибка при получени флажка cart"));
      }
      catch(err)
      {
        console.log("Ошибка при добавлении элемента в корзину");
      }

    


  }

  return (
    <div className={styles.container}>
        <div className={styles.Product}>
      {/* <-- левый столбец: галерея --> */}
      <div className={styles.gallery}>
        <div className={styles.thumbs}>
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              className={styles.thumb}
              onClick={() => setMainImage(img)}
            />
          ))}
        </div>
        <div className={styles.mainImg}>
          <img src={mainImage} alt={product.Name} />
        </div>
      </div>

      <div className={styles.info}>
     

        <div className={styles.titleRow}>
          <h1 className={styles.title}>{product.Name}</h1>
          <button
            onClick={handleAddDeleteFavorite}
            className={`${styles.likeBtn} ${isLikeButtonActive ? styles.likeBtn_active : ""}`}
            >
            ❤
         </button>
        </div>

        {/* артикул */}
        <div className={styles.article}>Артикул: {product.Article}</div>

        {/* теги SALE/NEW */}
        <div className={styles.tags}>
          {variant.Discount > 0 && (
            <span className={styles.tagSale}>SALE – {variant.Discount}%</span>
          )}
          <span className={styles.tagNew}>NEW</span>
        </div>

        {/* цена */}
        <div className={styles.price}>
          <span>цена</span>
          <span className={styles.priceValue}>{variant.Price} ₽</span>
        </div>

        <select onChange={e => setSelectedSize(e.target.value)} className={styles.sizeSelect}>
            {variant.Sizes.map(size => (
                <option  key={size} value={size} className={styles.option_size}>
                {size}
                </option>
            ))}
        </select>


        {/* кнопка "В корзину" */}
        <button onClick={handleAddCart} className={styles.toCart}>{ !isHaveCart ? "Добавить в корзину" : "Перейти в корзину"}</button>

        {/* варианты цвета */}
        <div className={styles.colorVariants}>
          {product.Variants.map((v, i) => (
            <div
              key={i}
              className={`${styles.colorItem} ${
                i === variantIndex ? styles.activeColor : ""
              }`}
              onClick={() => {
                setVariantIndex(i);
                setImages(v.Images);
                setMainImage(v.Images[0]);
              }}
            >
              <img src={v.Images[0]} alt={v.Color} />
              <div className={styles.colorLabel}>{v.Color}</div>
            </div>
          ))}
        </div>

        {/* тех. информация */}
        <div className={styles.techInfo}>
          <div>
            <b>СОСТАВ</b>
            <p>{product.Compound}</p>
          </div>
          <div>
            <b>УХОД И СТИРКА</b>
            <p>{variant.CareAndWashing}</p>
          </div>
          <div>
            <b>СТРАНА БРЕНДА</b>
            <p>США</p>
          </div>
        </div>

        {/* аккордеоны */}
<div className={styles.accordions}>
  {/* 1. Описание */}
  <details className={styles.accordion}>
    <summary>Описание товара</summary>
    <div className={styles.accordionContent}>
      {product.Description}
    </div>
  </details>

  {/* 2. Таблица размеров */}
  <details className={styles.accordion}>
    <summary>Таблица размеров</summary>
    <div className={styles.accordionContent}>
      <img src={product.GenderType == "Мужской" ? "https://images.prom.ua/3078524693_3078524693.jpg?PIMAGE_ID=3078524693" : "https://images.prom.ua/3078496930_3078496930.jpg?PIMAGE_ID=3078496930"} alt="" />
    </div>
  </details>

  {/* 3. Условия доставки */}
  <details className={styles.accordion}>
    <summary>Условия доставки</summary>
    <div className={styles.accordionContent}>
      Бесплатная доставка при заказе от 3 000 руб.<br/>
      Вы можете выбрать подходящий для вас способ доставки товара:<br/><br/>

      <div className={styles.deliveryItem}>
        <i className="icon-truck" /> Курьерская доставка. Срок – от 1 дня.
      </div>
      <div className={styles.deliveryItem}>
        <i className="icon-box" /> Пункты выдачи заказов и постаматы. Срок – от 1 дня.
      </div>
      <div className={styles.deliveryItem}>
        <i className="icon-location" /> Самовывоз из магазина. Срок – от 1 дня.
      </div>
    </div>
  </details>
</div>

      </div>

    </div>
          <PopularProducts />

    </div>
    
  );
}
