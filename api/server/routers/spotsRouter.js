
const router = require('express').Router()
const Spot = require('../controllers/spotsController.js')

router.get('/spots', (req, res, next) => {

    Spot.getAllCurrent()
        .then(items => res.send(items))
        .catch(next)

})

router.post('/spots', (req, res, next) => {
    Spot.create(req.body)
        .then(item => res.send(item))
        .catch(next)
})




module.exports = router