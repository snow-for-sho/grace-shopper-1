const router = require('express').Router()
const {Category} = require('../db/models')
module.exports = router

// Gets all categories, or one category based on query string
router.get('/', (req, res, next) => {
  const title = req.query.title;

  if (title) {
    Category.findAll({where: {title}})
    .then(categories => res.json(categories))
    .catch(next)
  } else {
    Category.findAll()
    .then(categories => res.json(categories))
    .catch(next)
  }
})

// Gets a category by ID
router.get('/:id', (req, res, next) => {
  Category.findById(req.params.id)
  .then(category => res.json(category))
  .catch(next)
})

// Create a category
router.post('/', function (req, res, next) {
  Category.create(req.body)
    .then(category => res.json(category))
    .catch(next);
});

// Update a record by title or ID

router.put('/', function (req, res, next) {
  const id = req.query.id;
  const title = req.query.title;

  if (title) {
    Category.findOne({
      where: {
        title: title
      }
    })
    .then(category => category.update(req.body))
    .catch(next);
  } else if (id) {
    Category.findById(id)
    .then(category => category.update(req.body))
    .catch(next);
  }
});


// Delete a category
router.delete('/:id', function (req, res, next) {
  const id = req.params.id;

  Category.destroy({ where: { id } })
    .then(() => res.status(204).end())
    .catch(next);
});
