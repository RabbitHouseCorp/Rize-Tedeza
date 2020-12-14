const { Client } = require('eris')
const { readdir } = require('fs')
const { Logger } = require('./utils')

module.exports = class RizeClient extends Client {
    constructor(token, options) {
        super(token, options)
        this.aliases = new Map()
        this.commands = new Map()
        this.db
    }

    connect() {
        super.connect()
        this.registerCommands()
        this.registerEvents()
        Logger.log('Starting...')
        const db = require('./utils/database/Database')
        this.db = new db()

        return this
    }

    registerCommands() {
        readdir(`${__dirname}/commands`, (e, f) => {
            if (e) return Logger.error(e.message)
            f.forEach((category) => {
                readdir(`${__dirname}/commands/${category}`, (e, cmd) => {
                    if (e) return Logger.error(e.message)
                    
                    const Command = require(`${__dirname}/commands/${category}/${cmd}`)
                    const command = new Command()
                    this.commands.set(command.config.name, command)
                    Logger.log(`Loaded command: ${command.config.name}`)
                    command.config.aliases.forEach((alias) => this.aliases.et(alias, command.config.name))
                })
            })
        })
    }

    registerEvents() {
        readdir(`${__dirname}/events`, (e, f) => {
            if (e) return Logger.error(e.message)
            for (const event of f) {
                
                const Events = require(`${__dirname}/events/${event}`)
                const events = new Events()
                Logger.log(`Loaded event: ${events.name}`)
                super.on(events.name, (...args) => events.run(this, ...args))
            }
        })
    }
}