import styles from "./filter.module.css";
import { useState } from 'react';
import React from 'react';
import Actuality from '../components/actuality.jsx';
import SizeFilter from '../components/sizeFilter.jsx';
import MultiSelectDropdown from '../components/MultiselectDropdown.jsx';

function Filter({ onApplyFilters }) {
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedGender, setSelectedGender] = useState([]);
    const [priceFrom, setPriceFrom] = useState(0);
    const [priceTo, setPriceTo] = useState(1000000000);
    const [selectedBrands, setSelectedBrands] = useState([]);

    const categories = [
        { value: "sale", label: "Sale%" },
        { value: "popular", label: "Новинки" },
        { value: "Футболка", label: "Футболки и поло" },
        { value: "Худи", label: "Толстовки и худи" },
        { value: "Ветровка", label: "Ветровки и легкие куртки" },
        { value: "Куртка", label: "Куртки и пуховики" },
        { value: "Свитеры и свитшоты", label: "Свитеры и свитшоты" },
        { value: "Майки", label: "Майки" },
        { value: "Шорты", label: "Шорты" },
        { value: "Джинсы", label: "Джинсы" },
        { value: "Брюки", label: "Штаны и брюки" },
        { value: "Нижнее белье", label: "Нижнее белье" },
        { value: "Носки и гетры", label: "Носки и гетры" },
        { value: "Пиджаки и костюмы", label: "Пиджаки и костюмы" }
    ];

    const colors = ["Черный", "Белый", "Красный", "Синий", "Голубой", "Коричневый", "Желтый", "Фиолетовый",
        "Оранжевый", "Розовый", "Серый", "Зеленый"
    ];

    const handleApply = () => {
        const filters = {
            sizes: selectedSizes,
            categories: selectedCategories,
            colors: selectedColors,
            genders: selectedGender,
            priceFrom,
            priceTo,
            brands: selectedBrands
        };
        onApplyFilters?.(filters);
    };

    return (
        <div className={styles.filter_container}>
            <div className={styles.filter_container_content}>
                <div className={styles.category_container}>
                    <h2 className={styles.title_filter}>КАТЕГОРИИ</h2>
                    <div className={styles.checkbox_list}>
                        {categories.map((cat, index) => (
                            <label key={index} className={styles.checkbox_item}>
                                <input
                                    type="checkbox"
                                    value={cat.value}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setSelectedCategories(prev =>
                                            prev.includes(value)
                                                ? prev.filter(v => v !== value)
                                                : [...prev, value]
                                        );
                                    }}
                                    className={styles.checkbox_input}
                                />
                                <span className={styles.checkbox_label}>{cat.label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className={styles.size_and_price_container}>
                    <h2 className={styles.title_filter}>РАЗМЕР</h2>
                    <div className={styles.what_size_box}>
                        {/* ...твой svg и ссылка... */}
                    </div>
                    <div className={styles.size_box}>
                        <SizeFilter onChange={setSelectedSizes} />
                    </div>

                    <h2 className={styles.title_filter}>ЦЕНА</h2>
                    <div className={styles.price_box}>
                        <p className={styles.text_price}>От</p>
                        <input type="number" className={styles.price_input} onChange={(e) => setPriceFrom(e.target.value)} />

                        <p className={styles.text_price}>До</p>
                        <input type="number" className={styles.price_input} onChange={(e) => setPriceTo(e.target.value)} />
                    </div>

                    <h2 className={styles.title_filter}>Пол</h2>
                    <div className={styles.genders_box}>
                        {["Мужской", "Женский"].map((g, i) => (
                            <div className={styles.gender_box} key={i}>
                                <input
                                    type="checkbox"
                                    value={g}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setSelectedGender(prev =>
                                            prev.includes(value)
                                                ? prev.filter(v => v !== value)
                                                : [...prev, value]
                                        );
                                    }}
                                    className={styles.gender_input}
                                />
                                <p className={styles.gender_text}>{g}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.brands_container}>
                    <h2 className={styles.title_filter}>Бренды</h2>
                    <MultiSelectDropdown onChange={setSelectedBrands} />

                    <h2 className={styles.title_filter}>Цвет</h2>
                    <div className={styles.checkbox_list}>
                        {colors.map((color, index) => (
                            <label key={index} className={styles.checkbox_item}>
                                <input
                                    type="checkbox"
                                    value={color}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setSelectedColors(prev =>
                                            prev.includes(value)
                                                ? prev.filter(v => v !== value)
                                                : [...prev, value]
                                        );
                                    }}
                                    className={styles.checkbox_input}
                                />
                                <span className={styles.checkbox_label}>{color}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            <div className={styles.buttons}>
                <button className={styles.cancel} onClick={() => window.location.reload()}>Сбросить фильтры</button>
                <button className={styles.apply} onClick={handleApply}>Применить фильтры</button>
            </div>
        </div>
    );
}

export default Filter;
