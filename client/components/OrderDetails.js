import React, { Component } from 'react';
//import LineItem from './LineItem';
import {connect} from 'react-redux';
import {Order} from './CartOrder';
import { Link } from 'react-router-dom';
import {fetchAdminOrders} from '../store';

class OrderDetails extends Component {
    constructor (props) {
        super (props);
    }

    componentDidMount () {
        //const orderId = this.props.match.params.id;
        //console.log(orderId, this.props);
        //this.props.loadOrder(orderId);
        if (this.props.admin) {
            console.log("THIS IS ADMIN")
            this.props.loadOrders();
        }
           else {
               console.log("NOT ADMIN");
           }
    }

    render () {
        console.log("got order", this.props)
        const order = this.props.order ;
        console.log("order", order)
        if (order)
            return (
                <div>
                    <table className='table table-bordered'>
                        <thead>
                            <tr><td colSpan ='8' align='center'>Order Details</td></tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td align='center'> Order Number </td>
                                <td align='center'> CreatedAt </td>
                                <td align='center'> Order Status </td>
                                <td align='center'>Recipient Name: </td>
                                <td align='center'>Recipient Email: </td>
                                <td align='center'>Recipient Phone: </td>
                                <td align='center'>Recipient Address: </td>
                                <td align='center'>Payment Method: </td>
                            </tr>
                            <tr>
                                <td align='center'>{order.id}</td>
                                <td align='center'>{order.createdAt}</td>
                                <td align='center'>{order.status}</td>
                                <td align='center'>{order.name}</td>
                                <td align='center'>{order.email}</td>
                                <td align='center'>{order.phone}</td>
                                <td align='center'>{order.address}</td>
                                <td align='center'>{order.paymentType}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div>
                    {
                        this.props.tracked || this.props.admin?<Order trackedOrder={order}/>:<Order id={order.id}/>
                    }
                        </div>
                </div>
            );
        return this.props.userId?<div>Order Not Found: {this.props.match.params.id}</div>:<div>Must be logged in to see orders</div>;
    }
}

const mapStateToProps = (state, ownProps) => {
    let order = null;
    console.log("own props", ownProps);
    let tracked = false;
    if (ownProps.trackedOrder) {
        order = ownProps.trackedOrder
        tracked= true
    }
    else if (state.orders) {
        order = state.orders.find(order=>order.id===+ownProps.match.params.id)
    }
    return {
        order: order,
        userId: state.user.id,
        tracked: tracked
    }
};

const mapAdminStateToProps = (state, ownProps) => {
    console.log('state', state)
    const stateObj = {
        order: state.adminOrders.find(order => order.id === +ownProps.match.params.adminOrderId),
        userId: state.user.id,
        admin: state.user.isAdmin
        }

    console.log("state obj",stateObj)
    return  stateObj;

}

const mapDispatchToProps = dispatch => ({
    //loadOrder: id => dispatch (fetchOrder(id))
    loadOrders: () => dispatch(fetchAdminOrders ()),
})

export default connect (mapStateToProps) (OrderDetails);
export const OrderDetailsAdmin = connect (mapAdminStateToProps, mapDispatchToProps) (OrderDetails);