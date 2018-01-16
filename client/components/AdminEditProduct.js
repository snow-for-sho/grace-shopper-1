import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {updateProduct, fetchProducts} from '../store';
import { Link } from 'react-router-dom';

class  AdminEditProduct extends Component {
    constructor (props) {
        super (props);
        const prodId = props.match.params.id;
        console.log("prodId", prodId)
        this.state = {
            product: prodId?this.props.products.find(product => product.id === +prodId):{
                title: '',
                description: '',
                photo: '',
                inventoryQty: 0,
                categories: []
            }
        }
        console.log(this.state)
    }

    componentDidMount () {
        this.props.loadData();
        const prodId = this.props.match || this.props.match.params.id;
        this.state = {
            product: prodId?this.props.products.find(product => product.id === +prodId):{
                title: '',
                description: '',
                photo: '',
                inventoryQty: 0,
                categories: []
            }
        }
        console.log("state in didMount", this.state)
    }

    shouldComponentUpdate(nextProps) {
        console.log("nextProps", nextProps, "this.props", this.props);
        return true;
    }

   render ()  {
    const product = this.state.product;
    if (!product || !this.props.user || !this.props.user.isAdmin) return null;
    
    return (
            <form onSubmit={this.props.handleSubmit}>
            <input type='hidden' name='id' value={product.id} />
            <table><tbody>
                <tr><td colSpan='2' align='center'>Add/Edit Product</td></tr>
                <tr><td align='right'>Title</td><td><input name='title' defaultValue={product.title}/></td></tr>
                <tr><td align='right'>Desciption </td><td><input name='description' defaultValue={product.description} /></td></tr>
                <tr><td align='right'>Photo: </td><td><input name='photo' defaultValue={product.photo}/></td></tr>
                <tr><td align='right'>Inventory </td><td><input name='inventoryQty' defaultValue={product.inventoryQty} /></td></tr>
                <tr><td align='right'>Categories: </td><td><input name='categories' defaultValue={product.categories.map(cat=>cat.title).join(', ')} /></td></tr>
                <tr><td colSpan='2' align='center'><button type='submit'> Submit Changes</button></td></tr>
            </tbody></table>
            </form>      
    );

}
}

const mapStateToPropsAccount = state => ({
    user: state.user,
    products: state.products
});

const mapDispatch = (dispatch, ownProps) => ({
    handleSubmit: e => {
        e.preventDefault();
        const updateObj = {
            title: e.target.title.value,
            description: e.target.description.value,
            inventoryQty: e.target.inventoryQty.value,
            categories: e.target.categories.value
        }
        dispatch (updateProduct(e.target.id.value, updateObj, ownProps.history))
    },
    loadData: () => dispatch(fetchProducts())
})
export default withRouter(connect (mapStateToPropsAccount, mapDispatch) (AdminEditProduct));
