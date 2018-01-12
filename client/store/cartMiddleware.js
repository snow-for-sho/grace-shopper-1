import {getCart, setCart,  GET_CART}  from './cart';
import axios from 'axios';
const showCart = store => next => action => {
    console.log('got triggered', action);
    if (action.type === GET_CART) {
        let cart;
        if (store.user) {
            axios.get('/api/orders/?type=IN_CART')
            .then(res => res.data)
            .then (res => cart = res)
            .catch (console.log);
        }
        else {
            cart = localStorage.getItem('cart'); 
            if (!cart) {
                cart = {};
                localStorage.setItem('cart', cart);
            }
            
        }
        console.log("RIGHT BEFORE CART DISPATCH");
        store.dispatch(setCart(cart));
    }
    next (action);
}

export default showCart;