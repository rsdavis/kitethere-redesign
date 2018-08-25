
const Sequelize = require('sequelize')
const uuid = require('uuid/v4')
const shortid = require('shortid')
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@')

const tableOptions = { underscored: true, timestamps: false, freezeTableName: true }

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT
    }
)

const Spot = sequelize.define('spots', {
    id: { type: Sequelize.STRING, defaultValue: shortid.generate, primaryKey: true }
}, tableOptions)

const Version = sequelize.define('versions', {
    id: { type: Sequelize.UUID, defaultValue: uuid, primaryKey: true, allowNull: false },
    created: { type: Sequelize.DATE(3), defaultValue: Sequelize.NOW },
    name: Sequelize.STRING,
    lat: Sequelize.DOUBLE,
    lng: Sequelize.DOUBLE,
    description: Sequelize.TEXT
}, tableOptions)

const Section = sequelize.define('sections', {
    id: { type: Sequelize.UUID, defaultValue: uuid, primaryKey: true, allowNull: false },
    heading: Sequelize.STRING,
    body: Sequelize.TEXT
}, tableOptions)

const Image = sequelize.define('images', {
    id: { type: Sequelize.UUID, defaultValue: uuid, primaryKey: true, allowNull: false }
}, tableOptions)

Spot.hasMany(Version, { foreignKey: 'spot_id' })
Spot.belongsTo(Version, { foreignKey: 'current_version', as: 'CurrentVersion', constraints: false })

Version.hasMany(Section)
Version.hasMany(Image)

sequelize.drop()
sequelize.sync({ force: true })

module.exports = { sequelize, Spot, Version, Section, Image }