import React from 'react';
import { Link } from 'react-router-dom';
import {logout} from '../store';
import {connect} from 'react-redux';
import {fetchProducts} from '../store'

const Topbar = props => {
    return (

        <nav
        className="navbar navbar-default navbar-transparent navbar-fixed-top navbar-color-on-scroll"
        id="sectionsNav">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <Link className="navbar-brand" to="/">
              Snow Fo Sho
            </Link>
          </div>
        </div>

         <div className='topbar'>
             <nav>
                 <Link to="/">Home</Link>
                 <Link to="/categories">Categories</Link>
                 <Link to="/products">Products</Link>
             </nav>
            <div>
                <div><h3>Snow Fo Sho</h3></div>
                <div>
                <form className="navbar-form navbar-right" 
                  onSubmit={props.submitSearch}>
                    <input type='text' name='search' placeholder='search...'/>
                    <button name='submit'>
                        <i id='search' className="material-icons">search</i>
                    </button>
                </form>
                </div>
            </div>
            <nav>
                <Link to="/cart">Cart ({props.cartSize})</Link>
                {props.isLoggedIn?<a onClick={props.handleLogout}>Logout</a>:<Link to="/login">Login</Link>}
                {props.isLoggedIn?<Link to="/account">Account</Link>:<Link to="/signup">Signup</Link>}
                {!props.isLoggedIn?<Link to='/trackorder'>Track Order</Link>:<span/>}
            </nav>

         </div>
    );
}

{
// const mapState = (state) => ({
//     isLoggedIn: !!state.user.id,
//     cartSize: getCartSize(state.cart)
// })
}
const mapDispatch = (dispatch) => ({
    handleLogout: ()=>dispatch(logout()),
    submitSearch: (e) => {
        e.preventDefault()
        dispatch(fetchProducts(e.target.search.value))
    }
});

const getCartSize = cart => {
    let total = 0;
    console.log("get cart size", cart.items);
    if (cart.items)
        Object.keys(cart.items).forEach (key => {
         console.log("qty for each",cart.items[key], cart.items[key].quantity)
            total += +(cart.items[key].quantity);
        });
    return total;
}

export default connect (mapState, mapDispatch) (Topbar);
