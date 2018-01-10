'use strict';


const router = require('express').Router();
const { Order } = require('../db/models');

module.exports = router;

// see all orders
router.get('/', (req, res, next) => {
  Order.findAll({
    attributes: ['items', 'status', 'subTotal', 'total', 'recipientName', 
    'recipientEmail', 'recipientAddress', 'recipientPhone', 
    'recipientInstructions']
  })
  .then(orders => res.json(orders))
  .catch(next);
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
