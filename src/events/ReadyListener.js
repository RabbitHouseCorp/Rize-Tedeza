const { EventListener, Logger } = require('../utils')
module.exports = class ReadyListener extends EventListener {
    constructor() {
        super('ready')
    }

    run(client) {
        Logger.log(`Connected in: ${client.user.username}#${client.user.discriminator}`)
        const game = [
            { name: 'who boosted Rabbit House Coffee', type: 3 },
            { name: 'Gochuumon wa Usagi Desu Ka?', type: 3 }
        ]

        setInterval(() => {
            client.editStatus('online', game[Math.floor(Math.random() * game.length)])
        }, 15000)
    }
}