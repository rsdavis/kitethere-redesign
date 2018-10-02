function Settings () {

    this.DB_HOST        = process.env.DB_HOST       || null
    this.DB_USERNAME    = process.env.DB_USERNAME   || null
    this.DB_PASSWORD    = process.env.DB_PASSWORD   || null
    this.DB_NAME        = process.env.DB_NAME       || 'kitethere'
    this.DB_DIALECT     = process.env.DB_DIALECT    || 'sqlite'
    this.NODE_ENV       = process.env.NODE_ENV      || 'development'
    this.API_PORT       = process.env.API_PORT      || '8000'

}

module.exports = Object.freeze(new Settings())