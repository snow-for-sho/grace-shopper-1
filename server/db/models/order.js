const Sequelize = require('sequelize');
const db = require('../db');
const Product = require('./product');
const Category = require ('./category');

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('IN_CART','CREATED', 'PROCESSING', 'SHIPPED', 'COMPLETED', 'CANCELLED'),
    defaultValue: 'CREATED',
    allowNull: false
  },
  subTotal: {
    type: Sequelize.VIRTUAL,
    get: function() {
      return this.getLineItems().reduce ((total, item) => total += item.price, 0);
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
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  name: {
    type: Sequelize.VIRTUAL,
    get () {
      return `${this.firstName} ${this.lastName}`
    }
  },
  email: {
    type: Sequelize.STRING,
    validate:{
        isEmail : true
    }
  },
  address: {
    type: Sequelize.STRING
  },
  phone: {
    type: Sequelize.STRING
  },
  instructions: {
    type: Sequelize.STRING
  },
  paymentType: {
    type: Sequelize.ENUM ('VISA', 'MasterCard'),
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

