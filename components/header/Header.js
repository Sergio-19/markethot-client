import { useRouter } from "next/router"
import AppContext from "../../appContext"
import { useContext } from "react"

const Header = () => {
    const {state} = useContext(AppContext)

    function cartResult(cart) {
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
       
        console.log(amount)
        return amount
    }

    

    const router = useRouter()


    return(
        <>
        <header>
            <div className="container">
                <div className="header__content">
                    <div className="header__logo">
                        <a href="/">HotMarket</a>
                    </div>
                    <div className="header__search">
                        <div className="header__search__wrap">
                           <i className="fa fa-search"/>  
                           <input type= 'text' placeholder='Поиск'/>       
                        </div>
                    </div>
                    <div className="header__icons">
                        <div className="header__icons-item" onClick = {()=> router.push('/profile')}>
                            <i className="fa fa-user"/>
                            <span>Профиль</span>
                        </div>
                        <div className="header__icons-item" onClick = {()=> router.push('/allcategories')}>
                            <i className="fa fa-folder"/>
                            <span>Категории</span>
                        </div>
                        <div className="header__icons-item header__icons-cart" onClick = {()=> router.push('/cart')}>
                            <small className="header__cart-round">{cartResult(state.cart)}</small>
                            <i className="fa fa-shopping-cart"/>
                            <span>Корзина</span>
                        </div>
                    </div>
                </div>
            </div>    
        </header>
        <div className="navpanel">
            <div className="container">
                <div className="navpanel__content">
                    <div className="header__icons-item" onClick = {()=> router.push('/')}>
                            <i className="fa fa-home"/>
                            <span>Главная</span>
                    </div>
                    <div className="header__icons-item" onClick = {()=> router.push('/allcategories')}>
                            <i className="fa fa-folder"/>
                            <span>Категории</span>
                    </div>
                    <div className="header__icons-item" onClick = {()=> router.push('/profile')}>
                            <i className="fa fa-user"/>
                            <span>Профиль</span>
                    </div>
                    <div className="header__icons-item header__icons-cart" onClick = {()=> router.push('/cart')}>
                            <small className="header__cart-round"></small>
                            <i className="fa fa-shopping-cart"/>
                            <span>Корзина</span>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}


export default Header