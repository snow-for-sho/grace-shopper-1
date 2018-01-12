import React, { Component } from 'react';
import LineItem from './LineItem';
import {connect} from 'react-redux';
import {getCart} from '../store'

class Order extends Component {
    constructor (props) {
        super(props);
    }

    componentDidMount () {
        const type = this.props.type;
        console.log('componentDidMount', this.props);
        if (type === 'IN_CART') {
            this.props.loadCart();
        }
    }

    render () {

        const items = [];
        let total = 0;

        return (
            <div>
                {
                    items.map( (lineItem, i) => {
                        total += lineItem.price;
                        return <LineItem item={lineItem}/>
                    })
                }
                <div>
                    <div>Total: ${total/100}</div>
                    <div><button onSubmit={this.props.submitCart}>Checkout</button></div>
                </div>
            </div>

        );
    }
}

const mapStateToProps = state => ({
    items: state.items
});

const mapDispatchToProps = dispatch => ({
    //submitCart = dispatch(submitCart);
    loadCart: () => dispatch(getCart())
});

export default connect (mapStateToProps, mapDispatchToProps) (Order);
