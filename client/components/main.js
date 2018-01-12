import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter, Link, Switch, Route, Redirect} from 'react-router-dom';
import {logout} from '../store';
import Topbar from './Topbar';
import Order from './Order';
import LoginSignup from './LoginSignup';
import {LoadProducts, LoadCategories} from './LoadGrid';
import {fetchProducts, fetchCategories} from '../store';

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
    console.log("main - logged in", this.props.isLoggedIn)
      return (
        <div>
          <Topbar/>
          <main>
            <Switch>
                <Route exact path="/" component={LoadCategories} />
                <Route exact path="/cart" render={(props) => <Order type="IN_CART" {...props}/>} />     
                <Route path="/auth" render={(props) => <LoginSignup action='Login'/>} />     
                <Route path="/products" component={LoadProducts}  />
                <Route path="/categories" component={LoadCategories}  />
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
      //dispatch(fetch(Order)), etc
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))