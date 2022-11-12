
import '../styles/app.scss'
import AppContext from '../appContext'
import { useState, useEffect } from 'react'



function MyApp({ Component, pageProps }) {


  const [cart, setCart] = useState({})



  useEffect(()=> {  
    let obj = {}
    Object.keys(localStorage).forEach((el)=> { 
      if(el !== 'ally-supports-cache'){
        obj[el] = JSON.parse(localStorage[el])
    }
  })
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
                addGood: addGood
      }
    }}>
      <Component {...pageProps}/> 
    </AppContext.Provider>
  ) 
}

export default MyApp
