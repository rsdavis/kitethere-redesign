var server = require('express')()

server.get('/', (req, res) => {
    res.send('API ok')
})

server.listen(8000, () => console.log('Server listening on 8000'))