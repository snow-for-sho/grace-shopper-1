const router = require('express').Router()
const {Review} = require('../db/models')
module.exports = router

router.post('/', function (req, res, next) {
    if (req.user.id) {
        console.log("Posting review")
        req.body['userId'] = req.user.id
        Review.create(req.body)
        .then(review => {
            console.log("Review posted", review);
            res.json(review)
        })
        .catch(next);
    } else {
        res.json("Not logged in")
    }
})

