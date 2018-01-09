const Sequelize = require('sequelize');
const Product = require ('./product');
const Order = require('./order');
const db = require('../db');

const Category = db.define ('category', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    }
    // },
    // rank: {
    //     type: Sequelize.INTEGER,
    //     allowNull: false,
    //     defaultValue: 0
    // }
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