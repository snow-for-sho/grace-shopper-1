import axios from 'axios';
const GET_ADMIN_ORDERS = 'GET_ADMIN_ORDERS';
const ORDER_STATUS_UPDATED = 'ORDER_STATUS_UPDATED';
const CLEAR_ADMIN_ORDERS = 'CLEAR_ADMIN_ORDERS';

export function getAdminOrders (orders) {
    return {type: GET_ADMIN_ORDERS, orders}
}

function orderStatusUpdated (order) {
    return {type: ORDER_STATUS_UPDATED, order}
}

export function clearAdminOrders () {
    return {type: CLEAR_ADMIN_ORDERS}
}
export const fetchAdminOrders = () => dispatch => {
   // console.log("FETCH ADMIN ORDERS TRIGERRED");
    axios.get('/api/orders/?admin=true')
    .then (res => res.data) 
    .then (orders => {
        //console.log("got orders", orders);
        dispatch(getAdminOrders(orders))
    })
    .catch (console.log);
}

export const updateOrderStatus = (orderId, status) => dispatch => {
    axios.put (`/api/orders/${orderId}`, {status})
    .then (order => {
        dispatch (orderStatusUpdated (order))
    })
    .catch (console.log);
}

export default function adminOrders (state = [], action) {
    switch (action.type) {
        case GET_ADMIN_ORDERS:
            return action.orders;
        case CLEAR_ADMIN_ORDERS:
            return [];
        default: return state;
    }
}