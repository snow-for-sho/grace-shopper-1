import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {AccountForm} from './AddressForm';

export default class Account extends Component {
    constructor (props) {
        super (props)
    }

    render () {
        console.log("HERE")
        return (
            <div>
                <AccountForm />
                <div><Link to='/orders'>Order History</Link></div>
            </div>
        );
    }
}