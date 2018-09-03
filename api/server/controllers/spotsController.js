
const boom = require('boom')

const { Spot, Version, Section, Image, sequelize } = require('../models.js')

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

        order: [
          [ { model: Version, as: 'CurrentVersion'} , Image, 'index', 'ASC' ],
          [ { model: Version, as: 'CurrentVersion'} , Section, 'index', 'ASC' ]
        ],

        include: [
            {
                model: Version,
                as: 'CurrentVersion',
                attributes: [ 'created', 'name', 'lat', 'lng', 'description' ],
                include: [
                    { 
                        model: Section,
                        attributes: [ 'index', 'heading', 'body']
                    }, 
                    { 
                        model: Image,
                        attributes: [ 'id', 'index' ]
                    }
                ]
            }
        ]    
    }

    return await Spot.findAll(options)

}

exports.getAllVersions = async function () {

    const options = {
        attributes: [ 'id' ],

        order: [
            [ Version, Image, 'index', 'ASC' ],
            [ Version, Section, 'index', 'ASC' ]
        ],

        include: [
            {
                model: Version,
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

// get current spot version, throw err if spot not found
exports.getCurrentById = async function (id) {

    const options = {
        attributes: [ 'id' ],
        where: { id: id },
        
        order: [
            [ { model: Version, as: 'CurrentVersion'} , Image, 'index', 'ASC' ],
            [ { model: Version, as: 'CurrentVersion'} , Section, 'index', 'ASC' ]
        ],

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

    let spot = await Spot.findOne(options)

    if (spot) return spot
    else throw boom.notFound('Spot not found for id: ' + id)

}

// create new version of spot that already exists
exports.createNewVersion = async function (spotId, object) {

    const findOptions = {
        where: { id: spotId }
    }

    const options = {
        include: [{ all: true, nested: true }]
    }

    let spot = await Spot.findOne(findOptions)
    if (!spot) throw boom.notFound('Spot not found for id: ' + spotId)

    // save the document
    let version = await Version.create(object, options)

    // associate the two
    await spot.addVersion(version)
    await spot.setCurrentVersion(version)

    return spot

}

// remove the latest version and reset the current version id
// if there is only one version, remove the spot
exports.rollback = async function (id) {

    const findOptions = {
        where: { id: id },
        order: [[ Version, 'created', 'DESC' ]],
        include: [{ all: true, nested: true }]
    }

    const deleteOptions = {
        include: [{ all: true, nested: true }]
    }

    let spot = await Spot.findOne(findOptions)

    if (spot.versions.length === 1) {
        await spot.versions[0].destroy(deleteOptions)
        await spot.destroy()
    } else {
        await spot.versions[0].destroy(deleteOptions)
        await spot.setCurrentVersion(spot.versions[1])
    }

}