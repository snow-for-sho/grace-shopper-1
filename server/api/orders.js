const router = require('express').Router();
const { Order } = require ('../db/models');
const { User } = require ('../db/models');


// get orders by user
router.get('/:id/orders', (req,res, next) => {
  const userId = req.params.id;
  return Order.findAll({where: { userId }})
    .then(orders => res.json(orders))
    .catch(next);
});

// get single order for a single user
router.get('/:id/orders/:orderid', (req,res, next) => {
  return Order.findById(orderid)
    .then(orders => res.json(orders))
    .catch(next);
});

// post - create order for specific user
router.post('/:id/orders', (req, res, next) => {
  let newOrder = req.body;
  newOrder['userId'] = req.params.id;
  return Order.create(newOrder)
    .then(order => res.json(order))
    .catch(next);
});

// put(admin only) - change status of order

router.put('/:id/orders/:orderid', (req, res, next) => {
  return Order.findById(req.params.orderid)
    .then(order => {
      if (!order) {return res.sendStatus(404);}
      else {
        order.update(req.body)
          .then(updateOrder => {
            res.json(updateOrder);
          });
      }
    });
});