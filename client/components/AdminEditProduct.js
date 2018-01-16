import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {updateProduct, fetchProducts} from '../store';
import { Link } from 'react-router-dom';

class  AdminEditProduct extends Component {
    constructor (props) {
        super(props)
        this.state = {
            id: 0,
            categories: [],
            title: '',
            description: '',
            photo: '',
            inventoryQty: 0,
            categories: []
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps){
        console.log('running next props')
        //this.setState(nextProps.products.find(product => product.id === +this.props.match.params.id))
        console.log(nextProps.initialProduct)
        this.setState(nextProps.initialProduct)
    }

    componentDidMount () {
        console.log("MOUNTED", this.props);
        this.setState(this.props.initialProduct)
    }

    handleChange(evt){
        console.log(evt)
        if (evt.target.name === 'categories'){
            const cats = evt.target.value.split(',').map(cat=>({title:cat}))
            console.log("categories", cats)
            this.setState({[evt.target.name]: cats})
        }
            
        else  this.setState({[evt.target.name]: evt.target.value})
    }

    handleSubmit(evt){
        evt.preventDefault()
       
        this.props.sendToServer(this.state)
    }


   render ()  {
    //console.log('PROPS', this.props)
    if (!this.props.user.isAdmin) return null;
    console.log("categories",this.state.categories.map(cat=>cat.title).join(', '));
    return (
            <form onSubmit={this.handleSubmit}>
            <input type='hidden' name='id' value={this.state.id} />
            <table><tbody>
                <tr><td colSpan='2' align='center'>Add/Edit Product</td></tr>
                <tr><td align='right'>Title</td><td><input name='title' value={this.state.title} onChange={this.handleChange.bind(this)} /></td></tr>
                <tr><td align='right'>Desciption </td><td><input name='description' value={this.state.description} onChange={this.handleChange.bind(this)}/></td></tr>
                <tr><td align='right'>Photo: </td><td><input name='photo' value={this.state.photo} onChange={this.handleChange.bind(this)}/></td></tr>
                <tr><td align='right'>Inventory </td><td><input name='inventoryQty' value={this.state.inventoryQty} onChange={this.handleChange.bind(this)} /></td></tr>
                <tr><td align='right'>Categories: </td><td><input name='categories' value={this.state.categories.map(cat=>cat.title).join(',')} onChange={this.handleChange.bind(this)}/></td></tr>
                <tr><td colSpan='2' align='center'><button type='submit'> Submit Changes</button></td></tr>
            </tbody></table>
            </form>      
    );

}
}

const mapStateToProps = (state, ownProps) => ({
    user: state.user,
    products: state.products,
    initialProduct: state.products.find(product => product.id === +ownProps.match.params.id)
});

const mapDispatch = (dispatch, ownProps) => ({
    sendToServer: obj => {
        dispatch (updateProduct(obj, ownProps.history))
    },
    loadData: () => dispatch(fetchProducts())
})
export default withRouter(connect (mapStateToProps, mapDispatch) (AdminEditProduct));