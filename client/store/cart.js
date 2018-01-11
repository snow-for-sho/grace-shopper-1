import store from './index';
import axios from 'axios';
console.log('store', store);

export const GET_CART = 'GET_CART';

export function getCart () {
    const user = store.getState().user;
    let cart;
    if (user.id) {
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
    return {type: GET_CART, cart};
}

export default function (state = {}, action) {
    switch (action.type) {
        case GET_CART: 
            console.log("IN FINAL REDUCE");
            return action.cart;
        default: return state;
    }    
}