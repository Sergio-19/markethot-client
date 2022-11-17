import Layout from "../../components/layout/Layout"
import { useRouter } from "next/router"
import { useContext } from "react"
import AppContext from "../../appContext"
import Loader from "../../components/loader/Loader"
import axios from "axios"


const Order = () => {

    const {state} = useContext(AppContext)
  

    const {formcontrolls} = state.personal

    const router = useRouter()

    function cartTotal(cart, info) {
        let total = 0
  
       if(Object.keys(info).length > 0){
        let keys = Object.keys(cart)

        let arr = []

        keys.forEach((k)=>{
            let x = Object.values(cart[k])
            x.map((item)=>{
                item.headArticle = k
            })
            arr = [...arr, ...x]
        })
        arr.forEach((el)=> {
            total += (Number(info[el.headArticle].kinds[el.article].price) * el.amount)
        })
       }
       
        return total
    }

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

   let orderObj = { order: state.order.toUpperCase(),
                    name: `${formcontrolls.name.value} ${formcontrolls.surname.value || ''}`,
                    phone: formcontrolls.phone.value || '',
                    email: formcontrolls.email.value || '',
                    address: state.deliveryAddress || '',
                    delivery: state.deliveryCheck === 1 ? 'Доставка в пункт выдачи' : 'Доставка курьером',
                    sum: state.deliveryCheck === 2 && state.deliveryAddress !== '' ? cartTotal(state.cart, state.info)+499 : cartTotal(state.cart, state.info),
                    goods: {}
                  }

   async function postOrder(obj) {
         let order = JSON.stringify(obj)
         const response = await axios.post('213.139.210.111:8080/admin/postorder', {order})
         console.log(response.data)
         state.cleanCart()
         window.location.href = 'https://yookassa.ru/my/i/Y3X0gCXhSM10/l'
        }


    

        if(router.query.order === state.order){
          return(
        <Layout title = 'Hopastore интернет-магазин оптовых продаж бытовых товаров из Турции с доставкой по всей России'
                description = "Официальный сайт Hopastore в России. Hopastore - это интернет-магазин оптовых продаж бытовых товаров из Турции с доставкой по всей России. Огромный выбор товаров и выгодные цены на электронику и бытовую технику, одежду для детей и взрослых, товары для дома и сада и многое другое в интернет-магазине hopastore.">
            {state.info.length === 0 ? <Loader /> : <div className="order__wrapper">
            <div className="order__title">
                        <h2>Заказ № <strong style={{textTransform: 'uppercase', fontSize: '22px'}}>{router.query.order}</strong></h2>
            </div>
            <div className="cart__blocks-card cart__blocks-delivery">
                    <div className="cart__blocks-card-title">
                        <h2>Покупатель</h2>
                    </div>
                    <div className="cart__blocks-delivery-content-wrap">
                        <div className="cart__blocks-delivery-content">
                            <div className="cart__blocks-delivery-content-text">
                                 <span>Имя:</span>
                                <strong>{`${formcontrolls.name.value} ${formcontrolls.surname.value || ''}` || 'Не указано'}</strong>
                                <span>Телефон:</span>
                                <strong>{formcontrolls.phone.value || 'Не указано'}</strong>
                                <span>E-mail:</span>
                                <strong>{formcontrolls.email.value || 'Не указано'}</strong>
                                <span>Адрес доставки:</span>
                                <strong>{state.deliveryAddress || 'Не указано'}</strong>
                                <span>Способ доставки:</span>
                                <strong>{state.deliveryCheck === 1 ? 'Доставка в пункт выдачи' : "Доставка курьером"}</strong>
                            </div>
                           
                        </div>
                    </div>
                </div>
                <div className="cart__blocks-card cart__blocks-delivery">
                    <div className="cart__blocks-card-title">
                        <h2>Товары</h2>
                    </div>
                    <div className="cart__blocks-delivery-content-wrap">
                       {cartArray.map((good, i)=> {
                            orderObj.goods[good.headArticle] = {name: state.info[good.headArticle].name,
                                                                article: good.article,
                                                                amount: good.amount,
                                                                price: state.info[good.headArticle].kinds[good.article].price || ''
                                                            }
                         return (
                            <div className="order__good-item" key = {i}>
                                <small>{i+1}.</small>
                                <div><span>{state.info[good.headArticle].name} 
                                {state.info[good.headArticle].kinds[good.article].option === 'Пустое поле' ? '' : (state.info[good.headArticle].kinds[good.article].option)}</span></div>
                                <span>{good.amount} ед.</span>
                            </div>
                         )
                       })}
                    </div>
                </div>
                <div className="cart__order cart__blocks-card" style = {{width: '100%', marginLeft: 0}}>
                    <div className="cart__order-head">
                        <span>Итого:</span>
                        <span id= "cart__order-result" className="cart__order-head-price">{state.deliveryCheck === 2 && state.deliveryAddress !== '' ? cartTotal(state.cart, state.info)+499 : cartTotal(state.cart, state.info)} ₽</span>
                    </div>                                                                              
                    <div className="cart__order-content">
                        <div className="cart__order-content-item">
                            <span id= "cart__order-amount">Товары: {cartAmount(state.cart)} шт.</span>
                            <span id= "cart__order-sum">{cartTotal(state.cart, state.info)} ₽ </span>
                        </div>
                        <div className="cart__order-content-item">
                            <span>Доставка:</span>
                            <span id= "cart__order-delivery">{state.deliveryCheck === 1 ? 0 : 499} ₽</span>
                        </div>
                    </div>
                    <div className="cart__order-btn order__button">
                        {Object.keys(state.cart).length === 0 ? <></> : <button onClick = {()=> postOrder(orderObj)}>Перейти к оплате</button>}
                    </div>
                </div> 
            </div>}
            
        </Layout>
    )  
        } else {
            return (
                <Layout>
                <div className="order__wrapper">
                    <div className="order__title">
                        <h2>Похоже такого заказа не существует...</h2>
                        <button onClick = {()=> router.push('/')}>На главную страницу</button>
                    </div>
                </div>
    
            </Layout>
            )
        }

    
}



export default Order