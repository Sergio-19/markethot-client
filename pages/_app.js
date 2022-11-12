
import '../styles/app.scss'
import AppContext from '../appContext'
import { useState, useEffect } from 'react'
import axios from "axios"



function MyApp({ Component, pageProps }) {


  const [cart, setCart] = useState({})
  const [info, setInfo] = useState([])

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
    console.log('ADD')
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
    
  }



  return (
    <AppContext.Provider value={{
      state: {  cart: cart,
                addGood: addGood,
                info
      }
    }}>
      <Component {...pageProps}/> 
    </AppContext.Provider>
  ) 
}

export default MyApp
