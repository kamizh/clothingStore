import React from "react";
import styles from "./search.module.css";

function Search() {
  const helpCards = [
    {
      number: "01",
      title: "Мой аккаунт",
      text: "Управление профилем, личными данными, паролем, избранным и историей заказов.",
    },
    {
      number: "02",
      title: "Заказы и доставка",
      text: "Статусы заказов, сроки доставки, способы получения и важные уведомления.",
    },
    {
      number: "03",
      title: "Оплата и возврат",
      text: "Способы оплаты, правила возврата, обмена и условия оформления заявки.",
    },
    {
      number: "04",
      title: "Размер и подбор",
      text: "Рекомендации по выбору размера, посадке вещей и сравнению моделей.",
    },
  ];

  const faqList = [
    {
      title: "Мой аккаунт",
      content:
        "В личном кабинете вы можете редактировать имя, фамилию, электронную почту, дату рождения и адрес доставки. Также в профиле доступны избранные товары, история заказов и изменение пароля. Если вы только зарегистрировались и изменения не отображаются сразу, проверьте, что данные были успешно сохранены на сервере.",
    },
    {
      title: "Где мой заказ?",
      content:
        "После оформления заказа информация о нём появляется в вашем профиле. Как только заказ переходит в обработку, сборку или отправку, статус обновляется. Если предусмотрен трек-номер, он будет доступен после передачи заказа в службу доставки. При сильной загрузке обновление статуса может происходить не моментально.",
    },
    {
      title: "Доставка и оплата",
      content:
        "Мы предлагаем несколько способов получения заказа: курьерская доставка, выдача в пункте самовывоза и получение в постамате, если это доступно в вашем регионе. Оплатить заказ можно онлайн в процессе оформления, а для демонстрации дипломного проекта также может использоваться имитация платёжного шага. Стоимость доставки может зависеть от суммы корзины и региона.",
    },
    {
      title: "Правила возврата",
      content:
        "Если товар вам не подошёл, вы можете оформить возврат в течение установленного срока при условии, что вещь сохранила товарный вид, не была в носке и не имеет следов использования. Для оформления возврата обычно требуется сохранить упаковку и подтверждение заказа. Некоторые категории товаров могут иметь отдельные ограничения.",
    },
    {
      title: "Как подобрать размер",
      content:
        "В карточках товаров размещаются размеры, доступные для конкретной модели, а также дополнительная информация о посадке. Если вы находитесь между двумя размерами, чаще всего стоит ориентироваться на желаемую посадку: для более свободного силуэта можно выбрать размер больше, для более точной посадки — стандартный. Для базовых вещей особенно важно учитывать материал и крой.",
    },
    {
      title: "Почему товар пропал из корзины или избранного?",
      content:
        "Иногда товар может стать временно недоступным, закончиться в конкретном размере или цвете, либо измениться после обновления данных каталога. В таком случае позиция может скрыться из активного списка или стать недоступной для оформления. Лучше всего открыть карточку товара заново и проверить актуальные остатки.",
    },
  ];

  return (
    <section className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.heroBadge}>Support / Help Center</div>

        <div className={styles.heroGrid}>
          <div className={styles.heroLeft}>
            <h1 className={styles.title}>Помощь покупателю</h1>
            <p className={styles.subtitle}>
              Здесь собрана основная информация по аккаунту, заказам, оплате,
              доставке, возвратам и выбору размеров. Мы сделали этот раздел
              максимально понятным, чтобы покупатель мог быстро найти ответ на
              любой вопрос без лишних действий.
            </p>

            <div className={styles.heroStats}>
              <div className={styles.statCard}>
                <span className={styles.statValue}>24/7</span>
                <span className={styles.statLabel}>Доступ к информации</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statValue}>6+</span>
                <span className={styles.statLabel}>Основных разделов помощи</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statValue}>FAQ</span>
                <span className={styles.statLabel}>Частые вопросы и ответы</span>
              </div>
            </div>
          </div>

          <div className={styles.heroRight}>
            <div className={styles.infoPanel}>
              <p className={styles.infoPanelTitle}>Что можно найти на этой странице</p>
              <ul className={styles.infoList}>
                <li>управление аккаунтом и личными данными</li>
                <li>информация о заказах и отслеживании</li>
                <li>способы оплаты и условия доставки</li>
                <li>правила возврата и обмена</li>
                <li>подбор размеров и рекомендации</li>
                <li>ответы на популярные вопросы покупателей</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.cardsSection}>
        {helpCards.map((card) => (
          <article key={card.number} className={styles.helpCard}>
            <span className={styles.helpCardNumber}>{card.number}</span>
            <h2 className={styles.helpCardTitle}>{card.title}</h2>
            <p className={styles.helpCardText}>{card.text}</p>
          </article>
        ))}
      </div>

      <div className={styles.contentSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionBadge}>Guide</span>
          <h2 className={styles.sectionTitle}>Подробная информация</h2>
        </div>

        <div className={styles.faqList}>
          {faqList.map((item, index) => (
            <details key={index} className={styles.faqItem}>
              <summary className={styles.faqQuestion}>{item.title}</summary>
              <div className={styles.faqAnswer}>{item.content}</div>
            </details>
          ))}
        </div>
      </div>

      <div className={styles.bottomGrid}>
        <div className={styles.contactCard}>
          <span className={styles.sectionBadge}>Contact</span>
          <h3 className={styles.bottomTitle}>Если вопрос остался</h3>
          <p className={styles.bottomText}>
            Если вы не нашли нужную информацию, можно обратиться в поддержку
            через контактные каналы магазина. Для ускорения ответа лучше заранее
            подготовить номер заказа, e-mail, на который оформлялась покупка, и
            краткое описание ситуации.
          </p>

          <div className={styles.contactList}>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>E-mail</span>
              <span className={styles.contactValue}>support@store.ru</span>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>Телефон</span>
              <span className={styles.contactValue}>+7 (999) 999-99-99</span>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>Время ответа</span>
              <span className={styles.contactValue}>обычно в течение дня</span>
            </div>
          </div>
        </div>

        <div className={styles.noteCard}>
          <span className={styles.sectionBadge}>Important</span>
          <h3 className={styles.bottomTitle}>Полезно перед оформлением заказа</h3>
          <ul className={styles.noteList}>
            <li>проверьте выбранный размер, цвет и количество товара</li>
            <li>убедитесь, что контактные данные заполнены корректно</li>
            <li>проверьте адрес доставки перед подтверждением заказа</li>
            <li>следите за статусом заказа в личном кабинете</li>
            <li>сохраняйте товарный вид вещей до окончательного решения о покупке</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Search;