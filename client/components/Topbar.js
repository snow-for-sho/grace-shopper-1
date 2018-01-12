import React from 'react';
import { Link } from 'react-router-dom';
import {logout} from '../store';
import {connect} from 'react-redux';

const Topbar = props => {
    return (
         <div className='topbar'>
             <nav>
                 <Link to="/">Home</Link>
                 <Link to="/categories">Categories</Link>
                 <Link to="/products">Products</Link>
             </nav>
            <div>
                <div><h3>Snow Fo Sho</h3></div>
                <div>
                    <input type='text' name='search' placeholder='search...'/>
                    <button name='searchButton' onClick={props.submitSearch}>
                        <i id='search' className="fa fa-search"></i>
                    </button>
                </div>
            </div>
            <nav>
                <Link to="/cart">Cart ({props.cartSize})</Link>
                {props.isLoggedIn?<a onClick={props.handleLogout}>Logout</a>:<Link to="/auth/login">Login</Link>}
                {props.isLoggedIn?<Link to="/account">Account</Link>:<Link to="/auth/signup">Signup</Link>}
            </nav>
        
         </div>
    );
}

const mapState = (state) => ({
    isLoggedIn: !!state.user.id,
    cartSize: getCartSize(state.cart)
})

const mapDispatch = (dispatch) => ({
    handleLogout: ()=>dispatch(logout())
});

const getCartSize = cart => {
    let total = 0;
    console.log("get cart size", cart);
    Object.keys(cart).forEach (key => {
        console.log("qty for each",cart[key], cart[key].quantity)
        total += +(cart[key].quantity);
    });
    return total;
}

export default connect (mapState, mapDispatch) (Topbar);