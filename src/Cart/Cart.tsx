import CartItem from '../CartItem/CartItem'
//Styles
import {Wrapper} from './Cart.styles'
//Types
import {CartItemType} from '../App'

type Props = {
    cartItem : CartItemType[];
    addToCart : (clickedItem : CartItemType) => void;
    removeFromCart : (id: number) => void;
}

const Cart:React.FC<Props> = ({cartItem, addToCart, removeFromCart}) =>{
    return(
        <Wrapper>
            <h2>Your Shopping Cart</h2>
            {cartItem.length === 0? <p>No items in cart.</p>:null}
            {cartItem.map(item => (
                <CartItem 
                    key={item.id}
                    item={item}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                />
            ))}
        </Wrapper>
    )
}

export default Cart