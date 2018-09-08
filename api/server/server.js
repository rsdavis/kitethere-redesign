const server = require('express')()
const bodyParser = require('body-parser')


server.use(bodyParser.json())

server.use('/api', require('./routers/spotsRouter.js'))

server.use('/api', require('./errorHandler.js'))

server.get('/', (req, res) => {
    res.send('API ok')
})


server.listen(8000, () => console.log('Server listening on 8000'))