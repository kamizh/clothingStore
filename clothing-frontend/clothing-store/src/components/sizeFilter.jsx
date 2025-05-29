import React, { useState } from 'react';
import styles from './sizeFilter.module.css';

const sizeOptions = ['XS', 'S', 'M', 'L', 'XL'];

function SizeFilter({ onChange }) {
    const [selectedSizes, setSelectedSizes] = useState([]);

    const toggleSize = (size) => {
        let updated;
        if (selectedSizes.includes(size)) {
            updated = selectedSizes.filter(s => s !== size);
        } else {
            updated = [...selectedSizes, size];
        }
        setSelectedSizes(updated);
        onChange?.(updated); 
    };

    return (
        <div className={styles.size_container}>
            {sizeOptions.map((size) => (
                <button
                    key={size}
                    className={`${styles.size_button} ${selectedSizes.includes(size) ? styles.active : ''}`}
                    onClick={() => toggleSize(size)}
                    type="button"
                >
                    {size}
                </button>
            ))}
        </div>
    );
}

export default SizeFilter;
