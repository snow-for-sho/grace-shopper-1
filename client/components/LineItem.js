import React from 'react';
import { Link } from 'react-router-dom';

export default function LineItem (props) {
    const item = props.listItem;
    return (
        <div>
            <img src={item.product.photo} />
            <Link to={`/products/${item.product.id}`}>{item.product.title}</Link>
            <span>{item.price}</span>
            <span>{item.quantity}</span>
        </div>
    );
}