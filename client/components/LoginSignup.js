import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
const LoginSignup = (props) => {

  return (
<<<<<<< HEAD
    <div 
      className="page-header header-filter" 
      style={{backgroundImage: "url('/assets/img/snowbackground.jpg')", 
        backgroundSize: 'cover', 
        backgroundPosition: 'top center'}}>
		<div className="container">
			<div className="row">
				<div className="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3">
					<div className="card card-signup">
						<form className="form" onSubmit={props.handleSubmit} name={props.action === 'Login' ? 'login' : 'signup'}>
							<div className="header header-primary text-center" style={{display: "block"}}>
								<div className="social-line">
									<a href="auth/facebook" className="btn btn-just-icon btn-simple">
										<i className="fa fa-facebook-square"></i>
									</a>
									<a href="/auth/google" className="btn btn-just-icon btn-simple">
										<i className="fa fa-google-plus"></i>
									</a>
								</div>
							</div>
							<p className="description text-center">Or</p>
							<div className="content">


								<div className="input-group">
									<span className="input-group-addon">
										<i className="material-icons">email</i>
									</span>
									<input type="text" className="form-control" name="email" placeholder="Email..." />
								</div>

								<div className="input-group">
									<span className="input-group-addon">
										<i className="material-icons">lock_outline</i>
									</span>
									<input type="password" placeholder="Password..." name="password" className="form-control" />
								</div>

							</div>
							<div className="footer text-center" style={{display: "block"}}>
								<button type="submit" className="btn btn-default">Get Started</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
  </div>
=======
    <div>
      <form onSubmit={props.handleSubmit} name={props.action === 'Login' ? 'login' : 'signup'}>
        <div>
          <label htmlFor="email"><small>Email</small></label>
          <input name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password"><small>Password</small></label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">{props.action==='Login'?'Login':'Signup'}</button>
        </div>
      </form>
      <a href="/auth/google">Use  Google</a> &nbsp;&nbsp;
      <a href="/auth/facebook">Use Facebook </a>
    </div>
>>>>>>> master
  )
}
//     <div>
//       <form onSubmit={props.handleSubmit} name='Login/Signup'>
//         <div>
//           <label htmlFor="email"><small>Email</small></label>
//           <input name="email" type="text" />
//         </div>
//         <div>
//           <label htmlFor="password"><small>Password</small></label>
//           <input name="password" type="password" />
//         </div>
//         <div>
//           <button type="submit">{props.action==='Login'?'Login':'Signup'}</button>
//         </div>
//       </form>
//       <a href="/auth/google">Use  Google</a> &nbsp;&nbsp;
//       <a href="/auth/facebook">Use Facebook </a>
//     </div>
//   )
// }

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapState = (state) => ({})

const mapDispatch = (dispatch) => {
  return {
    handleSubmit (evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export default connect(mapState, mapDispatch)(LoginSignup)


