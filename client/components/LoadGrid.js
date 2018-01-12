import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout} from '../store'
import Product from './product';
import Category from './category';

const GridList = props => {
  const items = props.items
  const type = props.type;
  console.log(items);
  return (
    <div id ="main">
      <div className="col-xs-10">
        <div className="row">
          { 
            items.map(item => 
              <div key={item.id} className="col-xs-4">
              {
                type === 'Product'?<Product product={item}/>:<Category category={item} />
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

export const LoadProducts = connect(mapStateProd)(GridList)
export const LoadCategories = connect(mapStateCat)(GridList)