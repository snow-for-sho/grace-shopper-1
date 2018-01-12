import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout} from '../store'

const ProductList = props => {
  allProducts = props.products

  return (
    <div id ="main">
      <div className="col-xs-10">
        <div className="row">
          { 
            allProducts.map(product => {
              return ( 
              <div className "col-xs-4" key={product.id}>
                <Product product={product} key={product.id} className="product-item" />
            }
              )
          }
        </div>
      </div>
    </div>  
  )
}

const mapState(state, ownProps) => {
  return {
    products: state.product
  }
}

export default connect(mapState)(ProductList)