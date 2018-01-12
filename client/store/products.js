import axios from 'axios';

// Action Types
const GET_PRODUCTS = 'GET_PRODUCTS';

// Initial State

const defaultProducts = [];

// Action Creators 

const getProducts = products => ({ type: GET_PRODUCTS, products });

// Thunk Creators

export const fetchProducts = () => dispatch =>
  axios.get('/api/products')
    .then(res => {
      dispatch(getProducts(res.data));
    })
    .catch(err => console.error(err));

// REDUCER
export default function (state = [], action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    default: return state;
  }
}
