
const settings = require('./settings.js')
const database = require('./database/database.js')
const server = require('./server.js')


const main = async function () {

    try {
        await database.setup(settings);

        await server.setup(settings);
    } catch (e) {
        console.log('Error thrown while setting up')
        console.log(e)
    }
    
}

main()

