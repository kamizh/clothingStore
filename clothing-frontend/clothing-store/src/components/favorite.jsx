import styles from './favorite.module.css';
import { useState, useEffect } from 'react';
import Cardproduct from './cardproduct';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Favorite({ user }) {
    const [favoriteProducts, setFavoriteProducts] = useState([]);

    useEffect(() => {
        if (!user || !user.Id) return;

        axios.get(`http://localhost:5095/api/product/favorite/${user.Id}`)
            .then(res => setFavoriteProducts(res.data))
            .catch(err => {
                console.log(err);
            });
    }, [user]);

    return (
        <div className={styles.container}>
            {favoriteProducts.length === 0 ? (
                <div className={styles.emptyState}>
                    <div className={styles.emptyBadge}>Favorites</div>

                    <h2 className={styles.emptyTitle}>Избранное пока пусто</h2>

                    <p className={styles.emptyText}>
                        Добавляйте понравившиеся товары в избранное, чтобы быстро
                        возвращаться к ним позже, сравнивать модели и собирать
                        свой список покупок.
                    </p>

                    <div className={styles.emptyActions}>
                        <Link to="/catalog" className={styles.emptyButton}>
                            Перейти в каталог
                        </Link>
                    </div>
                </div>
            ) : (
                <div className={styles.productsGrid}>
                    {favoriteProducts.map((product) => (
                        <Cardproduct key={product.Id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Favorite;