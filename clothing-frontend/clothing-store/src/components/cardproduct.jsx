import styles from "./cardproduct.module.css";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function Cardproduct(props) {
  const product = props.product;
  const images = product.ImagesUrl || [];
  const imageCount = images.length;

  const [currentIndexImage, setCurrentIndexImage] = useState(0);
  const intervalRef = useRef(null);

  const discount = product.Discount;
  const price =
    discount !== 0
      ? Math.round(product.Price - (product.Price * discount) / 100)
      : product.Price;

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleBagClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const startPreview = () => {
    if (imageCount <= 1) return;
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndexImage((prev) => (prev < imageCount - 1 ? prev + 1 : 0));
    }, 1600);
  };

  const stopPreview = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setCurrentIndexImage(0);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <Link to={`/product/${product.Id}`} className={styles.card_wrapper}>
      <article
        className={styles.container}
        onMouseEnter={startPreview}
        onMouseLeave={stopPreview}
      >
        <div className={styles.media}>
          {discount !== 0 && (
            <div className={styles.sale}>SALE · {discount}%</div>
          )}



          <div className={styles.image_wrap}>
            <img
            className={styles.image}
            src={images[currentIndexImage]}
            alt={product.Name}
            />

            {imageCount > 1 && (
              <div className={styles.preview_badge}>
                {currentIndexImage + 1} / {imageCount}
              </div>
            )}
          </div>
        </div>

        <div className={styles.info}>
          <div className={styles.top_row}>
            <div className={styles.price_block}>
              <p className={styles.price}>{price} ₽</p>
              {discount !== 0 && (
                <p className={styles.old_price}>{product.Price} ₽</p>
              )}
            </div>

            <button
              type="button"
              className={styles.bag_button}
              onClick={handleBagClick}
              aria-label="Добавить в корзину"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M20.25 6.75H3.75C3.33579 6.75 3 7.08579 3 7.5V19.5C3 19.9142 3.33579 20.25 3.75 20.25H20.25C20.6642 20.25 21 19.9142 21 19.5V7.5C21 7.08579 20.6642 6.75 20.25 6.75Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.25 9.75V6.75C8.25 5.75544 8.64509 4.80161 9.34835 4.09835C10.0516 3.39509 11.0054 3 12 3C12.9946 3 13.9484 3.39509 14.6517 4.09835C15.3549 4.80161 15.75 5.75544 15.75 6.75V9.75"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <p className={styles.brand}>{product.BrandName}</p>
          <p className={styles.name}>{product.Name}</p>
        </div>
      </article>
    </Link>
  );
}

export default Cardproduct;