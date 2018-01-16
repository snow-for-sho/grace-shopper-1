import axios from 'axios';

// Action Types
const GET_PRODUCTS = 'GET_PRODUCTS';
const UPDATE_PRODUCT_QTY = 'UPDATE_PRODUCT_QTY';
const ADD_REVIEW_TO_PRODUCT = 'ADD_REVIEW_TO_PRODUCT';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

// Initial State

const defaultProducts = [];

// Action Creators 

const getProducts = products => ({ type: GET_PRODUCTS, products });
export const updateProductQty = (prodId, qtyUsed) => {
  return {
    type: UPDATE_PRODUCT_QTY,
    prodId, qtyUsed
  }
}
export const updateProduct = (updateObj, history) => dispatch => {
  axios.put (`/api/products/${updateObj.id}`, updateObj)
  .then (res => res.data)
  .then (product => {
    dispatch (fetchProducts())
    history.push('/admin/products');
  })
}

export const addReviewToProduct = review => {
  //console.log("dispatching add review to product")
  return {type: ADD_REVIEW_TO_PRODUCT, review}
}
// Thunk Creators
export const fetchProducts = (title) => dispatch => {
  const url = title?`/api/products/?title=${title}`:'/api/products'
 // console.log("getting products", url)
  axios.get(url)
    .then (res=>res.data)
    .then(res => {
     // console.log("got products", res)
      dispatch(getProducts(res));
    })
    .catch(err => console.error(err));
  }

// REDUCER
export default function (state = [], action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products;
    case UPDATE_PRODUCT_QTY: 
      //console.log("action.id", action.prodId)
      const newArr = [...state];
      const prodIdx = newArr.findIndex(product => product.id === +action.prodId);
      //console.log('inReducer1',prodIdx, newArr, action.qtyUsed, newArr[prodIdx])
      newArr[prodIdx].inventoryQty += +action.qtyUsed;
     //s console.log('inReducer2',newArr, newArr[prodIdx].inventoryQty)
      return newArr;
    case ADD_REVIEW_TO_PRODUCT: 
      //console.log("ADding review to products2")
      const products = [...state];
      const idx = products.findIndex(product => product.id === +action.review.productId);
      products[idx].reviews.push(action.review)
      return products;
    default: return state;
  }
}
