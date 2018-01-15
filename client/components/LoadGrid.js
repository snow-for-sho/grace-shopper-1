import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout, setCurrentCategory, setCurrentProduct} from '../store'
import Product from './Product';
import Category from './Category';

const GridList = props => {
  const items = props.items
  const type = props.type;
  // console.log("Items in GridList", items);
  return (
    <div id ="main">
      <div className="col-xs-10">
        <div className="row">
          {
            items.map(item =>
              <div key={item.id} className="col-xs-4">
              {
                type === 'Product'?<Product id={item.id} />:<Category category={item} />
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

const mapStateCat = (state, ownProps) => {
  return {
    items: state.categories,
    type: 'Category'
  }
}

const mapDispatchProd = dispatch => {
  return {
    setCurrentProduct: (prod) => dispatch(setCurrentProduct(prod))
  }
}

const mapDispatchCat = dispatch => {
  return {
    setCurrentCategory: (cat) => dispatch(setCurrentCategory(cat))
  }
}
export const LoadProducts = connect(mapStateProd, mapDispatchProd)(GridList)
export const LoadCategories = connect(mapStateCat, mapDispatchCat)(GridList)
