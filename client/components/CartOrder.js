import React, { Component } from 'react';
//import LineItem from './LineItem';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {fetchCart, updateCart, submitCart} from '../store';
import { Link } from 'react-router-dom';

class CartOrder extends Component {
    constructor (props) {
        super(props);
        //this.isCart;
    }

    componentDidMount () {
        // if (this.props.isCart) {
        //     this.props.loadCart();
        // }
        // if (this.props.match && this.props.match.params && !this.props.match.params.id) {
        //     //this.props.loadCart();
        //     //if no id is provided for this order, the user must be looking for a cart
        //     //this.isCart = true;
        // } else {
        //     //this.isCart = false;
        // }
            
    }

    render () {
        if (!this.props.items) return null; //don't render anything during init
        const items = this.props.items;
        const isCart = this.props.isCart;
        const prodIds = items?Object.keys (items):[];
        console.log("order", prodIds);
        let totalPrice = 0, totalQty = 0;

        if (prodIds.length)
            return ( 
                <div>
                    <table className="table table-bordered">
                        <thead>
                            <tr><td align='center' colSpan="6">Items</td></tr>
                           <tr> 
                            <th>#</th><th>Photo</th><th>Title</th><th>Unit Price</th><th>Quantity</th><th>Sub Total</th>
                           </tr>
                        </thead>
                        <tbody>
                    {
                        prodIds.map( (prodId, i) => {
                            const lineItem = items[prodId]
                            totalPrice += lineItem.product.price * +lineItem.quantity;
                            totalQty += +lineItem.quantity;
                            return this.formatTr(i, lineItem);
                        })
                    }

                            <tr key='total'>
                                <td align='right' colSpan='5'>Total Items: {totalQty}</td>
                                <td align='right'>Total Price: ${totalPrice/100}</td>
                                
                            </tr>
                            <tr key='checkout'>
                                {
                                    isCart?<td colSpan='6' align='center'><Link to='/checkout'><button>Checkout</button></Link></td>
                                               :<td colSpan='6' align='center'>Status: {this.props.status} </td>
                                }
                            </tr>
                         </tbody>
                        </table>
                </div>

            );
            return this.props.isCart?'Cart is empty':''
    }
    formatTr  (i, lineItem)  {
        return (
            <tr key={i}>
                <td>{i}</td>
                <td><img src={lineItem.product.photo} width='100' height='100'/></td>
                <td><Link to={`/products/${lineItem.product.id}`}>{lineItem.product.title}</Link></td>
                <td>${lineItem.product.price/100}</td>
                <td>{this.props.isCart?this.getSelect('qty', lineItem.product.inventoryQty, lineItem.quantity, lineItem.product.id):lineItem.quantity}</td>
                <td align='right'>${lineItem.product.price * lineItem.quantity/100}</td>
            </tr>
        );
    }

    getSelect (name, max, selectedI, prodId)  {
        const arr = [];
        let value;
        for (let i = 1; i<=max; i++) {
            if(+selectedI===i) value=`${prodId}-${i}`;
            arr.push(<option value={`${prodId}-${i}`} key={i}>{i}</option>)
        }

        arr.push(<option value={`${prodId}-0`} key='delete'>Delete</option>)
        return (
          <select name={name} onChange={this.props.handleQtyChange} value={value}>
            {arr}
          </select>
        );
      }
}

const mapStateCart = state => ({
    items: state.cart.items,
    isCart: true
});
const mapStateOrder = (state, ownProps) => {
    let items, status;
    //lookup specific order
    console.log("own props in order", ownProps.match)
    if (ownProps.id || (ownProps.match && ownProps.match.params && ownProps.match.params.id)) {     
        const orderId = ownProps.id?ownProps.id:ownProps.match.params.id;
        console.log("Order details loading",state.orders )
        const order = state.orders.find(order=>order.id === +orderId);
        console.log("found order", order)
        status = order.status;
        items = order.lineItems;
    } else {
        //display cart
        items = state.cart.items;
        status = 'IN_CART';
    }
    return {
        items,
        status,
        isCart: false
    }
}
const mapDispatchToProps = dispatch => ({
    submitCart: ()=> {
        console.log("Submit triggered");
        dispatch(submitCart())
    },
    //loadCart: () => dispatch(fetchCart()),
    handleQtyChange: (e) => {
        e.preventDefault();
        const idQty = e.target.value.split('-');
        dispatch (updateCart (idQty[0], idQty[1]));
    }
});

export const Cart = withRouter(connect (mapStateCart, mapDispatchToProps) (CartOrder));
export const Order = withRouter( connect (mapStateOrder) (CartOrder));
