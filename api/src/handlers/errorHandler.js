const boom = require('boom')
const Sequelize = require('sequelize')

module.exports = (err, req, res, next) => {
    if (err instanceof boom)
        return res.status(err.output.statusCode).json(err.output.payload)
    else if (err instanceof Sequelize.Error) {
        console.log(err)
        return res.status(500).json(boom.badImplementation(err).output.payload)
    }
    else {
        console.log(err)
        return res.status(500).json(err)
    }
}