const Sequelize = require('sequelize');
const Product = require ('./product');
const db = require('../db');

//qty, price - as it's own field. if in-cart, reflect product price
const LineItem = db.define ('lineItem', {
    quantity: {
        type: Sequelize.INTEGER,
        validate: {
            min: 0
        },
        allowNull: false
    },
    price: {
        type: Sequelize.INTEGER,
        validate: {
            min: 0
        },
        get () {
            return this.getOrder().status !== 'IN_CART' && price ? this.price : 
            this.getProduct().price;
        }
    }
});

module.exports = LineItem;
