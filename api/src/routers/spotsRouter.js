
const router = require('express').Router()
const Spot = require('../controllers/spotsController.js')

router.get('/spots', (req, res, next) => {

    if (req.query.versions==='all') {
        Spot.getAllVersions()
            .then(items => res.send(items))
            .catch(next)
    } else {
        Spot.getAllCurrent()
        .then(items => res.send(items))
        .catch(next)
    }

})

router.post('/spots', (req, res, next) => {

    Spot.create(req.body)
        .then(item => res.status(201).json(item))
        .catch(next)

})

router.get('/spots/:id', (req, res, next) => {

    Spot.getCurrentById(req.params.id)
        .then(item => res.send(item))
        .catch(next)

})

router.put('/spots/:id', (req, res, next) => {

    Spot.createNewVersion(req.params.id, req.body)
        .then(item => res.send(item))
        .catch(next)

})

router.delete('/spots/:id', (req, res, next) => {
    Spot.rollback(req.params.id)
        .then(item => res.status(204).send(item))
        .catch(next)
})


module.exports = router