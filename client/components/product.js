import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form'
import {connect} from 'react-redux';
import {addToCart} from '../store';
import ReviewList from './ReviewList'
import { Link } from 'react-router-dom';

function Product (props) {
  //console.log('props', props.products)
  let product, singleProduct=false;
  if (!props.item) {
    console.log("Single Product", props.match.params.id);
    singleProduct = true;
    product = props.products.find(product=>product.id === +props.match.params.id)
  //  console.log('filtered product', product)
  } else {
    product = props.item;
  }
  //console.log('gotProduct', product)
  if (!product) {
    return null;
  }

  const shouldDisplay = singleProduct && product.inventoryQty > 0

  return (
    <form onSubmit={props.addToCart}>
    {console.log(product.photo)}
  
      <div 
        className="card card-raised card-background" 
        style={{ backgroundImage: `url(${product.photo})`, height: '400px', width: '400px' }}>
      
        <div className="card-content">
      {
        // Shows image to display for grid link
      }
        <input type='hidden' name='id' value={product.id} />
        <Link to={`/products/${product.id}`}>
          {
            // <img src={product.photo} alt="image" width="100" height="100"/>
          }
          <h2>{ product.title }</h2>
        </Link>
        <p className="card-description">
          Description: { product.description < 50 ? product.description : product.description.slice(0,50) + '...'}
        </p>
        <h6>Price: { product.price/100 }</h6>
        {shouldDisplay?getSelect ("qty", product.inventoryQty):
        <h6>Inventory Remaining: { product.inventoryQty }</h6>}
        {
          !shouldDisplay ?  <h6>See {product.reviews.length} Reviews</h6> :<ReviewList selectedProduct={product}/>
        }
        {
      //  <Link className ="btn btn-primary btn-round" to={`/products/${product.id}`}>
      //    View Snow Item
      //  </Link>
        }
       { //<div>
        //  <label htmlFor="size">Product Size</label>
           // react-redux-forms scaffolding for choosing a size
          // <Field name="size" component="select" >
          //   <option value={ product.size }>Current size is: { product.size }</option>
          //   <option value="1lb">1lb</option>
          //   <option value="5lb">5lb</option>
          //   <option value="10lb">10lb</option>
          //   <option value="20lb">20lb</option>
          // </Field>
          
       // </div>
      //  <div>
     //     <label htmlFor="origin">Product Origin</label>
           // react-redux-forms scaffolding for choosing a origin
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
          
       // </div>
       }
        </div>
      </div>
      {
        // how to get access to the reviews for a given product?
        // product.review
      }
    { 
      singleProduct && product.inventoryQty?
          <button type='submit' class="btn btn-primary btn-raised">Add To Cart </button>
          : <span/>
      //  <Review product={product} /> 
     
  }
   
</form>
  );
}

const getSelect = (name, max) => {
  const arr = [];
  for (let i = 1; i<=max; i++) {
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
      //console.log('product id', prodId)
      const prods = state.products
      const lineItem = {quantity: e.target.qty.value, product: prods.find(prod=>prod.id===prodId)}
      actions.addLineItem(lineItem)
    }
  }
}

export default withRouter (connect(mapState, mapDispatch, merge)(Product));
