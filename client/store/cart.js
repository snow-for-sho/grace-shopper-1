import store from './index';
import axios from 'axios';
const GET_CART = 'GET_CART';

export const getCart = (cart) =>{
    return {type: GET_CART, cart}
}
const isLoggedIn = () => store.getState().user.id;

export const fetchCart = () => dispatch => {
    //console.log("FETCHING CART");
    //localStorage.removeItem('cart');
    let cart;
    if (isLoggedIn()) {
        axios.get('/api/orders/?type=IN_CART')
        .then(res => res.data)
        .then (res => cart = res)
        .catch (console.log);
    }
    else {
        
        // cart = JSON.parse(localStorage.getItem('cart')); 
        if (!cart) {
            cart = {};
            localStorage.setItem('cart', JSON.stringify(cart));
        }
        
    }
    const storageCart = localStorage.getItem('cart');
    dispatch(getCart (cart))
}

export const addToCart = (lineItem) => dispatch => {
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    //console.log("Current Cart is", cart);
    const id = lineItem.product.id;
    if (cart[id]) {
        //console.log("cart found for id", cart[id]);
        const li= cart[id];
        li.quantity  = +li.quantity + +lineItem.quantity ;
        //console.log("line item", li);
    }
    else cart[id] = lineItem;
    localStorage.setItem('cart', JSON.stringify(cart));
    //console.log(cart);
    if (isLoggedIn()) {
        //TODO - persist
    } 
    dispatch (getCart (cart));
}

export default function (state = {}, action) {
    switch (action.type) {
        case GET_CART: 
            return action.cart;
        default: return state;
    }    
}