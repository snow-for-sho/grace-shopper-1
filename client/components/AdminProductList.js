import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

class AdminProductList extends Component {
    constructor (props) {
        super (props);
    }

    render () {
        //console.log("user id", this.props.user, "orders", this.props.orders);
        if (this.props.user.isAdmin) {
            return (
                <table className='table table-bordered'>
                        {this.getProductRows()}
                </table>
            );
        } else return <div>Must be admin to access this view</div>;
    }

    getProductRows() {
        return (
            <tbody>
                <tr><td colSpan="7">Products - <Link to="/admin/products/add"><span>Add product</span></Link></td></tr>
                {
                    this.props.products.map( (product, i) => 
                        <tr key={i}> 
                            <td align="center">{product.id}</td>
                            <td align="center"><Link to={`/admin/products/${product.id}`}>Edit/Delete</Link></td>
                            <td align="center"><img src={product.photo} height="100px" width="100px"/></td>
                            <td align="center">{product.title}</td>
                            <td align="center">{product.description}</td>
                            <td align="center">{product.inventoryQty}</td>
                            <td align="center">{this.listCats(product.categories)}</td>
                        </tr>
                    )
                }
            </tbody>
        )
    }

    listCats(cats) {
        return (
            cats.map(cat=>cat.title).join(', ')
        )
    }

   

}

const mapState = state => ({
    products:state.products,
    user: state.user
})


export default connect (mapState)(AdminProductList);