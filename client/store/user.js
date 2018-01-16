import axios from 'axios'
import history from '../history'
import {fetchCart, fetchAdminOrders, clearAdminOrders} from './index'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const UPDATE_USER = 'UPDATE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {
  firstName: '',
  lastName: '',
  address: '',
  phone: '',
  isAdmin: false,
  email: '',
  name: ''
}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
export const updateUser = (fieldName, fieldValue) => ({type:UPDATE_USER, fieldName, fieldValue})

/**
 * THUNK CREATORS
 */
export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then(res =>{
        dispatch(getUser(res.data || defaultUser))
        dispatch(fetchCart())
        if (res.data.isAdmin) dispatch(fetchAdminOrders())
      }) 
      .catch(err => console.log(err))

export const auth = (email, password, method) =>
  dispatch =>
    axios.post(`/auth/${method}`, { email, password})
      .then(res => {
        dispatch(getUser(res.data))
        dispatch(fetchCart())
        if(res.data.isAdmin) dispatch(fetchAdminOrders())
        history.push('/')
      }, authError => { // rare example: a good use case for parallel (non-catch) error handler
        dispatch(getUser({error: authError}))
      })
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(_ => {
        dispatch(removeUser())
        dispatch(clearAdminOrders())
        history.push('/login')
      })
      .catch(err => console.log(err))

export const submitUserInfo = (userInfo, userId) => (dispatch) => {
  axios.put(`/api/users`, userInfo)
  .then (res => res.data)
  .then (res => {
    console.log ("USER UPDATED");
    dispatch (getUser(res));
  })
}

const populateUser = (user) => {
  Object.keys(user).forEach (key => {
    if (!user[key]) user[key] = ''
  })
  return user;
}
/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return populateUser (action.user);
    case REMOVE_USER:
      return defaultUser
    case UPDATE_USER:
      const newUser = {...state}
      newUser[action.fieldName] = action.fieldValue;
      return newUser
    default:
      return state
  }
}
