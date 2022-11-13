
import '../styles/app.scss'
import AppContext from '../appContext'
import { useState, useEffect } from 'react'
import axios from "axios"



function MyApp({ Component, pageProps }) {


  const [cart, setCart] = useState({})
  const [info, setInfo] = useState([])

//функция получения информации с сервера о товарах в корзине
  async function getCartInfo(cart) {
    const cartKeys = Object.keys(cart)
    const response = await axios.post('http://localhost:5000/admin//getcartinfo', {cart: JSON.stringify(cartKeys)})
    setInfo(response.data.goods)
}

  useEffect(()=> {  
    let obj = {}
    
    Object.keys(localStorage).forEach((el)=> { 
      if(el !== 'ally-supports-cache'){
        obj[el] = JSON.parse(localStorage[el])
    }
  })
  if(Object.keys(obj).length > 0){
    getCartInfo(obj)
  }
  setCart(obj)
  }, [])


  //функция добавления товара в корзину
  async function cartStringify(cart) {
    let local = {}
    Object.keys(cart).forEach((el)=> {
        local[el] = JSON.stringify(cart[el])
     }) 
    await addLocaleStorage(local)  
  }

  function addLocaleStorage(cart) {
    Object.keys(cart).forEach((el)=> {
       localStorage[el] = cart[el]
    })
  }
  
  function addGood(headArticle, article, amount) {
    let newCart = {...cart}
    if(newCart[headArticle]){
      newCart[headArticle] = {...cart[headArticle], [article]: {article, amount}} 
      setCart({...newCart})
    } else {
      newCart[headArticle] = {[article]: {article, amount}}
      setCart({...newCart})
    }
    cartStringify(newCart)
    getCartInfo(newCart)   
  }

  //функция удаления товара из корзины

  function deleteGood(headArticle ,article) {
    let cartCopy = {...cart}
    if(Object.keys(cartCopy[headArticle]).length > 1){
      delete cartCopy[headArticle][article]
      setCart({...cartCopy})
      cartStringify(cartCopy)
      getCartInfo(cartCopy)
    } else {
      delete cartCopy[headArticle]
      setCart({...cartCopy})
      localStorage.removeItem([headArticle])
      getCartInfo(cartCopy)
    }
    
  }


  //изменение количества товаров в корзине

  function goodIncrement(headArticle ,article) {
    let cartCopy = {...cart}
    console.log(headArticle ,article)
    let amount = cartCopy[headArticle][article].amount
    cartCopy[headArticle][article].amount = amount + 1
    setCart({...cartCopy})
    cartStringify(cartCopy)
    getCartInfo(cartCopy)
    
  }

  function goodDecrement(headArticle ,article) {
    let cartCopy = {...cart}
    console.log(headArticle ,article)
    let amount = cartCopy[headArticle][article].amount
    cartCopy[headArticle][article].amount = amount === 1 ? amount : amount - 1
    setCart({...cartCopy})
    cartStringify(cartCopy)
    getCartInfo(cartCopy)
    
  }



  return (
    <AppContext.Provider value={{
      state: {  cart,
                addGood,
                info,
                deleteGood,
                goodIncrement,
                goodDecrement
      }
    }}>
      <Component {...pageProps}/> 
    </AppContext.Provider>
  ) 
}

export default MyApp
