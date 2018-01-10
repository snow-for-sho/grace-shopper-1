const router = require('express').Router()
const {Category} = require('../db/models')
module.exports = router

// see all categories
router.get('/', (req, res, next) => {
  Category.findAll()
  .then(categories => res.json(categories))
  .catch(next)
})



// see a specific category, found by ID
router.get('/:id', (req, res, next) => {
  Category.findById(req.params.id)
  .then(category => res.json(category))
  .catch(next)
})

// see a specific category, found by title
router.get('/titles/:title', (req, res, next) => {
  const title = req.params.title;
  Category.findOne({
    where: {
      title: title
    }
  })
  .then(category => res.json(category))
  .catch(next)
});

// Create a category
router.post('/', function (req, res, next) {
  Category.create(req.body)
    .then(category => res.json(category))
    .catch(next);
});

// Update a Category by ID
router.put('/:id', function (req, res, next) {
  const id = req.params.id;

  Category.findById(id)
    .then(category => category.update(req.body))
    .catch(next);
});

// Update a category by title
router.put('/:title', function (req, res, next) {
  const title = req.params.title;

  Category.findOne({
    where: {
      title: title
    }
  })
  .then(category => category.update(req.body))
  .catch(next);
});

// Delete a category
router.delete('/:id', function (req, res, next) {
  const id = req.params.id;

  Category.destroy({ where: { id } })
    .then(() => res.status(204).end())
    .catch(next);
});
