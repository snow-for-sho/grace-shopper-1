const User = require('./user');
const Product = require ('./product');
const Order = require ('./order');
const Category = require ('./category');
const Review = require ('./review');
const LineItem = require ('./lineitem');


/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

 //will add getCategories/setCategories/addCategories/addCategory to Product
Product.belongsToMany(Category, {through: 'CategoryProduct'});
//will add getProducts/setProducts/addProducts/addProduct to Category
Category.belongsToMany (Product, {through: 'CategoryProduct'});


//adds userId, getUser, setUer to Order
//Order.belongsTo(User);  
//adds userId to Order, getOrders/setOrders to User
User.hasMany(Order);
//Review gets UserId
Review.belongsTo(User);
//Review gets orderId
Review.belongsTo(Order);
//One to many, User gets getReviews and setReviews, reviews gets userId
User.hasMany(Review);
//adds productId to Review, and set/get Reviews to Product
Product.hasMany(Review);
//puts productId on LineItem and adds set/get Product to LineItem
LineItem.belongsTo(Product);
//puts orderId on lineItem and adds set/get Order to LineItem
LineItem.belongsTo(Order);
//creates a pivot table and puts get/set/add LineItems to Order, and also addLineItem to Order
Order.belongsToMany(LineItem, {through: 'LineItemOrder'});

module.exports = {
  User, Category, Product, Review, Order
}
