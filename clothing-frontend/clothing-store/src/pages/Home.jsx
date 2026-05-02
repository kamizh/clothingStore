
import styles from './Home.module.css'
import Subscrabe from "../components/subscribe.jsx"
import Header from "../components/header.jsx"
import MainIllustration from '../components/mainillustration.jsx'
import TypeClothes from '../components/typeClothes.jsx'
import CategoryProduct from '../components/categoryProduct.jsx'
import Actuality from '../components/actuality.jsx'
import PopularProducts from '../components/popularProducts.jsx'

function Home()
{
    return (
        <div className="home">

        <MainIllustration />
        <TypeClothes/>
        <CategoryProduct/>
        <PopularProducts></PopularProducts>
        <Actuality/>
                <Subscrabe/>
        </div>
      
    )
}
export default Home;