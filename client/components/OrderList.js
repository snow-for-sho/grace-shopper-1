import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {fetchOrders} from '../store';
import {connect} from 'react-redux';

class OrderListMain extends Component {
    constructor (props) {
        super (props)
    }

    componentDidMount () {
        if (this.state.admin)
           this.props.loadOrders(this.state.admin);
    }

    render () {
        console.log("user id", this.props.user, "orders", this.props.orders);
        if (this.props.user) {
            return (
                <div>
                    <div> Orders for {this.props.user.email}</div>
                    {
                        this.listOrders()
                    }
                </div>
            );
        } else return <div>Must have an account to view orders</div>;
    }

    listOrders() {
        if (!this.props.orders.length) return <div>No orders found</div>
        return (
            <table className='table table-bordered'>
                <thead><tr><td align='center'>Order ID</td><td align='center'>Status</td><td align='center'>Date</td></tr></thead>
                <tbody>
                {   
                    this.props.orders.map (order => 
                        <tr key={order.id}>
                            <td align='center'><Link to={`/orders/${order.id}`} key={order.id}>{order.id}</Link></td>
                            <td align='center'>{order.status}</td>
                            <td align='center'>{order.createdAt}</td>
                        </tr>
                    )
                }
                </tbody>
            </table>
        )
    }
}

const mapState = state => ({
    orders:state.orders,
    user: state.user
})

const mapStateAdmin = state=> ({
    orders:state.orders,
    user: state.user,
    admin: true
})
 const mapDispatch = dispatch => ({
     loadOrders: () => dispatch(fetchOrders (true))
 })

export const OrderList = connect (mapState)(OrderListMain);
export const OrderListAdmin = connect (mapStateAdmin, mapDispatch)(OrderListMain)