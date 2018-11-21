const router = require('express').Router()
const sm = require('sitemap')
const Spot = require('../controllers/spotsController.js')


router.get('/sitemap', async (req, res) => {

    try {

        let sitemap = sm.createSitemap({
            hostname: 'https://kitethere.com',
            cacheTime: 600000
        })
    
        let spots = await Spot.getAllCurrent()
    
        spots.forEach(spot => {
            sitemap.add({ url: '/spots/'+spot.id })
        })
    
        sitemap.toXML((err, xml) => {
            if (err) {
                return res.status(500).end()
            }
            res.header('Content-Type', 'application/xml')
            res.send(xml)
        })

    } catch (err) {
        res.status(500).end()
    }


})

module.exports = router