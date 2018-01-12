import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form'
import {connect} from 'react-redux';
import {addToCart} from '../store';
//import Review from './review'
function Product (props) {
  console.log("product props",props)
  const id = props.id || props.match.params.id
  const singleProduct = props.match.params.id != undefined;
  const product = props.products[id];
  if (!product || product.inventoryQty === 0) return null;
  return (
    <form onSubmit={props.addToCart}>
    <li>
      <div>
      {
        // Shows image to display for grid link
      }
        <input type='hidden' name='id' value={product.id} />
        <NavLink to={`/products/${product.id}`}>
          <img src={product.photo} alt="image" width="100" height="100"/>
          <h2>{ product.title }</h2>
        </NavLink>
        <h4>Description: { product.description }</h4>
        <h4>Price: { product.price/100 }</h4>
        {singleProduct?getSelect ("qty", product.inventoryQty):
        <h4>Inventory Remaining: { product.inventoryQty }</h4>}
        <div>
          <label htmlFor="size">Product Size</label>
          { // react-redux-forms scaffolding for choosing a size
          // <Field name="size" component="select" >
          //   <option value={ product.size }>Current size is: { product.size }</option>
          //   <option value="1lb">1lb</option>
          //   <option value="5lb">5lb</option>
          //   <option value="10lb">10lb</option>
          //   <option value="20lb">20lb</option>
          // </Field>
          }
        </div>
        <div>
          <label htmlFor="origin">Product Origin</label>
          { // react-redux-forms scaffolding for choosing a origin
          // <Field name="origin" component="select" >
          //   <option value={ product.origin }>Current origin is: { product.origin }</option>
          //   <option value="New York">New York</option>
          //   <option value="Oregon">Oregon</option>
          //   <option value="California">California</option>
          //   <option value="Montana">Montana</option>
          //   <option value="Colorado">Colorado</option>
          //   <option value="Maine">Maine</option>
          //   <option value="Utah">Utah</option>
          // </Field>
          }
        </div>
      </div>
      {
        // how to get access to the reviews for a given product?
        // product.review
      }
    { 
      singleProduct ?
          <button type='submit' >Add To Cart </button>
          : <span/>
      //  <Review product={product} /> 
     
  }
    </li>
</form>
  );
}

const getSelect = (name, max) => {
  const arr = [];
  for (let i = 1; i<max; i++) {
    arr.push(<option value={i} key={i}>{i}</option>)
  }
  // return (
  //   <Field name={name} component="select" >
  //     {arr}
  //   </Field>
  // );
  return (
    <select name={name}>
      {arr}
    </select>
  );
}

const mapState = state=> {
  return {
    products: state.products,
    isAdmin: state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    addLineItem: (lineItem) => {
      dispatch(addToCart(lineItem))
    }
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
      const prods = state.products
      const lineItem = {quantity: e.target.qty.value, product: prods[prodId]}
      actions.addLineItem(lineItem)
    }
  }
}

export default withRouter (connect(mapState, mapDispatch, merge)(Product));