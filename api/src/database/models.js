
const Sequelize = require('sequelize')
const uuid = require('uuid/v4')
const shortid = require('shortid')
const database = require('./database.js')
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@')

const tableOptions = { underscored: true, timestamps: false, freezeTableName: true }


const Spot = database.sequelize.define('spots', {
    id: { type: Sequelize.STRING, defaultValue: shortid.generate, primaryKey: true }
}, tableOptions)

const Version = database.sequelize.define('versions', {

    id: { type: Sequelize.UUID, defaultValue: uuid, primaryKey: true, allowNull: false },
    created: { type: Sequelize.DATE(3), defaultValue: Sequelize.NOW },
    name: Sequelize.STRING,
    lat: Sequelize.DOUBLE,
    lng: Sequelize.DOUBLE,
    description: Sequelize.TEXT

}, tableOptions)

const Section = database.sequelize.define('sections', {

    id: { type: Sequelize.UUID, defaultValue: uuid, primaryKey: true, allowNull: false },
    heading: Sequelize.STRING,
    body: Sequelize.TEXT,
    index: Sequelize.INTEGER

}, tableOptions)

const Image = database.sequelize.define('images', {

    id: { type: Sequelize.UUID, defaultValue: uuid, primaryKey: true, allowNull: false },
    name: Sequelize.STRING,
    index: Sequelize.INTEGER,
    url: {
        type: new Sequelize.VIRTUAL(Sequelize.STRING, ['name']),
        get: function () {
            return (process.env.AWS_S3_URL + this.get('name'))
        }
    }

}, tableOptions)

Spot.hasMany(Version, { foreignKey: 'spot_id' })
Spot.Version = Spot.belongsTo(Version, { foreignKey: 'current_version_id', as: 'current', targetKey: 'id', constraints: false })

Version.hasMany(Section)
Version.hasMany(Image)

//sequelize.drop()
database.sequelize.sync({ force: false })

module.exports = { Spot, Version, Section, Image }