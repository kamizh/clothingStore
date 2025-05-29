import styles from './catalog.module.css'
import Subscrabe from "../components/subscribe.jsx"
import axios from 'axios'
import { useState,useEffect } from 'react'
import React from 'react'
import OurLinks from '../components/UI/ourLinks.jsx'
import Cardproduct from '../components/cardproduct.jsx'
import Actuality from '../components/actuality.jsx'
import SizeFilter from '../components/sizeFilter.jsx'
import MultiSelectDropdown from '../components/MultiselectDropdown.jsx'
import { useParams } from 'react-router-dom';

import Filter from '../components/filter.jsx'

import SortDropdown from '../components/SortDropdown.jsx'


function Catalog(props)
{



    // импорт продуктов с api 
    const [products,setProducts] = useState([]);

    const [productFilterArr,setProductFilterArr] = useState([]);

    const { param1, param2 } = useParams();

    let gender = null;
    let category = null;
    let brand = null;

    const isGender = (val) => ["men", "women", "kids"].includes(val.toLowerCase());
    const isCategory = (val) => ["tshirts", "jackets", "jeans", "hoodies"].includes(val.toLowerCase());

    // 🔍 интерпретируем параметры
    if (param1 && param2) {
        if (isGender(param1)) {
            gender = param1;
            if (isCategory(param2)) category = param2;
            else brand = param2;
        }
    } else if (param1) {
        if (isGender(param1)) gender = param1;
        else if (isCategory(param1)) category = param1;
        else brand = param1;
    }

    useEffect(() => {
    let url = "http://localhost:5095/api/product/allProducts";

    if (gender && category) {
        url = `http://localhost:5095/api/product/${gender}/category/${category}`;
    } 
    else if (gender && brand) {
        url = `http://localhost:5095/api/product/${gender}/brand/${brand}`;
    }
    else if (gender) {
        url = `http://localhost:5095/api/product/${gender}`;
    } 
    else if (category) {
        url = `http://localhost:5095/api/product/category/${category}`;
    } 
    else if (brand) {
        url = `http://localhost:5095/api/product/brand/${brand}`;
    }

    console.log("📦 URL для загрузки:", url);

    axios.get(url)
        .then(res => {
            setProducts(res.data);
            setProductFilterArr(res.data);
        })
        .catch(() => console.log("Ошибка загрузки продуктов по URL: " + url));
    }, [gender, category, brand]);





    

    
    // постраничный вывод 

    const itemsPerPage = 20;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(productFilterArr.length / itemsPerPage);

    const currentProducts = productFilterArr.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
    );


    useEffect(() => {
        window.scrollTo({ top: 1000, behavior: "smooth" }); 
    }, [currentPage]);
    const getPageNumbers = () => {
        const pages = [];
        const maxShown = 5;
        if (totalPages <= maxShown + 2) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);
            if (currentPage > 3) pages.push("...");
            for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
                pages.push(i);
            }
            if (currentPage < totalPages - 2) pages.push("...");
            pages.push(totalPages);
        }
        return pages;
    };  

    // фильтры

    const [isOpenFilter,setIsOpenFilter] = useState(false) 


    

    const [filters, setFilters] = useState({
        categories: [],
        brands: [],
        colors: [],
        priceFrom : 0,
        priceTo : 10000000,
        genders: [],
        sizes: []
    });

    useEffect(() => {

        if (
            filters.categories.length ||
            filters.brands.length ||
            filters.colors.length ||
            filters.genders.length ||
            filters.sizes.length ||
            filters.priceFrom != 0 || 
            filters.priceTo < 100000000
        ) {
            productFilter();
        }
    }, [filters]);

    const productFilter = () => {


       

        console.log(filters.priceFrom + " " + filters.priceTo)

            const newProduct = products.filter(product => {
            const matchCategory = filters.categories.length === 0 || filters.categories.includes(product.CategoryName);
            const matchBrand = filters.brands.length === 0 || filters.brands.includes(product.BrandName);
            const matchColor = filters.colors.length === 0 || filters.colors.includes(product.Color);
            const matchGender = filters.genders.length === 0 || filters.genders.includes(product.GenderName);
            const matchSize = filters.sizes.length === 0 || filters.sizes.some(size => product.Sizes.includes(size));
            const matchPrice = (parseInt(filters.priceFrom) === null || product.Price >= parseInt(filters.priceFrom)) && (parseInt(filters.priceTo) === null || product.Price <= parseInt(filters.priceTo));

            return matchCategory && matchBrand && matchColor && matchGender && matchSize && matchPrice;
        });

        

        setCurrentPage(1); 
        setProductFilterArr(newProduct); 
        
        

    };



    

    const handleSortChange = (value) => {
        console.log("Выбрана сортировка:", value);


        if (value === "popular") {
            setProductFilterArr([...productFilterArr]); 
    }   
        else if (value === "price_asc") {
            const newProduct = [...productFilterArr].sort((a, b) => a.Price - b.Price);
            setProductFilterArr(newProduct);
        }
        else if (value === "price_desc") {
            const newProduct = [...productFilterArr].sort((a, b) => b.Price - a.Price);
            setProductFilterArr(newProduct);
}

        
    };





    return (
        <div className={styles.Catalog}>
            <Actuality/>
            <div className={styles.catalog_content}>
                <div className={styles.hight_elems}>
                    <div className={styles.title_and_count}>
                        <h1 className={styles.title}>Каталог товаров</h1>
                        <p className={styles.countProduct}>{productFilterArr.length} товара</p>
                    </div>
                    <div className={styles.activeButton}>
                        <button onClick={() => {
                            if(isOpenFilter)
                                setIsOpenFilter(false)
                            else
                                setIsOpenFilter(true);

                        }} className={`${styles.buttonAll} ${styles.button_filter}`}>Фильтры
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.6248 13.4369L3.12485 13.4369" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M16.875 13.4369L13.125 13.4369" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M5.62485 6.56196L3.12485 6.56189" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M16.875 6.56189L8.125 6.56196" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M8.125 4.68689V8.43689" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M13.125 15.3119V11.5619" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>

                        <SortDropdown onChange={handleSortChange} />

                    </div>
                </div>


                { isOpenFilter && <Filter className={styles.filter} onApplyFilters={setFilters}  />}

                      

                <div className={styles.products_container}>
                    {currentProducts.map(product => (
                    <div key={product.id} className={styles.card_wrapper}>
                        <Cardproduct product={product} />
                    </div>
                    ))}


                </div>
                <div className={styles.pagination}>
                    {getPageNumbers().map((page, i) => (
                        <span
                            key={i}
                            onClick={() => typeof page === "number" && setCurrentPage(page)}
                            className={page === currentPage ? styles.pageActive : styles.page}
                        >
                            {typeof page === "number" ? String(page).padStart(2, "0") : "…"}
                        </span>
                    ))}
                    {currentPage < totalPages && (
                        <span onClick={() => setCurrentPage(currentPage + 1)} className={styles.arrowRight}>›</span>
                    )}
                </div>

            </div>
            <Subscrabe/>
            <OurLinks/>
        </div> 
    )
}
export default Catalog;
