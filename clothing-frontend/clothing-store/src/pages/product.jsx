import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import PopularProducts from "../components/popularProducts";
import styles from "./product.module.css";
import { AuthContext } from "../context/AuthContext";

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [variantIndex, setVariantIndex] = useState(0);
  const [mainImage, setMainImage] = useState("");
  const [isLikeButtonActive, setLikeButtonActive] = useState(false);
  const [selectedSize, setSelectedSize] = useState("S");
  const [currentUser, setCurrentUser] = useState(null);
  const [isHaveCart, setIsHaveCart] = useState(false);

  useEffect(() => {
    if (!token) return;

    axios
      .get("http://localhost:5095/api/Entrance/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setCurrentUser(res.data))
      .catch((err) => {
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
        if (dto.Variants[0].Sizes?.length > 0) {
          setSelectedSize(dto.Variants[0].Sizes[0]);
        }
      })
      .catch(console.error);
  }, [id]);

  useEffect(() => {
    if (!token || !product || !currentUser) return;

    const dto = {
      ProductVariantId: product.Variants[0].Id,
      UserId: currentUser.Id,
    };

    axios
      .post("http://localhost:5095/api/product/favorite/find", dto)
      .then((res) => setLikeButtonActive(res.data.answer))
      .catch(() => console.log("Ошибка при поиске избранного"));
  }, [token, currentUser, product]);

  if (!product) return <div className={styles.loading}>Загрузка...</div>;

  const variant = product.Variants[variantIndex];
  const finalPrice =
    variant.Discount > 0
      ? Math.round(variant.Price - (variant.Price * variant.Discount) / 100)
      : variant.Price;

  const handleAddDeleteFavorite = async (event) => {
    event.preventDefault();

    if (!token) {
      alert("Чтобы добавлять в избранное, вы должны быть авторизованным пользователем.");
      return;
    }

    const dto = {
      ProductVariantId: product.Variants[variantIndex].Id,
      UserId: currentUser.Id,
    };

    try {
      if (isLikeButtonActive) {
        await axios.delete("http://localhost:5095/api/product/favorite/delete", {
          data: dto,
        });
        setLikeButtonActive(false);
      } else {
        await axios.post("http://localhost:5095/api/product/favorite/add", dto);
        setLikeButtonActive(true);
      }
    } catch (err) {
      console.error("Ошибка при работе с избранным", err);
      alert("Произошла ошибка");
    }
  };

  const handleAddCart = (event) => {
    event.preventDefault();

    if (!token) {
      alert("Чтобы добавить в корзину, вы должны быть авторизованным пользователем");
      return;
    }

    if (isHaveCart) {
      navigate("/cart");
      return;
    }

    const SmallCartDto = {
      ProductVariantId: product.Variants[variantIndex].Id,
      UserId: currentUser.Id,
      CurrentSize: selectedSize,
    };

    axios
      .post("http://localhost:5095/api/cart/add", SmallCartDto)
      .then((res) => setIsHaveCart(res.data.answer))
      .catch(() => console.log("Ошибка при добавлении элемента в корзину"));
  };

  return (
    <div className={styles.page}>
      <div className={styles.productShell}>
        <div className={styles.Product}>
          <div className={styles.gallery}>
            <div className={styles.thumbs}>
              {images.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  className={`${styles.thumbButton} ${
                    mainImage === img ? styles.thumbButtonActive : ""
                  }`}
                  onClick={() => setMainImage(img)}
                >
                  <img src={img} className={styles.thumb} alt={`preview-${i}`} />
                </button>
              ))}
            </div>

            <div className={styles.mainImg}>
              {variant.Discount > 0 && (
                <div className={styles.floatingBadge}>SALE · {variant.Discount}%</div>
              )}
              <img src={mainImage} alt={product.Name} />
            </div>
          </div>

          <div className={styles.info}>
            <div className={styles.infoTop}>
              <div className={styles.headline}>
                <p className={styles.brand}>{product.BrandName}</p>
                <div className={styles.titleRow}>
                  <h1 className={styles.title}>{product.Name}</h1>
                  <button
                    onClick={handleAddDeleteFavorite}
                    className={`${styles.likeBtn} ${
                      isLikeButtonActive ? styles.likeBtn_active : ""
                    }`}
                    aria-label="Избранное"
                  >
                    <svg width="22" height="22" viewBox="0 0 30 26" fill="none">
                      <path
                        d="M2.23574 3.44333C5.24232 -0.810189 11.5084 -0.815289 14.5231 3.43313L14.9935 4.09614L15.4153 3.49127C18.4047 -0.787748 24.6819 -0.829569 27.7269 3.40865C28.756 4.84043 29.2599 6.58814 29.1525 8.35304C29.0451 10.1179 28.3331 11.7904 27.1381 13.0846L15.739 25.4249C15.6444 25.5275 15.5298 25.6093 15.4024 25.6652C15.275 25.7211 15.1375 25.75 14.9985 25.75C14.8596 25.75 14.7221 25.7211 14.5947 25.6652C14.4673 25.6093 14.3527 25.5275 14.258 25.4249L2.85082 13.0397C1.66816 11.7557 0.961116 10.0996 0.849059 8.35089C0.737002 6.6022 1.22679 4.86808 2.23574 3.44129V3.44333Z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        fill="none"
                      />
                    </svg>
                  </button>
                </div>
                <div className={styles.article}>Артикул: {product.Article}</div>
              </div>

              <div className={styles.tags}>
                {variant.Discount > 0 && (
                  <span className={styles.tagSale}>SALE</span>
                )}
                <span className={styles.tagNew}>NEW</span>
              </div>
            </div>

            <div className={styles.purchaseCard}>
              <div className={styles.priceBlock}>
                <div className={styles.priceLabel}>Цена</div>
                <div className={styles.priceRow}>
                  <span className={styles.priceValue}>{finalPrice} ₽</span>
                  {variant.Discount > 0 && (
                    <span className={styles.oldPrice}>{variant.Price} ₽</span>
                  )}
                </div>
              </div>

              <div className={styles.section}>
                <div className={styles.sectionTitle}>Размер</div>
                <div className={styles.sizes}>
                  {variant.Sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      className={`${styles.sizeChip} ${
                        selectedSize === size ? styles.sizeChipActive : ""
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.section}>
                <div className={styles.sectionTitle}>Цвет</div>
                <div className={styles.colorVariants}>
                  {product.Variants.map((v, i) => (
                    <button
                      type="button"
                      key={i}
                      className={`${styles.colorItem} ${
                        i === variantIndex ? styles.activeColor : ""
                      }`}
                      onClick={() => {
                        setVariantIndex(i);
                        setImages(v.Images);
                        setMainImage(v.Images[0]);
                        if (v.Sizes?.length > 0) {
                          setSelectedSize(v.Sizes[0]);
                        }
                      }}
                    >
                      <img src={v.Images[0]} alt={v.Color} />
                      <div className={styles.colorMeta}>
                        <div className={styles.colorLabel}>{v.Color}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.actions}>
                <button onClick={handleAddCart} className={styles.toCart}>
                  {!isHaveCart ? "Добавить в корзину" : "Перейти в корзину"}
                </button>
              </div>
            </div>

            <div className={styles.techInfo}>
              <div className={styles.infoCard}>
                <span className={styles.infoTitle}>Состав</span>
                <p>{product.Compound}</p>
              </div>
              <div className={styles.infoCard}>
                <span className={styles.infoTitle}>Уход и стирка</span>
                <p>{variant.CareAndWashing}</p>
              </div>
              <div className={styles.infoCard}>
                <span className={styles.infoTitle}>Страна бренда</span>
                <p>США</p>
              </div>
            </div>

            <div className={styles.accordions}>
              <details className={styles.accordion} open>
                <summary>Описание товара</summary>
                <div className={styles.accordionContent}>{product.Description}</div>
              </details>

              <details className={styles.accordion}>
                <summary>Таблица размеров</summary>
                <div className={styles.accordionContent}>
                  <img
                    className={styles.sizeTable}
                    src={
                      product.GenderType === "Мужской"
                        ? "https://images.prom.ua/3078524693_3078524693.jpg?PIMAGE_ID=3078524693"
                        : "https://images.prom.ua/3078496930_3078496930.jpg?PIMAGE_ID=3078496930"
                    }
                    alt="Таблица размеров"
                  />
                </div>
              </details>

              <details className={styles.accordion}>
                <summary>Условия доставки</summary>
                <div className={styles.accordionContent}>
                  Бесплатная доставка при заказе от 3 000 руб.
                  <br />
                  Вы можете выбрать подходящий способ доставки товара:
                  <div className={styles.deliveryList}>
                    <div className={styles.deliveryItem}>Курьерская доставка — от 1 дня</div>
                    <div className={styles.deliveryItem}>Пункты выдачи и постаматы — от 1 дня</div>
                    <div className={styles.deliveryItem}>Самовывоз из магазина — от 1 дня</div>
                  </div>
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>

      <PopularProducts />
    </div>
  );
}