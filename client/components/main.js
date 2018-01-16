import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter, Link, Switch, Route, Redirect} from 'react-router-dom';
import {logout} from '../store';
import Topbar from './Topbar';
import {Order, Cart} from './CartOrder';
import LoginSignup from './LoginSignup';
import Checkout from './Checkout';
import {LoadProducts, LoadCategories, LoadProductsInCategory} from './LoadGrid';
import {fetchProducts, fetchCategories, fetchCart, fetchOrders} from '../store';
import Product from './product';
import OrderDetails from './OrderDetails';
import OrderList from './OrderList';
import Account from './Account';
import TrackOrder from './TrackOrder';
import ReviewList from './ReviewList';
import Review from './Review';
import AdminDash from './AdminDash';

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
class Main extends Component {
  constructor (props) {
    super (props);
  }

  componentDidMount () {
    this.props.fetchData();
  }

  render () {
      return (
        <div>
          <Topbar/>
          <main>
            <Switch>
                <Route exact path="/" component={LoadCategories} />
                <Route exact path="/login" render={(props) => <LoginSignup action='Login'/>} />
                <Route exact path="/signup" render={(props) => <LoginSignup action='Signup'/>} />
                <Route exact path="/products" component={LoadProducts}  />
                <Route exact path="/checkout" component = {Checkout} />
                <Route exact path="/categories" component={LoadCategories}  />
                <Route exact path="/orders" component={OrderList} />
                <Route exact path="/account" component={Account} />
                <Route exact path="/cart" component = {Cart} />
                <Route exact path="/trackorder" component = {TrackOrder} />
                <Route exact path="/reviews" component={ReviewList} />
                {
                  // admin routes:
                }
                <Route exact path="/admin" component={AdminDash} />
                <Route exact path="/admin/orders" component={OrderList} />
                <Route exact path="/admin/categories" component={LoadCategories} />
                <Route exact path="/admin/products" component={LoadProducts} />
                <Route exact path="/admin/users" component={ReviewList} />
                {
                 // ___________________
                }
                <Route path="/products/:id" component={Product}  />
                <Route path="/categories/:id" component={LoadProductsInCategory} />
                <Route path="/orders/:id" component ={OrderDetails} />
                <Route path="/reviews/:id" component ={Review} />
                <Redirect to="/" />
            </Switch>
        </main>
        </div>
      )
    }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick () {
      dispatch(logout())
    },
    fetchData() {
      dispatch(fetchProducts())
      dispatch(fetchCategories())
      dispatch(fetchCart())
      dispatch(fetchOrders())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))
