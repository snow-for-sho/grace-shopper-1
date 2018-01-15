import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {updateUser, submitCart, submitUserInfo, updateRecipientInfo} from '../store';
import { Link } from 'react-router-dom';

function  AddressForm (props)  {
    console.log("In address form user", props.user)
    if (!props.user) return null;
    return (
        <div>
            <form onSubmit={props.handleSubmit}>
            <table><tbody>
                <tr><td align='right'>First Name: </td><td><input name='firstName' value={props.user.firstName} onChange={props.updateField}/></td></tr>
                <tr><td align='right'>Last Name: </td><td><input name='lastName' value={props.user.lastName} onChange={props.updateField}/></td></tr>
                <tr><td align='right'>Address: </td><td><input name='address' value={props.user.address} onChange={props.updateField}/></td></tr>
                <tr><td align='right'>Email: </td><td><input name='email' value={props.user.email} onChange={props.updateField}/></td></tr>
                <tr><td align='right'>Phone: </td><td><input name='phone' value={props.user.phone} onChange={props.updateField}/></td></tr>
                {
                    props.type==='Account'?<tr><td align='right'>Admin: </td><td>{props.user.isAdmin?'YES':"NO"}</td></tr>     
                                               :<tr><td align='right'>Payment Type: </td><td><select name='paymentType'>
                                               <option value='MasterCard'>MasterCard</option>
                                               <option value='VISA'>Visa</option>
                                               </select></td></tr>
                }
                {
                    props.type==='Checkout'?<tr><td align='right'>Instructions:</td><td><input name='instructions'/></td></tr>:null
                }
                
                <tr><td colSpan='2' align="center">
                    {
                        props.type==='Checkout'?<div><Link to='/cart'><button>Cancel</button></Link><button type='submit'> Checkout</button></div>:<button type='submit'> Update Account</button>
                    }
                    </td></tr>
            </tbody></table>
            </form>
            </div>       
    );

}

const mapStateToPropsAccount = state => ({
    user: state.user,
    type: 'Account'
});

const mapStateToPropsCheckout = state => ({
    user: state.cart.recipientInfo,
    type: 'Checkout'
});

const mapDispatchToPropsAccount = dispatch => ({
    updateField: (e)  => {
        e.preventDefault();
        console.log(e.target.name, e.target.value);
        dispatch(updateUser(e.target.name, e.target.value))
    },
    submitField: (userInfo) => dispatch(submitUserInfo(userInfo))
})

const mapDispatchToPropsCheckout= (dispatch, props) => ({
    updateField: (e)  => {
        e.preventDefault();
        console.log(e.target);
        dispatch(updateRecipientInfo(e.target.name, e.target.value))
    },
    submitField: (userInfo) => dispatch(submitCart(userInfo, props.history))
})

const mergeProps = (state, actions) => {
    return {
        ...state,
        ...actions,
        handleSubmit: (e)=> {
            e.preventDefault();
            console.log("Submit triggered props");
            const userInfo = {
                firstName: e.target.firstName.value,
                lastName: e.target.lastName.value,
                address: e.target.address.value,
                email: e.target.email.value,
                phone: e.target.phone.value,
            }
            if (state.type==='Checkout') {
                userInfo['paymentType'] = e.target.paymentType.value;
                userInfo['instructons'] = e.target.instructions.value;
            }

            actions.submitField(userInfo);
        }
    }
};

export const AccountForm = withRouter(connect (mapStateToPropsAccount, mapDispatchToPropsAccount, mergeProps) (AddressForm));
export const CheckoutForm = withRouter(connect (mapStateToPropsCheckout, mapDispatchToPropsCheckout, mergeProps) (AddressForm));
