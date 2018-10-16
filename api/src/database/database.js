

const Sequelize = require('sequelize');
const assert = require('assert')
const retry = require('async-retry')
const logger = require('../logger.js')

function Database () {

    this.sequelize  = null

}

Database.prototype.setup = async function (settings) {

    assert(settings.DB_NAME,    'DB_NAME not provided')
    assert(settings.DB_DIALECT, 'DB_DIALECT not provided')

    logger.log('Connecting to database: ' + settings.DB_DIALECT)

    // create instance of database client
    this.sequelize = new Sequelize (
        settings.DB_NAME,
        settings.DB_USERNAME,
        settings.DB_PASSWORD, 
        {
            logging: false, 
            host: settings.DB_HOST, 
            dialect: settings.DB_DIALECT,
            operatorsAliases: false
         }
    )

    return this.testConnection()

}

Database.prototype.testConnection = async function () {
    
    const options = {
        retries: 5,
        onRetry: () => logger.log('Failed to connect to database, trying again ...')
    }

    return await retry(async bail => {

        let response = await this.sequelize.authenticate()
        logger.log('Database connection and authentication successful')
        return

    }, options)

}

module.exports = new Database()