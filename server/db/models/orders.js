const Sequelize = require('sequelize');
const db = require('../db');
const Product = require('./product');

const Order = db.define('order', {
  items: {
    // order structure: {productId: id, quantity: X, price: X}
    type: Sequelize.ARRAY(Sequelize.JSON),
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('CREATED', 'PROCESSING', 'SHIPPED', 'COMPLETED'),
    defaultValue: 'CREATED',
    allowNull: false
  },
  subTotal: {
    type: Sequelize.VIRTUAL,
    get: function() {
      if (this.items.length) {
        return this.items.map(item => item.quantity * item.price);
      } else {
        return 0;
      }
    }
  },
  total: {
    type: Sequelize.VIRTUAL,
    get: function() {
      if (subTotal) {
        return subTotal * 1.08875;
      } else {
        return 0;
      }
    }
  },
  recipientName: {
    type: Sequelize.STRING
  },
  recipientAddress: {
    type: Sequelize.STRING
  },
  recipientPhone: {
    type: Sequelize.STRING
  },
  recipientInstructions: {
    type: Sequelize.STRING
  }
});

Order.countByCategoryId = function (id) {
  return Order.findAndCountAll ({
      where: {
          categoryId:id
      }
  });
};

module.exports = Order;

