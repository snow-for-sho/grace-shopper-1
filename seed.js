const db = require ("./server/db");
//const {Campus, Course, Event, Student } = require ("./server/db/models");
const Category = require("./server/db/models/category");
const Order = require("./server/db/models/order");
const Product = require("./server/db/models/product");
const User = require("./server/db/models/user");
const Review = require("./server/db/models/review");

 //will add getCategories/setCategories/addCategories/addCategory to Product
 Product.belongsToMany(Category, {through: 'CategoryProduct'});
 //will add getProducts/setProducts/addProducts/addProduct to Category
 Category.belongsToMany (Product, {through: 'CategoryProduct'});
 
 
 //adds userId, getUser, setUer to Order
 Order.belongsTo(User);  
 //adds userId to Order, getOrders/setOrders to User
 User.hasMany(Order);
 
 //Review gets UserId, and get/set User methods
 Review.belongsTo(User);
 //One to many, User gets getReviews and setReviews, reviews gets userId
 User.hasMany(Review);
 //adds productId to Review, and set/get Reviews to Product
 Product.hasMany(Review);

const users = [
    {
        firstName: 'Elana',
        lastName: 'Abelev',
        email: 'elanamig@gmail.com',
        cart:[{1:5}]
    },
    {
        firstName: 'Will',
        lastName: 'Shaw',
        email: 'wrcs505@gmail.com',
        cart:[{3:1}, {2:1}, {10:1}]
    },
    {
        firstName: 'Aubrey',
        lastName: 'Arcangel',
        email: 'aarcangel@gmail.com'
    },
    {
        firstName: 'John',
        lastName: 'McDonald',
        email: 'jmd@gmai.com'
    },
    {
        firstName: 'Some',
        lastName: 'Person',
        email: 'someperson@gmai.com'
    }
    
];

const categories = [
    { title: 'Powdered'},
    { title: 'Wet'},
    { title: 'Kits'},
    { title: 'Accessories'},
    { title: 'Kings of the North'}
];

const products = [
    {
        title: 'Snow',
        description: 'The purest and the best snow possible',
        price: 10,
        inventoryQty: 30,
        size: '10',
        origin: 'New York'
    },
    {
        title: 'Snow',
        description: 'The purest and the best snow possible',
        price: 10,
        inventoryQty: 30,
        size: '1',
        origin: 'New York'
    },
    {
        title: 'Snow',
        description: 'The purest and the best snow possible',
        price: 10,
        inventoryQty: 30,
        size: '5',
        origin: 'New York'
    },
    {
        title: 'Snow',
        description: 'The purest and the best snow possible',
        price: 10,
        inventoryQty: 30,
        size: '20',
        origin: 'Oregon'
    },
    {
        title: 'Snowball launcher',
        description: 'Be the boss of the next snowball fight',
        price: 125,
        inventoryQty: 5,
        origin: 'New York'
    },
    {
        title: 'Pre-made snowman',
        description: 'Too cold to build a snowman?  We got you covered!',
        price: 50,
        inventoryQty: 7,
        size: '20',
        origin: 'Oregon'
    },
    {
        title: 'Pre-made snowman',
        description: 'Too cold to build a snowman?  We got you covered!',
        price: 50,
        inventoryQty: 7,
        size: '5',
        origin: 'New Jersey',
        photo: '/snowmanKit.jpg'
    },
    {
        title: 'Snow molds',
        description: 'Perfect shapes for your next snow fort',
        price: 5,
        photo: '/molds.jpg',
        origin: 'New York'
    },
    {
        title: 'Night King Ice Spear',
        description: 'Security system frozen?  Do not worry, the ice spear will deter all potential burglars',
        price: 100000,
        inventoryQty: 1,
        photo: '/iceSpear.png',
        origin: 'New York'
    },
    {
        title: 'Jon Snow',
        description: 'Security system frozen?  Do not worry, the ice spear will deter all potential burglars',
        price: 1000000,
        inventoryQty: 1,
        photo: '/jonSnow.png',
        origin: 'New York'
    }
];

