import styles from "./catalogCard.module.css"

function CatalogCard(props)
{
    return (
        <a href={props.src}>
            <div className={styles.card}>
                <p className={styles.text}>{props.text}</p>
                <img className={styles.image} src={props.img} alt="" />
            </div>
        </a>
    )
}
export default CatalogCard;
