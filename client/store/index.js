import {createStore, combineReducers, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './user';
import cart from './cart';
import products from './products';
import categories from './categories';
import orders from './orders';
import trackedOrder from './trackedOrder'
import review from './review'
//import cartMiddleware from './cartMiddleware';

const reducer = combineReducers({user, cart, products, categories,orders, trackedOrder, review})
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
export * from './orders';
export * from './trackedOrder';
export * from './review';
