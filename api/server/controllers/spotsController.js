
const { sequelize, Spot, Version, Section, Image } = require('../models.js')

exports.create = async function (object) {

    const options = {
        include: [{ all: true, nested: true }]
    }

    // create a new spot
    let spot = await Spot.create()

    // save the document
    let version = await Version.create(object, options)

    // associate the two
    await spot.addVersion(version)
    await spot.setCurrentVersion(version)

    return spot

}

exports.getAllCurrent = async function () {

    const options = {
        attributes: [ 'id' ],
        include: [
            {
                model: Version,
                as: 'CurrentVersion',
                attributes: [ 'created', 'name', 'lat', 'lng', 'description' ],
                include: [
                    { 
                        model: Section,
                        attributes: [ 'heading', 'body']
                    }, 
                    { 
                        model: Image,
                        attributes: [ 'id' ] 
                    }
                ]
            }
        ]    
    }

    return await Spot.findAll(options)

}