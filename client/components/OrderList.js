import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {fetchAdminOrders, updateOrderStatus} from '../store';
import {connect} from 'react-redux';

class OrderListMain extends Component {
    constructor (props) {
        super (props);
        this.filterStatus=null;
        this.statuses=['IN_CART','CREATED', 'PROCESSING', 'SHIPPED', 'COMPLETED' ]
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.state = {
            status: 'ALL'
        }
    }

    componentDidMount () {
        if (this.props.admin)
           this.props.loadOrders();
    }

    render () {
        //console.log("user id", this.props.user, "orders", this.props.orders);
        if (this.props.user) {
            return (

                    <div>
                            <div> Orders for {this.props.admin?'ADMIN':this.props.user.email}</div>
                            {
                                this.listOrders()
                            }
                    </div>

            );
        } else return <div>Must have an account to view orders</div>;
    }

    listOrders() {
        let orders = this.props.orders;
        if (this.state.status && this.state.status !=='ALL') orders = orders.filter(order=> order.status === this.state.status);
        if (!this.props.orders.length) return <div>No orders found for status: {this.state.status}</div>
        return (
            <table className='table table-bordered'>

                <thead><tr><td align='center'>Order ID</td><td align='center'>Status {this.getFilterForm()}</td><td align='center'>Date</td></tr></thead>
                <tbody>
                {
                    orders.map (order =>
                        <tr key={order.id}>
                            <td align='center'>{this.props.admin?<Link to={`/admin/orders/${order.id}`} key={order.id}>{order.id}</Link>:<Link to={`/orders/${order.id}`} key={order.id}>{order.id}</Link>}</td>
                            <td align='center'>{this.props.admin?this.getSelectForm(order.id, order.status):order.status}</td>
                            <td align='center'>{order.createdAt}</td>
                        </tr>
                    )
                }
                <tr></tr>
                </tbody>

            </table>
        )
    }

    getSelectForm (id, status) {

        return (
        <form key={id} onSubmit={this.props.updateOrderStatus}>
            {id?<input type='hidden' name='orderId' value={id} />:<span/>}
            {this.getOrderStatusSelect(status)}&nbsp;&nbsp;&nbsp;{<button type='submit'>Update</button>}
        </form>
        )
    }

    getFilterForm () {

        return  <select onChange={this.handleStatusChange} value={this.state.status}>
        <option value={status} key="all">ALL</option>
        {
            this.statuses.map(status => <option value={status} key={status}>{status}</option>)
        }
       </select>

    }

    getOrderStatusSelect(status) {
        return (
            <select name="status" defaultValue={status}>
             {
                 this.statuses.map(status => <option value={status} key={status}>{status}</option>)
             }
            </select>
        )
    }

    handleStatusChange (e) {
        console.log("Setting status ", e.target.value)
        this.setState({status:e.target.value})
    }


}

const mapState = state => ({
    orders:state.orders,
    user: state.user
})

const mapStateAdmin = state=> ({
    orders:state.adminOrders,
    user: state.user,
    admin: true
})
 const mapDispatch = dispatch => ({
     loadOrders: () => dispatch(fetchAdminOrders ()),
     updateOrderStatus: (e) => {
         e.preventDefault();
         dispatch(updateOrderStatus(e.target.orderId.value, e.target.status.value));
     },

 })

export default connect (mapState)(OrderListMain);
export const OrderListAdmin = connect (mapStateAdmin, mapDispatch)(OrderListMain)
