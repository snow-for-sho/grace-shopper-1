const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email', 'address', 'phone', 'firstName', 'lastName']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.put('/', (req, res, next) => {
  User.findById(+req.user.id)
  .then (user => user.update(req.body))
  .then(user=>res.json(user))
  .catch(next)
})