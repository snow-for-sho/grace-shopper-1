import axios from 'axios';
const GET_ORDER = 'GET_ORDER';
const TRACK_ORDER = 'TRACK_ORDER';

export function getOrder (order) {
    return {type: GET_ORDER, order}
}

function trackOrder(order) {
    return {type: TRACK_ORDER, order}
}

export const findOrder = (orderId, email) => dispatch => {
    axios.get(`/api/orders/${orderId}/?email=${email}`)
    .then (res => res.data) 
    .then (order => {
        console.log("got order", order);
        dispatch(trackOrder(order))
    })
    .catch (console.log);
}


export const fetchOrder = orderId => dispatch => {
    console.log("fetching order", orderId)
    axios.get(`/api/orders/${orderId}`)
    .then (res => res.data) 
    .then (order => {
        console.log("got order", order);
        dispatch(getOrder(order))
    })
    .catch (console.log);
}

export default function order (state = {}, action) {
    switch (action.type) {
        case GET_ORDER:
            return action.order;
        case TRACK_ORDER:
            return action.order
        default: return state;
    }
}