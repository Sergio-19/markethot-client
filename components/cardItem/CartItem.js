import { useRouter } from "next/router"

const CartItem = ({image, name, option, amount, price, article}) => {
    const router = useRouter()
    return (
        <>
         <div className="cart__blocks-good-item">
    <div className="cart__blocks-good-item-info">
        <div className="cart__blocks-good-item-info-image" onClick={()=> router.push(`/good/${article}`)}>
            <img src= {image} alt= 'name'/>
        </div>
        <div className="cart__blocks-good-item-info-text" onClick={()=> router.push(`/good/${article}`)}>
            <p>{name}</p>
            <span>{option === 'Пустое поле' ? '' : `(${option})`}</span>
        </div>
    </div>
    <div className="cart__blocks-good-item-amount">
        <button data-good_id = '${good.article}' className= 'j-minus'>-</button>
        <div className="cart__blocks-good-item-amount-delete">
            <strong>{amount}</strong>
            <span data-good_id = '${good.article}' className="j-delete">Удалить</span>
        </div>
        <button data-good_id = '${good.article}' className='j-plus'>+</button>
    </div>
    <div className="cart__blocks-good-item-price">
        <strong>{price} ₽</strong>
    </div>
</div>
        </>
       
    )
}

export default CartItem