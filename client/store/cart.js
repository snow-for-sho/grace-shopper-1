import store, {updateProductQty, fetchOrders} from './index';

import axios from 'axios';
const GET_CART = 'GET_CART';
const UPDATE_RECIPIENT = 'UPDATE_RECIPIENT';

export const getCart = (cart) =>{
    return {type: GET_CART, cart}
}

export const updateRecipientInfo = (fieldName, fieldValue) => ({type:UPDATE_RECIPIENT, fieldName, fieldValue})
const isLoggedIn = () => store.getState().user.id;

const isLocalCartEmpty = () => {
    const cart = localStorage.getItem('cart');
    if (cart) {
        const items = JSON.parse(cart).items;
        console.log('items in local cart', items)
        if (Object.keys(items).length) {
            return false;
        }
    }
    return true;
}

export const fetchCart = () => dispatch => {
    console.log("FETCHING CART");
    // localStorage.removeItem('cart'); 
    let cart;
    if (isLoggedIn() && isLocalCartEmpty()) {
        console.log("getting saved cart")
        axios.get('/api/orders/?status=IN_CART')
        .then(res => res.data)
        .then (res => {
            cart = initCart;
            //cart['id'] = res.id;
            if (res) res.lineItems.forEach (lineItem => {
                cart['items'][lineItem.product.id] = lineItem
            });
            console.log("set cart to", res, cart);
            localStorage.setItem('cart', JSON.stringify(cart));
            dispatch(getCart (cart))
        } )
        .catch (console.log);
    }
    else {

        console.log("getting cart")
        let cart; 
        //console.log(cart)
        if (isLocalCartEmpty()) {
            console.log("cart is empty")
            cart = initCart;
            localStorage.setItem('cart', JSON.stringify(cart));
        } else 
            cart = JSON.parse(localStorage.getItem('cart'));
        console.log("fetched cart",cart);
        dispatch(getCart (cart));
        
    }
    
}

export const submitCart = (recipientInfo, history) => dispatch => {
    let cart = JSON.parse(localStorage.getItem('cart'));
    console.log("recipientInfo", recipientInfo, "cart", cart)
    axios.post('/api/orders', {cart, recipientInfo})
    .then(res => res.data)
    .then(res => {
        console.log("ORDER PLACED");
        //show Order
        //set cart to empty
        cart = initCart;
        localStorage.setItem('cart', JSON.stringify(cart))
        dispatch (getCart(cart));
        dispatch(fetchOrders());
        //send user to orders view page
        history.push(`/orders/${res.id}`)
    })
    .catch (console.log);
}

export const addToCart = (lineItem) => dispatch => {
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    console.log("Current Cart is", cart);
    const id = lineItem.product.id;
    if (cart.items[id]) {
        //console.log("cart found for id", cart[id]);
        const li= cart.items[id];
        li.quantity  = +li.quantity + +lineItem.quantity ;
        //console.log("line item", li);
    }
    else cart.items[id] = lineItem;
    localStorage.setItem('cart', JSON.stringify(cart));
    //console.log(cart);
    if (isLoggedIn()) {
        axios.put(`/api/orders/${cart.id}`, cart.items)
        .then(res => res.data)
        .then (res =>  notifyCartChange(dispatch, cart, id, 0-lineItem.quantity) );
    } else notifyCartChange(dispatch, cart, id, 0-lineItem.quantity)
}

const notifyCartChange = (dispatch, cart, prodId, diff) => {
    if (!cart.items[prodId].quantity ) {
        delete cart.items[prodId];
        localStorage.setItem('cart', JSON.stringify(cart))
    }
    dispatch (getCart (cart));
    dispatch (updateProductQty(prodId, diff));
}

export const updateCart = (prodId, qty) => dispatch => {
    const cart = JSON.parse(localStorage.getItem('cart'));

    console.log("UPDATING CART", cart, prodId, qty)
    const diff = cart.items[prodId].quantity - qty;
    cart.items[prodId].quantity = +qty;  
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log(cart);

    if(isLoggedIn()) {
        axios.put(`/api/orders/${cart.id}`, cart.items)
        .then(res => res.data)
        .then (res => {
            console.log("updated cart", res);
            notifyCartChange(dispatch, cart, prodId, diff)
        });
    } else notifyCartChange(dispatch, cart, prodId, diff)
}

const populateUser = (user) => {
    Object.keys(user).forEach (key => {
      if (!user[key]) user[key] = ''
    })
    return user;
  }

const initCart = {
    id: null,
    items: {},
    recipientInfo: store? {...store.getState().user, instructions:'', paymentType:''}:{
        firstName:'',
        lastName:'',
        address:'',
        phone:'',
        email:'',
        paymentType:'',
        instructions:''
    }
}

export default function (state = initCart, action) {
    switch (action.type) {
        case GET_CART: 
            return action.cart;
        case UPDATE_RECIPIENT: 
            const recipient = {...state.recipientInfo}
            recipient[action.fieldName] = action.fieldValue;
            return {...state, recipientInfo:recipient}
        default: return state;
    }    
}