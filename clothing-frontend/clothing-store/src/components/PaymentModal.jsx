import React, { useMemo, useState } from "react";
import styles from "./paymentModal.module.css";

function PaymentModal({ total, onClose, onSuccess }) {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [bank, setBank] = useState("sber");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const cleanCardNumber = useMemo(() => cardNumber.replace(/\s/g, ""), [cardNumber]);
  const cleanExpiry = useMemo(() => expiry.replace(/\D/g, ""), [expiry]);
  const cleanCvv = useMemo(() => cvv.replace(/\D/g, ""), [cvv]);

  const formatCardNumber = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
  };

  const formatExpiry = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length <= 2) return digits;
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  };

  const validateLuhn = (number) => {
    let sum = 0;
    let shouldDouble = false;

    for (let i = number.length - 1; i >= 0; i--) {
      let digit = parseInt(number[i], 10);

      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }

      sum += digit;
      shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
  };

  const validateExpiry = (value) => {
    if (!/^\d{2}\/\d{2}$/.test(value)) return false;

    const [monthStr, yearStr] = value.split("/");
    const month = Number(monthStr);
    const year = Number(`20${yearStr}`);

    if (month < 1 || month > 12) return false;

    const now = new Date();
    const expiryDate = new Date(year, month, 0, 23, 59, 59);

    return expiryDate >= now;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (paymentMethod === "cash") {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        onSuccess?.({
          method: paymentMethod,
          bank,
          last4: null,
        });
      }, 1400);
      return;
    }

    if (cleanCardNumber.length !== 16) {
      alert("Введите корректный номер карты");
      return;
    }

    if (!validateLuhn(cleanCardNumber)) {
      alert("Номер карты не прошёл проверку");
      return;
    }

    if (!cardName.trim() || cardName.trim().length < 4) {
      alert("Введите имя держателя карты");
      return;
    }

    if (!validateExpiry(expiry)) {
      alert("Введите корректный срок действия карты");
      return;
    }

    if (cleanCvv.length !== 3) {
      alert("Введите корректный CVV");
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      onSuccess?.({
        method: paymentMethod,
        bank,
        last4: cleanCardNumber.slice(-4),
      });
    }, 1800);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose} type="button">
          ×
        </button>

        <div className={styles.badge}>Mock payment</div>
        <h2 className={styles.title}>Оплата заказа</h2>
        <p className={styles.subtitle}>
          Имитация платёжного шага для дипломного проекта. Реального списания средств не происходит.
        </p>

        <div className={styles.totalCard}>
          <span className={styles.totalLabel}>Сумма к оплате</span>
          <span className={styles.totalValue}>{total} ₽</span>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.methodGrid}>
            <button
              type="button"
              onClick={() => setPaymentMethod("card")}
              className={`${styles.methodButton} ${paymentMethod === "card" ? styles.methodButtonActive : ""}`}
            >
              Банковская карта
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod("cash")}
              className={`${styles.methodButton} ${paymentMethod === "cash" ? styles.methodButtonActive : ""}`}
            >
              Оплата при получении
            </button>
          </div>

          <div className={styles.section}>
            <label className={styles.label}>Банк</label>
            <select
              className={styles.select}
              value={bank}
              onChange={(e) => setBank(e.target.value)}
            >
              <option value="sber">Сбер</option>
              <option value="tbank">Т-Банк</option>
              <option value="alfa">Альфа-Банк</option>
              <option value="vtb">ВТБ</option>
              <option value="gazprom">Газпромбанк</option>
            </select>
          </div>

          {paymentMethod === "card" && (
            <>
              <div className={styles.section}>
                <label className={styles.label}>Номер карты</label>
                <input
                  className={styles.input}
                  type="text"
                  inputMode="numeric"
                  placeholder="0000 0000 0000 0000"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                />
              </div>

              <div className={styles.section}>
                <label className={styles.label}>Имя держателя</label>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="IVAN IVANOV"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value.toUpperCase())}
                />
              </div>

              <div className={styles.inlineFields}>
                <div className={styles.section}>
                  <label className={styles.label}>Срок действия</label>
                  <input
                    className={styles.input}
                    type="text"
                    inputMode="numeric"
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                  />
                </div>

                <div className={styles.section}>
                  <label className={styles.label}>CVV</label>
                  <input
                    className={styles.input}
                    type="password"
                    inputMode="numeric"
                    placeholder="***"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                  />
                </div>
              </div>
            </>
          )}

          <div className={styles.infoRow}>
            <span className={styles.infoChip}>3D Secure mock</span>
            <span className={styles.infoChip}>SSL protected</span>
            <span className={styles.infoChip}>Test mode</span>
          </div>

          <button className={styles.payButton} type="submit" disabled={isProcessing}>
            {isProcessing ? "Обработка оплаты..." : paymentMethod === "cash" ? "Подтвердить заказ" : "Оплатить"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PaymentModal;