const express = require('express')
const bodyParser = require('body-parser')
const logger = require('./logger.js')

function Server () {

    this.server = null

}

Server.prototype.setup = function (settings) {

    const promise = new Promise((resolve, reject) => {

        logger.log('Binding http server to port: ' + settings.API_PORT)

        this.server = express()

        this.server.use(bodyParser.json())
    
        this.server.use('/api', require('./routers/spotsRouter.js'))
        this.server.use('/api', require('./routers/authRouter.js'))
        this.server.use('/api', require('./routers/sitemapRouter.js'))

        this.server.use(require('./handlers/errorHandler.js'))
        
        this.server.get('/', (req, res) => {
            res.send('API ok')
        })
            
        this.server.listen(settings.API_PORT, resolve).on('error', reject)

    })

    return promise

}

module.exports = new Server()