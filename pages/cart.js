import CartItem from "../components/cardItem/CartItem"
import Layout from "../components/layout/Layout"
import { useContext } from "react"
import Loader from '../components/loader/Loader'
import AppContext from "../appContext"


const Cart = () => {


    const {state} = useContext(AppContext)




    function cartAmount(cart) {
        let amount = 0
        let keys = Object.keys(cart)

        let arr = []

        keys.forEach((k)=>{
            let x = Object.entries(cart[k])
            arr = [...arr, ...x]
        })

        arr.forEach((el)=> {
          amount+=el[1].amount
        })
        return amount
    }

    function cartResult(cart) {
        let amount = 0
        let keys = Object.keys(cart)

        let arr = []

        keys.forEach((k)=>{
            let x = Object.values(cart[k])
            x.map((item)=>{
                item.headArticle = k
            })
            arr = [...arr, ...x]
        })
        return arr
    }

   let cartArray = cartResult(state.cart)


    return (
        <Layout>
           {Object.keys(state.info).length === 0 ? <Loader /> : 
            <div className="cart__wrap">
            <div className="cart__blocks">
                <div className="cart__blocks-card cart__blocks-good">
                    <div className="cart__blocks-card-title">
                        <h2 id= "cart__block-title">Корзина</h2>
                    </div>
                    {cartArray.map((good, i)=> {
                        return (
                           <CartItem  key = {i}
                                      image = {state.info[good.headArticle].images[0]}  
                                      name = {state.info[good.headArticle].name}
                                      option = {state.info[good.headArticle].kinds[good.article].option}
                                      amount = {good.amount}
                                      price = {state.info[good.headArticle].kinds[good.article].price}
                                      article = {good.headArticle}
                           /> 
                        )
                    })} 
                </div>
                <div className="cart__blocks-card cart__blocks-delivery">
                    <div className="cart__blocks-card-title">
                        <h2>Доставка</h2>
                    </div>
                    <div className="cart__blocks-delivery-content-wrap">
                        <div className="cart__blocks-delivery-content">
                            <strong>Адрес доставки:</strong>
                            <span>Адрес не указан</span>
                            <button>Изменить</button>
                        </div>
                    </div>
                </div>
                <div className="cart__blocks-card cart__blocks-personal">
                    <div className="cart__blocks-card-title">
                        <h2>Ваши данные</h2>
                    </div>
                </div>
            </div> 
            <div className="cart__order cart__blocks-card">
                    <div className="cart__order-head">
                        <span>Итого:</span>
                        <span id= "cart__order-result" className="cart__order-head-price">0 ₽</span>
                    </div>
                    <div className="cart__order-content">
                        <div className="cart__order-content-item">
                            <span id= "cart__order-amount">Товары: {cartAmount(state.cart)} шт.</span>
                            <span id= "cart__order-sum">0 ₽ </span>
                        </div>
                        <div className="cart__order-content-item">
                            <span>Доставка:</span>
                            <span id= "cart__order-delivery">0 ₽</span>
                        </div>
                    </div>
                    <div className="cart__order-option">
                        <span>Адрес:</span>
                        <p>Адрес не указан</p>
                    </div>
                    <div className="cart__order-option">
                        <span>Оплата:</span>
                        <p>Картой</p>
                    </div>
                    <div className="cart__order-btn">
                        <button>Оплатить заказ</button>
                    </div>
                </div> 
        </div>
           }   
        </Layout>
        
    )
}



export default Cart