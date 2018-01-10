const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define ('product', {
    title: {
        // JM - always consider both notEmpty and allowNull
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    // JM - use integers!
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
        type: Sequelize.ENUM('1', '5', '10', '20'),
        get() {
            // JM - typo?
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

module.exports = Product;