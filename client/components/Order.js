import React, { Component } from 'react';
import LineItem from './LineItem';
import {connect} from 'react-redux';
import {fetchCart} from '../store'

class Order extends Component {
    constructor (props) {
        super(props);
    }

    componentDidMount () {
        // const type = this.props.type;
        // console.log('componentDidMount', this.props);
        // if (type === 'IN_CART') {
        //     this.props.loadCart();
        // }
        if (this.props.match.params.cart)
            this.props.loadCart();
    }

    render () {
        console.log('props', this.props);
        const items = this.props.cart;
        console.log("Items in cart", items);
        let total = 0;
        if (items.length)
            return (
                <div>
                    {
                        items.map( (lineItem, i) => {
                            total += lineItem.price;
                            console.log("computed total")
                            return <LineItem item={lineItem}/>
                        })
                    }
                    <div>
                        <div>Total: ${total/100}</div>
                        <div><button onSubmit={this.props.submitCart}>Checkout</button></div>
                    </div>
                </div>

            );
        return <div>Cart is empty</div>;
    }
}

const mapStateToProps = state => ({
    items: state.items,
    cart: state.cart
});

const mapDispatchToProps = dispatch => ({
    //submitCart = dispatch(submitCart);
    loadCart: () => dispatch(fetchCart())
});

export default connect (mapStateToProps, mapDispatchToProps) (Order);
