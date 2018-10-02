
const settings = require('./settings.js')
const database = require('./database/database.js')
const server = require('./server.js')


const main = async function () {

    await database.setup(settings);

    await server.setup(settings);
    
}

main()

