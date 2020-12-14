const Logger = require('../Logger')
const guilds = require('./collections/Guild')
const users = require('./collections/User')
const Collection = require('./Collection')
const mongoose = require('mongoose')

module.exports = class Database {
    constructor() {
        mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
            if (err) return Logger.error(`Unable to connect to the database: ${err.message}`)

            Logger.log('Connected to the database.')
        })

        this.users = new Collection(users)
        this.guilds = new Collection(guilds)
    }
}