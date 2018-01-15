import {createStore, combineReducers, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './user';
import cart from './cart';
import products from './products';
import categories from './categories';
import product from './product';
import category from './category';
import orders from './orders';
import trackedOrder from './trackedOrder'
//import cartMiddleware from './cartMiddleware';

const reducer = combineReducers({user, cart, products, categories, product, category, orders, trackedOrder})
const middleware = composeWithDevTools(applyMiddleware(
  //cartMiddleware,
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store;
export * from './user';
export * from './cart';
export * from './products';
export * from './categories';
export * from './category';
export * from './product';
export * from './orders';
export * from './trackedOrder'
