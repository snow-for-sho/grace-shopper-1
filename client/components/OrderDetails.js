import React, { Component } from 'react';
//import LineItem from './LineItem';
import {connect} from 'react-redux';
import {Order} from './CartOrder';
import { Link } from 'react-router-dom';
import {fetchOrder} from '../store';

class OrderDetails extends Component {
    constructor (props) {
        super (props);
    }

    componentDidMount () {
        //const orderId = this.props.match.params.id;
        //console.log(orderId, this.props);
        //this.props.loadOrder(orderId);
    }

    render () {
        console.log("got order", this.props)
        const order = this.props.order;
        if (order)
            return (
                <div>
                    <table className='table table-bordered'>
                        <thead>
                            <tr><td colSpan ='7' align='center'>Order Details</td></tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td align='center'> Order Number </td>
                                <td align='center'> Order Status </td>
                                <td align='center'>Recipient Name: </td>
                                <td align='center'>Recipient Email: </td>
                                <td align='center'>Recipient Phone: </td>
                                <td align='center'>Recipient Address: </td>
                                <td align='center'>Payment Method: </td>
                            </tr>
                            <tr>
                                <td align='center'>{order.id}</td>
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
                        <Order id={order.id}/>
                    }
                       { 
                           //<Order trackedOrder={order}/> 
                }
                        </div>
                </div>
            );
        return this.props.userId?<div>Order Not Found: {this.props.match.params.id}</div>:<div>Must be logged in to see orders</div>;
    }
}

const mapStateToProps = (state, ownProps) => {
    let order = null;
    if (state.orders) {
        order = state.orders.find(order=>order.id===+ownProps.match.params.id)
    }
    return {
        order: order,
        userId: state.user.id
    }
};

const mapDispatchToProps = dispatch => ({
    //loadOrder: id => dispatch (fetchOrder(id))
})

export default connect (mapStateToProps, mapDispatchToProps) (OrderDetails);