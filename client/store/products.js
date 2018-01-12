import axios from 'axois';

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

