import React, {Component} from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import {connect} from 'react-redux';
import {addToCart, fetchProducts } from '../store';
import ReviewList from './ReviewList';
import ReactStars from 'react-stars';
import AddReview from './AddReview';

class Product extends Component {
  constructor (props) {
    super (props);
  }

  componentDidMount () {
    //this.props.loadProduct()
  }

  render () {
  //console.log('props', props.products)
    let product, singleProduct=false;
    if (!this.props.item) {
      singleProduct = true;
      product = this.props.products.find(product=>product.id === +this.props.match.params.id)
    //  console.log('filtered product', product)
    } else {
      product = this.props.item;
    }
    //console.log('gotProduct', product)
    if (!product) {
      return null;
    }

    const shouldDisplay = singleProduct && product.inventoryQty > 0

    return (
      
    
        <div className="product">
          <form onSubmit={this.props.addToCart}>
            <input type='hidden' name='id' value={product.id} />
            <NavLink to={`/products/${product.id}`}>
              <img src={product.photo} alt="image" width="100" height="100"/>
              <h2>{ product.title }</h2>
            </NavLink>

          {
            !shouldDisplay ?  <div className="stars">{this.renderAverageReivew(product.id)}<div> {product.reviews.length} Review{product.reviews.length!==1?'s':''}</div></div> :<span/>
          }
            <h4>Description: { product.description }</h4>
            <h4>Price: ${ product.price/100 }</h4>
            {shouldDisplay?this.getSelect ("qty", product.inventoryQty):
            product.inventoryQty?<h4>Inventory Remaining: { product.inventoryQty }</h4>:<h4>Currenty Unavailable</h4>}
          { 
            shouldDisplay?<div><button type='submit' >Add To Cart </button></div>:<span/>
          }
          </form>
          { 
            shouldDisplay && this.props.isLoggedIn?<div><AddReview productId={product.id}/></div>: <span/> 
          }

          { 
            shouldDisplay ?<div><ReviewList selectedProduct={product}/></div>: <span/> 
          }

      </div>
    

    );
  }

  renderAverageReivew (productId) {
    const prod = this.props.products.find(prod=> prod.id ===productId);
    const aveStarRating = prod.reviews.length?prod.reviews.reduce((accum, rev) => {
      return accum+rev.numberOfStars
    }, 0)/prod.reviews.length:0;
    return <ReactStars
    count={5}
    size={17}
    color2={'#ffd700'} 
    half={true}
    edit={false}
    value={aveStarRating}
/>
    return this.renderStarRating (aveStarRating);
  }

  getSelect  (name, max) {
    const arr = [];
    for (let i = 1; i<=max; i++) {
      arr.push(<option value={i} key={i}>{i}</option>)
    }
    return (
      <select name={name}>
        {arr}
      </select>
    );
  }
}

const mapState = state=> {
  return {
    products: state.products,
    isAdmin: state.user.isAdmin,
    numberOfStars: state.review.starRating,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    addLineItem: (lineItem) => {
      dispatch(addToCart(lineItem))
    },
    loadProduct: () => dispatch(fetchProducts())
  }
}

const merge = (state, actions, ownProps) => {
  return {
    ...state,
    ...actions,
    ...ownProps,
    addToCart: (e) => {
      e.preventDefault();
      const prodId = +e.target.id.value;
      //console.log('product id', prodId)
      const prods = state.products
      const lineItem = {quantity: e.target.qty.value, product: prods.find(prod=>prod.id===prodId)}
      actions.addLineItem(lineItem)
    }
  }
}

export default withRouter (connect(mapState, mapDispatch, merge)(Product));
