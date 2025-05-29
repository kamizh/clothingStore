import React from "react";
import styles from './category.module.css'
import Subscrabe from "../components/subscribe.jsx"

function Category(props)
{

    return (
        <div className={styles.cart}>
            <h1 className={styles.title}>Тут будет категория</h1>
            <Subscrabe/>

        </div>
    )
}
export default Category;