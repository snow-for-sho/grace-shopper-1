'use strict';
const router = require('express').Router();
const { Order, LineItem } = require('../db/models');

module.exports = router;

// see all orders
router.get('/', (req, res, next) => {
  const carted = req.query.status;
  console.log('carted: ', carted)
  if (carted === 'IN_CART') {
    return Order.findOne({
      where: {status: 'IN_CART'},
      include: [{all: true, nested: true}]
    })
    .then(order => res.json(order))
    .catch(next)
  } else {
    return Order.findAll({
      attributes: ['status', 'subTotal', 'total', 'recipientName',
      'recipientEmail', 'recipientAddress', 'recipientPhone',
      'recipientInstructions']
    })
    .then(orders => res.json(orders))
    .catch(next);
  }
});

// see a specific order, found by ID
router.get('/:id', (req, res, next) => {
  Order.findById(req.params.id)
  .then(order => res.json(order))
  .catch(next);
});

// Create a order
router.post('/', function (req, res, next) {
  Order.create(req.body)
    .then(order => res.json(order))
    .catch(next);
});

// Update a order by ID
router.put('/:id', function (req, res, next) {
  const id = req.params.id;

  Order.findById(id)
    .then(order => order.update(req.body))
    .catch(next);
});
