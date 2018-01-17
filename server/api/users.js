const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    attributes: ['id', 'email', 'address', 'phone', 'firstName', 'lastName', 'isAdmin']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.put('/', (req, res, next) => {
  if (!req.body.id) res.sendStatus(404)
  User.findById(+req.body.id)

  .then(user => user.update({
    isAdmin: user.isAdmin?'FALSE':'TRUE'
  }))
  .then(user => {
    res.json(user)
  })
  .catch(next)
})

router.delete('/:id', function (req, res, next) {
  const id = req.params.id;

  User.destroy({ where: { id } })
    .then(() => res.status(204).end())
    .catch(next);
});
