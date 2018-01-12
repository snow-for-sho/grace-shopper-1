import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter, Link, Switch, Route, Redirect} from 'react-router-dom';
import {logout} from '../store';
import Topbar from './Topbar';
import Order from './Order';
import LoginSignup from './LoginSignup';

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Main = (props) => {
  const {children, handleClick, isLoggedIn} = props
 console.log("main - logged in", isLoggedIn)
  return (
    <div>
      <Topbar/>
      <main>
        <Switch>
            <Route exact path="/" />
            <Route exact path="/cart" render={(props) => <Order type="IN_CART" {...props}/>} />     
            <Route path="/auth" render={(props) => <LoginSignup action='Login'/>} />       
            <Redirect to="/" />
        </Switch>
    </main>
    </div>
  )
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
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
