import axios from 'axios';

// Action Types
const GET_CATEGORIES = 'GET_CATEGORIES';

// Action Creators 

const getCategories = categories => ({ type: GET_CATEGORIES, categories });

// Thunk Creators

export const fetchCategories = () => dispatch =>
  axios.get('/api/categories')
    .then(res => {
      dispatch(getCategories(res.data));
    })
    .catch(err => console.error(err));

// REDUCER
export default function (state = [], action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories
    default: return state;
  }
}
