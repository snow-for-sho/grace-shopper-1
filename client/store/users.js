import axios from 'axios';

const GET_USERS = 'GET_USERS';
const MAKE_ADMIN = 'MAKE_ADMIN';
const DELETE_USER = 'DELETE_USER';

export function getUsers (users) {
    return {type: GET_USERS, users}
}

export function makeAdmin (userId) {
  return {type: MAKE_ADMIN, userId}
}

export function deleteUser (userId) {
  return {type: DELETE_USER, userId}
}

// thunks:

export const fetchUsers = () => dispatch => {
    axios.get(`/api/users/`)
    .then(res => res.data)
    .then(users => {
        dispatch(getUsers(users))
    })
    .catch(console.log);
}
export const makeAdminThunk = (id) => dispatch => {

  axios.put(`/api/users/`, {id})
  .then(res => res.data)
  .then(user => {
      dispatch(fetchUsers())
  })
  .catch(console.log);
}

export function deleteUserThunk (userId) {
  return dispatch => {
    axios.delete(`/api/users/${userId}`)
    .then(res => res.data)
    .then(() => dispatch(fetchUsers()))
    .catch(console.log);
  }
}

export default function userReducer (state = [], action) {
    switch (action.type) {
      case GET_USERS:
        return action.users;
      case MAKE_ADMIN:
        return [...state, action.userId];
      case DELETE_USER:
        return [...state, action.userId];
      default: return state;
    }
}
