import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout, setCurrentCategory, setCurrentProduct} from '../store'
import Product from './Product';
import Category from './Category';

class GridList extends Component {
  constructor (props) {
    super (props);
  }

  componentDidMount () {
    // if (this.props.match && this.props.match.params.id) {
    //   this.props.loadGrid(this.props.match.params.id)
    // } else {
    //   this.props.loadGrid();
    // }
  }

  render () {
    let items;
    //filter for admin view - only admin can see items with 0 quantity
    console.log("items", this.props)
    if (this.props.isAdmin || this.props.type==='Category') {
      items = this.props.items;
    } else {
      items = this.props.items.filter(item=>item.inventoryQty>0);
    }
    

    console.log("Items in GridList", items);
    return (
      <div id ="main">
        {
          this.props.type==='ProdInCat'?<div>Products in Category: {this.props.title} </div>:""
        }
          <div className="row">
            { 
              items.map(item => 
                <div key={item.id} className="col-xs-4">
          
                {
                  this.props.type !== 'Category'? <Product item={item} />:<Category category={item} />
                }
                  
                </div>
              )
            }
          </div>
        </div>
    )
  }

}
const mapStateProd = (state, ownProps) => {
  return {
    items: state.products,
    type: 'Product',
    isAdmin: state.user.isAdmin
  }
}

const mapStateCat = (state, ownProps) => {
  return {
    items: state.categories,
    type: 'Category',
    isAdmin: state.user.isAdmin
  }
}

const mapStateProdCat = (state, ownProps) => {
  //console.log("Own props.match",ownProps.match, state.categories)
  const id = ownProps.match.params.id;
  const filteredByCat = state.categories.find(cat=>cat.id === +id);
  return {
    items: filteredByCat?filteredByCat.products:[],
    type: 'ProdInCat',
    isAdmin: state.user.isAdmin,
    title: filteredByCat?filteredByCat.title:''
  }
}

// const mapDispatchProd = dispatch => {
//   return {
//     loadGrid: () => dispatch(loadProducts())
//   }
// }

// const mapDispatchCat = dispatch => {
//   return {
//     loadGrid: (catId) => dispatch(loadCategories(cat))
//   }
// }
export const LoadProducts = connect(mapStateProd)(GridList)
export const LoadCategories = connect(mapStateCat)(GridList)
export const LoadProductsInCategory = connect (mapStateProdCat)(GridList)
