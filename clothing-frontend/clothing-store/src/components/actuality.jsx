import styles from "./actuality.module.css"

function Actuality()
{

    return (
        <div className={styles.actuality}>
            <h2 className={styles.title}>
                Актуальное
            </h2>
            <div className={styles.actuality_content}>
                <div className={styles.left_section}>
                    <div className={styles.card_left}>
                        <img src="https://i.ibb.co/qtFSDNK/89309d9ee40611193f9a886d72fb96dfd7fa161b.png" alt="" className={styles.image_left} />
                        <p className={styles.sub_title}>Джинсы</p>
                        <p className={styles.text}>Все еще в тренде</p>

                    </div>
                    <div className={styles.card_left}>
                        <img src="https://i.ibb.co/WW3xWmqQ/5037eac48f01f820a5f00d3e581ed45b83338092.png" alt="" className={styles.image_left} />
                        <p className={styles.sub_title}>Новая эра</p>
                        <p className={styles.text}>Кроссовки с высокой подошвой</p>

                    </div>
                </div>
                <div className={styles.right_section}>
                    <div className={styles.right_card}>
                    <img src="https://i.ibb.co/6cZFgWXf/661906d720699dcbe4c7feb3c4a6039d731e0e14.png" alt="" className={styles.image_right} />
                        <p className={styles.sub_title}>Новая эра</p>
                        <p className={styles.text}>Платья вечный</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Actuality;