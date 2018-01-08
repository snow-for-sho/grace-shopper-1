const Sequelize = require('sequelize');
const Product = require ('./product');
const Order = require('./order');
const db = require('../db');

const Category = db.define ('category', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    tags: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false
    },
    rank: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
});

Category.getPopularity = function (id) {
    return Product.countByCategoryId(id);
}