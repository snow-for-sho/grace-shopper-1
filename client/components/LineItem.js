import React from 'react';
import { Link } from 'react-router-dom';

export default function LineItem (props) {
    const item = props.lineItem;
    console.log("Item", item)
    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <td><img src={item.product.photo} width='100' height='100'/></td>
                        <td><Link to={`/products/${item.product.id}`}>{item.product.title}</Link></td>
                        <td>Price: ${item.product.price/100}</td>
                        <td>Quantity: {item.quantity}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}