const server = require('express')()
const bodyParser = require('body-parser')


server.use(bodyParser.json())

server.get('/', (req, res) => {
    res.send('API ok')
})


server.use(require('./routers/spotsRouter.js'))

server.listen(8000, () => console.log('Server listening on 8000'))