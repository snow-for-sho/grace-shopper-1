import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import OrderList from './OrderList';

export default function AdminDash (props) {
  return (
    <div>
      <nav>
        <h2>Master Lists</h2>
        <Link to="/admin/orders">Orders</Link>
        <Link to="/admin/products">Products</Link>
        <Link to="/admin/users">Users</Link>
      </nav>
    </div>
  );

}
