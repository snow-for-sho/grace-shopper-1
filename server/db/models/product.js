const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define ('product', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0.0,
        validate: {
            min: 0.0
        }
    },
    inventoryQty: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 0
        }
    },
    photo: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '/snowflake.png'
    },
    size: {
        type: Sequelize.ENUM(1, 5, 10, 20),
        get() {
            return `${this.size$}lb`;
        }
    },
    origin: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

Product.countByCategoryId = function (id) {
    return Product.findAndCountAll ({
        where: {
            categoryId:id
        }
    });
};