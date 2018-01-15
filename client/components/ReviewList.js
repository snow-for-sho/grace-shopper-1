import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import { setCurrentProduct} from '../store'
import Review from './Review'

const LoadReviews = props => {
  const products = this.state.products || [];
  console.log('review list log: ')
  return (
    <div id ="main">
      <div className="col-xs-10">
        <div className="row">
          {
            products.map(product =>
              <div key={product.id} className="col-xs-4">
              {
                product.reviews.map(review =>
                  <div key={review.id} className="col-xs-4">
                  {
                  // <NavLink to={`/reviews/${review.id}`}>
                    <Review review={ review }/>
                  // </NavLink>
                  }
                  </div>
                )
              }
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

const mapStateProd = (state, ownProps) => {
  return {
    items: state.products,
    type: 'Product'
  }
}

const mapDispatchProd = dispatch => {
  return {
    setCurrentProduct: (prod) => dispatch(setCurrentProduct(prod))
  }
}

export const ReviewList = connect(mapStateProd, mapDispatchProd)(LoadReviews)

