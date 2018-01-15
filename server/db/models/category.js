const Sequelize = require('sequelize');
const Product = require ('./product');
const Order = require('./order');
const db = require('../db');

const Category = db.define ('category', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true
    },
    photo: {
        type: Sequelize.VIRTUAL,
        get () {
            const products = this.getProducts()
            .then (products => {
                return products.length?products[0].photo:'/snowflake.png';
            })
            .catch (console.log);
            
        }
    },
    inventoryQty: {
        type: Sequelize.VIRTUAL,
        get () {
            this.getProducts()
            .then (products => {
                let total = 0;
                products.forEach (prod => total+= prod.inventoryQty);
                return total;
            })
            .catch (console.log);
            
        }
    }
});

Category.getPopularity = function (id) {
    return Product.countByCategoryId(id);
}

//pseudocode
// Category.prototype.incrementRank = function () {
//     console.log('category rank', this.getDataValue());
//     this.setDataValue('rank', this.getDataValue()+1);
// }

module.exports = Category;