'use strict';
const router = require('express').Router();
const { Order, LineItem, Product } = require('../db/models');
const nodemailer = require ('nodemailer');

module.exports = router;

// see all orders
router.get('/', (req, res, next) => {
  if (req.user) {
    const carted = req.query.status;
    console.log('carted: ', carted)
    if (carted === 'IN_CART') {
      return Order.findOne({
        where: {status: 'IN_CART', userId: req.user.id},
        attributes: ['status', 'subTotal', 'total', 'name',
        'email', 'address', 'phone',
        'instructions', 'id', 'paymentType', 'createdAt'],
        include: [{all: true, nested: true}]
      })
      .then(order => res.json(order))
      .catch(next)
    } else {
      return Order.findAll({
        where: {
          userId: req.user.id
        },
        attributes: ['status', 'subTotal', 'total', 'name',
        'email', 'address', 'phone',
        'instructions', 'id', 'paymentType', 'createdAt'],
        include:[{all:true}]
      })
      .then(orders => res.json(orders))
      .catch(next);
    }
  } else {
    res.end();
  }
});

// see a specific order, found by ID
router.get('/:id', (req, res, next) => {
  console.log("Order id", req.query);
  let order;
  if (req.query.email) {
    order = Order.findOne ({
      where: {
        email: req.query.email,
        id: req.params.id
      },
      include:[{all:true}]
    })
  } else if (req.query.admin) {
    User.findById(req.user.id)
    .then(user => {
      if (user.isAdmin) {
       return Orders.findAll({
          include:[{all:true}]
        })
      } else {
        return null;
      }
    })
    .then (orders => {
      res.json(order)
    })
    .catch (next);
  }  else {
    order = Order.findOne ({
      where: {
        id: req.params.id,
        userId: req.user.id
      },
      include:[{all:true}]
    })
  }

  order
  .then(order => res.json(order))
  .catch(next);
});

// Create a order
router.post('/', function (req, res, next) {
  console.log("orders.js", req.body, "user id", req.user.id);
  //if user is logged in, check to see if he has a cart.
  const userId = req.user;
  let prodsToUpdate;
  let mainOrder;
  if (userId) {
    mainOrder = Order.findOrCreate({where:{userId:userId.id, status:'IN_CART'}}).then(order=>order[0]);
    prodsToUpdate = mainOrder
    .then(order => {
      console.log(req.body.recipientInfo)
      req.body.recipientInfo['status'] = 'CREATED'
      return order.update(req.body.recipientInfo)
    })
    .then(order=> {
      console.log("order", order)
      return order.getLineItems()
    })
  }
  else {
    mainOrder = Order.create(req.body.recipientInfo);
    prodsToUpdate = mainOrder
    .then (order => {
      const items = req.body.cart.items;
      const lineItemsToCreate = Object.keys(items).map(prodId=>({quantity:items[prodId].quantity, productId:prodId, price: items[prodId].product.price}));
      return LineItem.bulkCreate(lineItemsToCreate,{individualHooks: true})
        .then(createdLineItems => Promise.all(createdLineItems.map(lineItem=>lineItem.setOrder(order))))
        .then(createdLineItems => {
          order.addLineItems(createdLineItems)
          return createdLineItems;
        })
    })
  } //else

  console.log('1');
  prodsToUpdate
    .then(lineItems => updateProductQty(lineItems))
    .then(() => mainOrder)
    .then(order => {
      sendOrder(order, " Your order has been created ");
      res.json(order)
    })
    .catch(next);
})

const sendOrder = (order, subject) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'snowfosho1@@gmail.com',
      pass: 'snowfosho123'
    }
  });
  
  const mailOptions = {
    from: 'snowfosho1@@gmail.com',
    to: order.email,
    subject: subject,
    text: formatText(order)
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

const formatText = (order) => {
  return `Here is the information about your order.  Login to your account to view order information. \n Order id: ${order.id}`
}

const updateProductQty = (lineItems) => {
  //console.log("updating line items", lineItems)
  const prodUpdateArr = lineItems.map(lineItem => ({id: lineItem.productId, usedQty: lineItem.quantity}));
  const prodUpdatePromises = prodUpdateArr.map (prod => 
    Product.findById(prod.id)
    .then (foundProd=> foundProd.update({
      inventoryQty: foundProd.inventoryQty - prod.usedQty 
    })));
  return Promise.all(prodUpdatePromises)
}

// Update a order by ID
router.put('/:id', function (req, res, next) {
  const id = req.params.id;
  //console.log("in order.js PUT CART", id, req.body)
  if (id && id !== 'null') {
      Order.findById(id)
        .then(order => order.update(req.body))
        .then(order => res.json(order))
        .catch(next)
    }
   else { //create new cart
    //const params = req.body;
    //params['status'] = 'IN_CART';
    console.log("creating cart order", req.params)
    Order.findOrCreate ({
      where: {
        userId: req.user.id,
        status: 'IN_CART'
      },
      defaults: {
        status:'IN_CART',
        userId: req.user.id
      }
    })
    .then(order => order[0])
    .then(order=>{
      order.getLineItems()
      .then(lineItems => Promise.all(lineItems.map(lineItem=>lineItem.destroy())))
      .then( () => {
        console.log("order", order);
        const prodIds = Object.keys(req.body);
        console.log("req.body", req.body)
        const lineItems = prodIds
                  .map(prodId=>({quantity:req.body[prodId].quantity, productId:prodId}))
                  .filter(lineItem => lineItem.quantity > 0);

        console.log("LineITem created", lineItems)
        return LineItem.bulkCreate(lineItems,{individualHooks: true})
      })//there is only one item because user can add only 1 item at a time
      .then(lineItems => {
          console.log("lineItem", lineItems)
          return Promise.all(lineItems.map(lineItem=>lineItem.setOrder(order)))
      })
      .then(lineItems => order.setLineItems(lineItems))
    })
    .then(order => res.json(order))
    .catch (next);
  }
});