const orders = [
    {
        items: [{productId: 1, quantity: 3, price: 20},
                {productId: 3, quantity: 1, price: 10}],
        status: 'PROCESSING',
        recipientName: 'Karen McPherson',
        recipientEmail: 'KMP@gmai.com',
        recipientAddress: '5 Hanover Sq, New York, NY'
    },
    {
        items: [{productId: 10, quantity: 1, price: 1000000}],
        status: 'SHIPPED',
        recipientName: 'Karen McPherson',
        recipientEmail: 'KMP@gmai.com',
        recipientAddress: '5 Hanover Sq, New York, NY'
    }
];

const reviews = [
    {
        reviewText: 'Awesome Item Awesome Item Awesome Item Awesome Item Awesome Item Awesome Item Awesome Item Awesome Item Awesome Item Awesome Item Awesome Item Awesome Item',
        numberOfStars: 5
    },
    {
        reviewText: 'This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks',
        numberOfStars: 0
    },
    {
        reviewText: 'So-so So-so So-so So-so So-so So-so So-so So-so So-so So-so So-so So-so So-so So-so So-so So-so So-so So-so So-so So-so So-so So-so So-so So-so So-so So-so So-so So-so So-so So-so',
        numberOfStars: 3
    }
]
const seed = () => {
    const usersPromise = users.map(user => User.create(user));
    const categoriesPromise = categories.map(category => Category.create(category));
    const productsPromise = products.map(product => Product.create(product));
    const ordersPromise = orders.map(order => Order.create(order));
    const reviewsPromise = reviews.map(review => Review.create(review));

    return Promise.all (usersPromise)
    .then( (userData) => Promise.all(categoriesPromise)
        .then( (catData) => Promise.all(productsPromise)
            .then( (prodData) => Promise.all(ordersPromise)
                .then( (orderData) => Promise.all(reviewsPromise)
                    .then( (reviewData) => {
                        //console.log(catData[0]);
                        return Promise.all([catData[0].setProducts([prodData[0], prodData[1]]),
                        catData[1].setProducts([prodData[2], prodData[3]]),
                        catData[2].setProducts([prodData[5],prodData[9],prodData[6]]),
                        catData[3].addProduct(prodData[4]),
                        catData[4].setProducts([prodData[8],prodData[7]]),

                        // prodData[0].addCategory(catData[0]),
                        // prodData[1].addCategory(catData[0]),
                        // prodData[2].addCategory(catData[1]),
                        // prodData[3].addCategory(catData[1]),
                        // prodData[4].addCategory(catData[2]),
                        // prodData[5].addCategory(catData[2]),
                        // prodData[6].addCategory(catData[2]),
                        // prodData[7].addCategory(catData[3]),
                        // prodData[8].addCategory(catData[4]),
                        // prodData[9].addCategory(catData[4]),

                        //do we need to call the reverse?

                        orderData[0].setUser(userData[0]),
                        orderData[1].setUser(userData[1]),

                        userData[0].addOrder(orderData[0]),
                        userData[1].addOrder(orderData[1]),

                        reviewData[0].setUser(userData[0]),
                        reviewData[1].setUser(userData[0]),
                        reviewData[2].setUser(userData[1]),

                        prodData[0].setReviews([reviewData[0], reviewData[1]]),
                        prodData[1].setReviews(reviewData[2]),

                        userData[0].setReviews([reviewData[0], reviewData[1]]),
                        userData[1].setReviews([reviewData[2]])
                    ]).catch(errFunc);
                    })
                )
            )
        )
    )
    .catch(errFunc) ;
}
 
const errFunc = (err) =>  {
    console.log('Error while seeding');
    console.log(err.stack);
  }

const main = () => {
    console.log('Syncing db...');
    db.sync({ force: true })
      .then(() => {
        console.log('Seeding databse...');
        return seed();
      })
      .catch(errFunc)
      .then(() => {
        db.close();
        return null;
      });
  };
  
  main();
  