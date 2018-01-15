import React from 'react';
import {findOrder} from '../store';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import OrderDetails from './OrderDetails';

function TrackOrder (props) {
    console.log(props.trackedOrder)
    return (
        props.trackedOrder && Object.keys(props.trackedOrder).length?
        <OrderDetails trackedOrder={props.trackedOrder} />
        :
        <form onSubmit={props.handleSubmit}>
            <table>
                <tbody>
                    <tr>
                        <td align='right'>Order ID:</td><td><input type='text' name='orderId'/></td>
                    </tr>
                    <tr>
                        <td align='right'>Email:</td><td><input type='text' name='email'/></td>
                    </tr>
                    <tr>
                        <td colSpan='2' align='center'><button type='submit'>Submit</button></td>
                    </tr>
                </tbody>
            </table>
        </form>
    )
}

const mapState = state => ({
    trackedOrder: state.trackedOrder
});
const mapDispatch = dispatch => ({
    handleSubmit: (e) => {
        e.preventDefault();
        dispatch (findOrder(e.target.orderId.value, e.target.email.value));
    }
})

export default withRouter (connect (mapState, mapDispatch)(TrackOrder));