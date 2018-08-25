
const boom = require('boom')

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

exports.getAllVersions = async function () {

    const options = {
        attributes: [ 'id' ],
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

    // create a new spot
    let spot = await Spot.findOne(findOptions)
    if (!spot) throw boom.notFound('Spot not found for id: ' + id)

    // save the document
    let version = await Version.create(object, options)

    // associate the two
    await spot.addVersion(version)
    await spot.setCurrentVersion(version)

    return spot

}

sortByDate = (versions) => {
    return versions.sort((a, b) => { return a.created < b.created })
}

exports.rollback = async function (id) {

    const deleteOptions = {
        include: [{ all: true, nested: true }]
    }

    let spot = await Spot.findOne({where: {id: id}})
    if (!spot) throw boom.notFound('Spot not found for id: ' + id)

    let versions = await spot.getVersions()
    versions = sortByDate(versions)

    if (versions.length === 1) {
        await versions[0].destroy(deleteOptions)
        await spot.destroy()
    } else {
        await versions[0].destroy(deleteOptions)
        await spot.setCurrentVersion(versions[1])
    }

    return ''
}