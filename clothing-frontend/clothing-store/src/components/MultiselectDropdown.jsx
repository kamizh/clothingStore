import { useState, useRef, useEffect } from 'react';
import styles from "./MultiSelectDropdown.module.css"


const categories = [
    { value: 'Nike', label: 'Nike' },
    { value: 'Carhartt', label: 'Carhartt' },
    { value: 'The North Face', label: 'The North Face' },
    { value: 'Stone Island', label: 'Stone Island' },
    { value: 'Fred Perry', label: 'Fred Perry' },
    { value: 'New Balance', label: 'New Balance' },
    { value: 'Dickies', label: 'Dickies' },
    { value: 'Bape', label: 'Bape' },
    { value: 'Adidas', label: 'Adidas' },
    { value: 'Lyle & Scott', label: 'Lyle & Scott' },
    { value: 'Jordan', label: 'Air Jordan' },
    { value: 'Champion', label: 'Champion' },
    { value: 'Tommy Jeans', label: 'Tommy Jeans' },
    { value: 'Kappa', label: 'Kappa' },
];

function MultiSelectDropdown({ onChange }) {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState([]);
    const ref = useRef();

    const toggleItem = (value) => {
        const updated = selected.includes(value)
            ? selected.filter((v) => v !== value)
            : [...selected, value];

        setSelected(updated);
        onChange?.(updated);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={styles.wrapper} ref={ref}>
            <div className={styles.selector} onClick={() => setOpen(!open)}>
                {selected.length > 0
                    ? categories
                          .filter((c) => selected.includes(c.value))
                          .map((c) => c.label)
                          .join(', ')
                    : 'Бренд'}
                <span className={styles.arrow}>▾</span>
            </div>

            {open && (
                <div className={styles.dropdown}>
                    {categories.map((cat) => (
                        <label key={cat.value} className={styles.option}>
                            <input
                                type="checkbox"
                                checked={selected.includes(cat.value)}
                                onChange={() => toggleItem(cat.value)}
                            />
                            {cat.label}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MultiSelectDropdown;
