const router = require('express').Router()
const {Product, Category} = require('../db/models')
module.exports = router

// Gets all products, or one product based on query string title
router.get('/', (req, res, next) => {
  const title = req.query.title;

  if (title) {
    Product.findOne({
      where: {
        title: title
      }
    })
    .then(product => res.json(product))
    .catch(next)
  } else {
    Product.findAll({
      // explicitly select only certain fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['title', 'description', 'price', 'inventoryQty', 'photo', 'size', 'id']
    })
    .then(products => res.json(products))
    .catch(next)
  }
})

// Gets a product by ID
router.get('/:id', (req, res, next) => {
  Product.findById(req.params.id)
  .then(product => res.json(product))
  .catch(next)
})

// Create a product
router.post('/', function (req, res, next) {
  Product.create(req.body)
    .then(product => res.json(product))
    .catch(next);
});

// Update a product by title or ID
router.put('/', function (req, res, next) {
  const id = req.query.id;
  const title = req.query.title;

  if (title) {
    Product.findOne({
      where: {
        title: title
      }
    })
    .then(product => product.update(req.body))
    .catch(next);
  } else if (id) {
    Product.findById(id)
      .then(product => product.update(req.body))
      .catch(next);
  }
});

// Delete a product
router.delete('/:id', function (req, res, next) {
  const id = req.params.id;

  Product.destroy({ where: { id } })
    .then(() => res.status(204).end())
    .catch(next);
});
