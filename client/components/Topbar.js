import React from 'react';
import { Link } from 'react-router-dom';
import {logout} from '../store';
import {connect} from 'react-redux';
import {fetchProducts} from '../store';

const Topbar = props => {
  return (
    <nav
    className="navbar navbar-default navbar-transparent navbar-color-on-scroll"
    id="sectionsNav"
  >
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

      <div className="collapse navbar-collapse">
        <ul className="nav navbar-nav navbar-center">
          <form onSubmit={props.submitSearch}>
            <div className="form-group label-floating">
              <label className="control-label">search...</label>
              <input type='text' name='search' className="form-control"/>
            </div>
            <button 
              name='submit' 
              className="btn btn-white btn-raised btn-fab btn-fab-mini">
            <i 
              id='search' 
              className="material-icons">search</i>
            </button>
          </form>
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li>
            <Link to="/products">Products
              <i className="material-icons">apps</i>
            </Link>
          </li>
          <li> 
            {props.isLoggedIn?<a onClick={props.handleLogout}>Logout</a>:<Link to="/login">Login
              <i className="material-icons">apps</i>  
            </Link>}
          </li>
          <li>
            {props.isLoggedIn?<Link to="/account">
              <i className="material-icons">view_carousel</i>Account</Link>:<Link to="/signup">
              <i className="material-icons">assignment</i>Signup
              </Link>
            }
          </li>
          <li> 
           {!props.isLoggedIn?<Link to='/trackorder'>Track Order</Link>:<span/>}
          </li>
          <li>
          {props.isAdmin ? <Link to="/admin">Admin Dashboard</Link> : <span />}
          </li>


          <Link to={'/cart'}>
            <button className="btn btn-white pull-right"><i className="material-icons">shopping_cart</i>Cart ({props.cartSize})
            </button>
          </Link>
        </ul>
      </div>
    </div>
  </nav>

  );
};
const mapState = (state) => ({
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.isAdmin,
    cartSize: getCartSize(state.cart)
});

const mapDispatch = (dispatch) => ({
    handleLogout: ()=>dispatch(logout()),
    submitSearch: (e) => {
        e.preventDefault();
        dispatch(fetchProducts(e.target.search.value));
    }
});

const getCartSize = cart => {
    let total = 0;
    //console.log("get cart size", cart.items);
    if (cart.items)
        Object.keys(cart.items).forEach (key => {
         //console.log("qty for each",cart.items[key], cart.items[key].quantity)
            total += +(cart.items[key].quantity);
        });
    return total;
};

export default connect (mapState, mapDispatch) (Topbar);
