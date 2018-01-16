import axios from 'axios';
const GET_ORDERS = 'GET_ORDERS';

export function getOrders (orders) {
    return {type: GET_ORDERS, orders}
}

export const fetchOrders = (admin) => dispatch => {
    const url = admin?'/api/orders/admin=true':'api/orders';
    axios.get(`/api/orders/`)
    .then (res => res.data) 
    .then (orders => {
        //console.log("got orders", orders);
        dispatch(getOrders(orders))
    })
    .catch (console.log);
}

export default function order (state = [], action) {
    switch (action.type) {
        case GET_ORDERS:
            return action.orders;
        default: return state;
    }
}