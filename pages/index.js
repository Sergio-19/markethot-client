import Layout from "../components/layout/Layout";
import Link from "next/link";
import GoodCard from "../components/goodCard/GoodCard";
import axios from "axios";


export default function Home({goods}) {


  return (
    <Layout>
     <div className="home__sale-wrap">
        <div className="home__sale">
          <p>Товары для Нового Года со скидкой до 70%!!!</p>
        </div>
     </div>
     <div className="home__content-wrap">
        <div className="home__sidebar">
          <p>Категории</p>
          <ul>
            {/* <li><Link href = '/categories/catalog'><a>Весь каталог</a></Link></li> */}
            <li><Link href = '/categories/tovary_dlya_doma'><a>Товары для дома</a></Link></li>
            <li><Link href = '/categories/krasota_i_zdorove'><a>Красота и здоровье</a></Link></li>
            <li><Link href = '/categories/elektronika'><a>Электроника</a></Link></li>
            <li><Link href = '/categories/detskie_tovary'><a>Детские товары</a></Link></li>
            <li><Link href = '/categories/podarki_i_khobbi'><a>Подарки и хобби</a></Link></li>
            <li><Link href = '/categories/tv-tovari'><a>TV-товары</a></Link></li>
            <li><Link href = '/categories/sport_i_otdykh'><a>Спорт и отдых</a></Link></li>
            <li><Link href = '/categories/avto'><a>Автотовары</a></Link></li>
            <li><Link href = '/categories/Noviy_god'><a>Новый год</a></Link></li>
            <li><Link href = '/categories/clothes'><a>Одежда</a></Link></li>
            {/* <li><Link href = '/categories/sale'><a>Ликвидация</a></Link></li> */}
          </ul>


        </div>
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

export async function getStaticProps(context) {
      const response = await axios('http://localhost:5000/admin/randomgoods')
      const goods = response.data.goods
  return {
    props: {goods}, // will be passed to the page component as props
  }
}
