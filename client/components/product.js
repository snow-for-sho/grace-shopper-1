import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
// import { Field, reduxForm } from 'redux-form'
import Review from './review'

export default function Product (props) {

  const product = props.product || [];

  return (
    <li>
      <div>
      {
        // Shows image to display for grid link
      }
        <a href="#">
          <img src={product.photo} alt="image" />
        </a>
      </div>
      <div>
        <NavLink to={`/product/${product.id}`}>
          <h2>{ product.title }</h2>
        </NavLink>
        <h4>Description: { product.description }</h4>
        <h4>Price: { product.price }</h4>
        <h4>Inventory Remaining: { product.inventoryQty }</h4>
        <div>
          <label htmlFor="size">Product Size</label>
          { // react-redux-forms scaffolding for choosing a size
          <Field name="size" component="select" >
            <option value={ product.size }>Current size is: { product.size }</option>
            <option value="1lb">1lb</option>
            <option value="5lb">5lb</option>
            <option value="10lb">10lb</option>
            <option value="20lb">20lb</option>
          </Field>
          }
        </div>
        <div>
          <label htmlFor="origin">Product Origin</label>
          { // react-redux-forms scaffolding for choosing a origin
          <Field name="origin" component="select" >
            <option value={ product.origin }>Current origin is: { product.origin }</option>
            <option value="New York">New York</option>
            <option value="Oregon">Oregon</option>
            <option value="California">California</option>
            <option value="Montana">Montana</option>
            <option value="Colorado">Colorado</option>
            <option value="Maine">Maine</option>
            <option value="Utah">Utah</option>
          </Field>
          }
        </div>
      </div>
      {
        // how to get access to the reviews for a given product?
        // product.review
      }
      <Review product={product} />
    </li>

  );
}
