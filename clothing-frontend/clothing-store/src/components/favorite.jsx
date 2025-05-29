import styles from './favorite.module.css';
import { useState, useEffect } from 'react';
import Cardproduct from './cardproduct';
import axios from 'axios';

function Favorite({ user }) {
    const [favoriteProducts, setFavoriteProducts] = useState([]);

    useEffect(() => {
        if (!user || !user.Id) return;

        axios.get(`http://localhost:5095/api/product/favorite/${user.Id}`)
            .then(res => setFavoriteProducts(res.data))
            .catch(err => {
                console.error("Ошибка при запросе favorite:", err);
            });
    }, [user]);

    return (
        <div className={styles.container}>
            {favoriteProducts.length === 0 ? (
                <p>У вас нет избранных товаров</p>
            ) : (
                favoriteProducts.map((product) => (
                    <Cardproduct key={product.Id} product={product} />
                ))
            )}
        </div>
    );
}

export default Favorite;
