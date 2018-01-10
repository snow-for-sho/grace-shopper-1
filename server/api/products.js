const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

// see all products
router.get('/', (req, res, next) => {
  Product.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['title', 'description', 'price', 'inventoryQty', 'photo', 'reviews']
  })
  .then(products => res.json(products))
  .catch(next)
})

// see a specific product, found by ID
router.get('/:id', (req, res, next) => {
  Product.findById(req.params.id)
  .then(product => res.json(product))
  .catch(next)
})

// JM - if you want to search by fields use querystring
// see a specific product, found by title
router.get('/:title', (req, res, next) => {
  const title = req.params.title;

  Product.findOne({
    where: {
      title: title
    }
  })
  .then(product => res.json(product))
  .catch(next)
});

// Create a product
router.post('/', function (req, res, next) {
  Product.create(req.body)
    .then(product => res.json(product))
    .catch(next);
});

// JM - as long as you are aware of this issue! :id and :title
// Update a product by ID
router.put('/:id', function (req, res, next) {
  const id = req.params.id;

  Product.findById(id)
    .then(product => product.update(req.body))
    .catch(next);
});

// Update a product by title
router.put('/:title', function (req, res, next) {
  const title = req.params.title;

  Product.findOne({
    where: {
      title: title
    }
  })
  .then(product => product.update(req.body))
  .catch(next);
});

// Delete a product
router.delete('/:id', function (req, res, next) {
  const id = req.params.id;

  Product.destroy({ where: { id } })
    .then(() => res.status(204).end())
    .catch(next);
});
