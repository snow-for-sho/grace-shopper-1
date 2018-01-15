import React, { Component } from 'react';
//import LineItem from './LineItem';
import {connect} from 'react-redux';
import {Order} from './CartOrder';
import {CheckoutForm} from './AddressForm';
import { Link } from 'react-router-dom';

export default function Checkout (props) {
    const cartString = localStorage.getItem('cart');
    const cart = cartString?JSON.parse(cartString).items:cartString;
    //console.log("cart length", cart,  cart.length);
    return (
       Object.keys(cart).length? <div>
            <Order />
            <CheckoutForm /> 
        </div>
        :<div> Cart is empty</div>
    );
}