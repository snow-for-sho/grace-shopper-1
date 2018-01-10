const db = require ("./server/db");
//const {Campus, Course, Event, Student } = require ("./server/db/models");
const Category = require("./server/db/models/category");
const Order = require("./server/db/models/order");
const Product = require("./server/db/models/product");
const User = require("./server/db/models/user");
const Review = require("./server/db/models/review");
const LineItem = require ('./server/db/models/lineitem');

const users = [
    {
        firstName: 'Snow',
        lastName: 'Lover',
        email: 'a@gmail.com',
        cart:[{1:5}],
        password: '123456',
        salt: 'fullstack'
    },

    {
        firstName: 'Person',
        lastName: 'SnowPerson',
        email: 'w@gmail.com',
        cart:[{3:1}, {2:1}, {10:1}]
    },
    {
        firstName: 'Abcde',
        lastName: 'Fghijk',
        email: 'aa@gmail.com'
    },
    {
        firstName: 'John',
        lastName: 'Smith',
        email: 'js@js.com'
    },
    {
        firstName: 'Some',
        lastName: 'Person',
        email: 'someperson@js.com'
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
        price: 1000,
        inventoryQty: 30,
        size: '10',
        origin: 'New York'
    },
    {
        title: 'Snow',
        description: 'The purest and the best snow possible',
        price: 1000,
        inventoryQty: 30,
        size: '1',
        origin: 'New York'
    },
    {
        title: 'Snow',
        description: 'The purest and the best snow possible',
        price: 1000,
        inventoryQty: 30,
        size: '5',
        origin: 'New York'
    },
    {
        title: 'Snow',
        description: 'The purest and the best snow possible',
        price: 1000,
        inventoryQty: 30,
        size: '20',
        origin: 'Oregon'
    },
    {
        title: 'Snowball launcher',
        description: 'Be the boss of the next snowball fight',
        price: 12500,
        inventoryQty: 5,
        origin: 'New York'
    },
    {
        title: 'Pre-made snowman',
        description: 'Too cold to build a snowman?  We got you covered!',
        price: 5000,
        inventoryQty: 7,
        size: '20',
        origin: 'Oregon'
    },
    {
        title: 'Pre-made snowman',
        description: 'Too cold to build a snowman?  We got you covered!',
        price: 5000,
        inventoryQty: 7,
        size: '5',
        origin: 'New Jersey',
        photo: '/snowmanKit.jpg'
    },
    {
        title: 'Snow molds',
        description: 'Perfect shapes for your next snow fort',
        price: 500,
        photo: '/molds.jpg',
        origin: 'New York'
    },
    {
        title: 'Night King Ice Spear',
        description: 'Security system frozen?  Do not worry, the ice spear will deter all potential burglars',
        price: 10000000,
        inventoryQty: 1,
        photo: '/iceSpear.png',
        origin: 'New York'
    },
    {
        title: 'Jon Snow',
        description: 'Security system frozen?  Do not worry, the ice spear will deter all potential burglars',
        price: 100000000,
        inventoryQty: 1,
        photo: '/jonSnow.png',
        origin: 'New York'
    }
];

const lineItems = [
    {
        quantity: 5,
        price: 100
    },
    {
        quantity: 7,
        price: 10
    },
    {
        quantity: 2
    },
    {
        quantity: 6
    },
    {
        quantity: 1
    }

];

const orders = [
    {
        status: 'PROCESSING',
        recipientName: 'Karen McPherson',
        recipientEmail: 'KMP@gmai.com',
        recipientAddress: '5 Hanover Sq, New York, NY'
    },
    {
        status: 'SHIPPED',
        recipientName: 'Karen McPherson',
        recipientEmail: 'KMP@gmai.com',
        recipientAddress: '5 Hanover Sq, New York, NY'
    },
    {
        status: 'IN_CART',
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
    const lineItemsPromise = lineItems.map(lineItem => LineItem.create(lineItem));

    return Promise.all (usersPromise)
    .then( (userData) => Promise.all(categoriesPromise)
        .then( (catData) => Promise.all(productsPromise)
            .then( (prodData) => Promise.all(ordersPromise)
                .then( (orderData) => Promise.all(reviewsPromise)
                    .then( (reviewData) => Promise.all (lineItemsPromise)
                        .then (lineItemData => {
                            //1.  Add Products to categories
                            return Promise.all([catData[0].setProducts([prodData[0], prodData[1]]),
                            catData[1].setProducts([prodData[2], prodData[3]]),
                            catData[2].setProducts([prodData[5],prodData[9],prodData[6]]),
                            catData[3].addProduct(prodData[4]),
                            catData[4].setProducts([prodData[8],prodData[7]]),

                            //     //2.  Set user for Order Id
                            // orderData[0].setUser(userData[0]),
                            // orderData[1].setUser(userData[1]),
                            
                            //Add orders to User
                            userData[0].addOrder(orderData[0]),
                            userData[1].addOrder(orderData[1]),
                            userData[3].addOrder(orderData[2]), //in cart order

                            //Add users to review
                            reviewData[0].setUser(userData[0]),
                            reviewData[1].setUser(userData[0]),
                            reviewData[2].setUser(userData[1]),

                            //Add orders to review
                            reviewData[2].setOrder(orderData[1]), 

                            prodData[0].setReviews([reviewData[0], reviewData[1]]),
                            prodData[1].setReviews(reviewData[2]),

                            userData[0].setReviews([reviewData[0], reviewData[1]]),
                            userData[1].setReviews([reviewData[2]]),

                            //LineItems
                            lineItemData[0].setProduct(prodData[1]),
                            lineItemData[1].setProduct(prodData[9]),
                            lineItemData[2].setProduct(prodData[2]),
                            lineItemData[3].setProduct(prodData[8]),
                            lineItemData[4].setProduct(prodData[8]),

                            orderData[0].addLineItem(lineItemData[0]),
                            orderData[1].addLineItems([lineItemData[1], lineItemData[4]]),
                            orderData[2].addLineItems([lineItemData[2], lineItemData[3]])//,

                            // lineItemData[0].addOrder(orderData[1]),
                            // lineItemData[1].addOrder(orderData[0]),
                            // lineItemData[2].addOrder(orderData[2]),
                            // lineItemData[3].addOrder(orderData[2]),
                            // lineItemData[4].addOrder(orderData[1]),

                        

                            ]).catch(errFunc);
                        })
                    )
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
