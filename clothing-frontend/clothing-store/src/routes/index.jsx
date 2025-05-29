import { BrowserRouter,Route,Routes } from "react-router-dom";
import Home from "../pages/Home.jsx"
import Catalog from "../pages/catalog.jsx"
import Cart from "../pages/cart.jsx"
import Category from "../pages/category.jsx"
import SubCategory from "../pages/subcategory.jsx"
import Product from "../pages/product.jsx"
import Search from "../pages//search.jsx"
import Profile from "../pages/profile.jsx"
import NotFound from "../pages/NotFound.jsx"
import About from "../pages/about.jsx"




function Index()
{
    return (
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/catalog/:param1" element={<Catalog />} />
            <Route path="/catalog/:param1/:param2" element={<Catalog />} />



            <Route path="/product/:id" element={<Product/>} />
            <Route path="/search" element={<Search/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="*" element={<NotFound/>} />
            <Route path="/about" element={<About/>} />


        </Routes>
    )
}

export default Index;