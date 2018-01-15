import axios from 'axios';

// Action Types
const GET_PRODUCTS = 'GET_PRODUCTS';
const UPDATE_PRODUCT_QTY = 'UPDATE_PRODUCT_QTY';

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

// Thunk Creators
export const fetchProducts = (title) => dispatch => {
  const url = title?`/api/products/?title=${title}`:'/api/products'
  axios.get(url)
    .then(res => {
      dispatch(getProducts(res.data));
    })
    .catch(err => console.error(err));
  }

// REDUCER
export default function (state = [], action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products;
    case UPDATE_PRODUCT_QTY: {
      console.log("action.id", action.prodId)
      const newArr = [...state];
      const prodIdx = newArr.findIndex(product => product.id === +action.prodId);
      console.log('inReducer1',prodIdx, newArr, action.qtyUsed, newArr[prodIdx])
      newArr[prodIdx].inventoryQty += +action.qtyUsed;
     //s console.log('inReducer2',newArr, newArr[prodIdx].inventoryQty)
      return newArr;
    }
    default: return state;
  }
}
