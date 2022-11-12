import Layout from "../../components/layout/Layout";
import GoodCard from "../../components/goodCard/GoodCard";
import axios from "axios";
import { useRouter } from "next/router";


const CategoryPage = ({goods}) => {

  function getCategory(query) {
     switch(query) {
        case 'tovary_dlya_doma':
          return 'Товары для дома'
        case 'krasota_i_zdorove':
          return 'Красота и здоровье'
        case 'elektronika':
          return 'Электроника'
        case 'detskie_tovary':
          return 'Товары для детей' 
        case 'podarki_i_khobbi':
          return 'Подарки и хобби' 
        case 'tv-tovari':
          return 'TV-товары' 
        case 'sport_i_otdykh':
          return 'Товары для спорта и отдыха' 
        case 'avto':
          return 'Автотовары' 
        case 'Noviy_god':
          return 'Товары для праздника' 
        case 'clothes':
          return 'Одежда и аксессуары'     
      default:
        return query
     }
  }



   const {query} = useRouter()
    return (
      <Layout>
      <div className="home__sale-wrap">
         <div className="home__sale">
           <p>Товары для Нового Года со скидкой до 70%!!!</p>
         </div>
         <div className="page__title">
                <h3>{getCategory(query.category)}</h3>
            </div>
      </div>
      <div className="home__content-wrap">
         <div className="home__content">
        {Object.keys(goods).map((good, i)=> {
          return (
            <GoodCard 
            article = {goods[good].article}
            image = {goods[good].images[0]}
            title = {goods[good].name}
            price = {goods[good].price}
            key = {good}
            />
          )
        })}
         </div>
 
      </div>
     </Layout>
      )
}

export async function getServerSideProps({params}) {
    const response = await axios.post('http://localhost:5000/admin/allgoods', {category: params.category})
    const goods = response.data.goods
  return {
    props: {goods}, // will be passed to the page component as props
  }
}

export default CategoryPage;