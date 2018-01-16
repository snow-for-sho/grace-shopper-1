import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {fetchOrders} from '../store';
import {connect} from 'react-redux';

class OrderList extends Component {
    constructor (props) {
        super (props)
    }

    componentDidMount () {
      //  this.props.loadOrders();
    }

    render () {
        // console.log("user id", this.props.user, "orders", this.props.orders);
        if (this.props.user) {
            return (
                <div>
                    <div> Orders for {this.props.user.name}</div>
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

// const mapDispatch = dispatch => ({
//     loadOrders: () => dispatch(fetchOrders ())
// })

export default connect (mapState)(OrderList);
