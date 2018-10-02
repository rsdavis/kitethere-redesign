
function Logger () {

}

Logger.prototype.log = function (message) {

    const date = new Date()
    const dateString = date.toISOString().replace(/T|Z/g, ' ')

    const out = `${dateString}Log: ${message}\n`

    process.stdout.write(out)

}

Logger.prototype.error = function (message) {

    const date = new Date()
    const dateString = date.toISOString().replace(/T|Z/g, ' ')

    const out = `${dateString}Error: ${message}\n`

    console.error(out)

}

module.exports = new Logger()