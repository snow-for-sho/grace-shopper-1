const Sequelize = require('sequelize');
const db = require('../db');
const Product = require('./product');
const Category = require ('./category');

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

Order.afterCreate( (instance, options) => {
  const items = instance.items;
  //pseudocode
  //1. convert json to obj
  //2. get the product id
  //3. look up categories for that product
  //4. for each category, inc the rank counter
  items.forEach (item => {
    const obj = JSON.parse(item);
    const prodId = obj.productId;
    const prod = Product.findById(prodId)
    .then (product => {
      //assume an array
      product.getCategories().forEach(category => {
        //Might have to do promise.all
        category.incrementRank();
      });
    });

  });
});

module.exports = Order;

