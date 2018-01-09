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
      if (this.items && this.items.length) {
        return this.items.map(item => item.quantity * item.price);
      } else {
        return 0;
      }
    }
  },
  total: {
    type: Sequelize.VIRTUAL,
    get: function() {
      if (this.subTotal) {
        return this.subTotal * 1.08875;
      } else {
        return 0;
      }
    }
  },
  recipientName: {
    type: Sequelize.STRING
  },
  recipientEmail: {
    type: Sequelize.STRING,
    validate:{
        isEmail : true
    }
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

// Order.afterCreate( (instance, options) => {
//   console.log("Order.afterCreate");
//   const items = instance.items;
//   //pseudocode
//   //1. convert json to obj
//   //2. get the product id
//   //3. look up categories for that product
//   //4. for each category, inc the rank counter
//   items.forEach (item => {
//     const prodId = item.productId;
//     console.log("one", prodId);
//     const prod = Product.findById(prodId)
//     .then (product => {
//       //assume an array
//       console.log("2", product);
//       product.getCategories()
//       .then ( categories => {
//         console.log("got categories", categories);
//         categories.forEach(category => {
//         //Might have to do promise.all
//         console.log("order.js, about to increment rank");
//           category.incrementRank();
//         });
//       });
//     });

//   });
// });

module.exports = Order;

