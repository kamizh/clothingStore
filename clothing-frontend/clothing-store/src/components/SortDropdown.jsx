import { useState } from "react";
import styles from "./SortDropdown.module.css";

const options = [
    { value: "popular", label: "По популярности" },
    { value: "price_asc", label: "Сначала дешевые" },
    { value: "price_desc", label: "Сначала дорогие" },
    { value: "newest", label: "Новинки" }
];

function SortDropdown({ onChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(options[0]);

    const handleSelect = (option) => {
        setSelected(option);
        onChange(option.value);
        setIsOpen(false);
    };

    return (
        <div className={styles.dropdown}>
            <button
                className={styles.toggle}
                onClick={() => setIsOpen(!isOpen)}
            >
                {selected.label}
                <span className={styles.arrow}>▾</span>
            </button>
            {isOpen && (
                <div className={styles.menu}>
                    {options.map((option) => (
                        <div
                            key={option.value}
                            className={`${styles.item} ${option.value === selected.value ? styles.active : ""}`}
                            onClick={() => handleSelect(option)}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SortDropdown;
