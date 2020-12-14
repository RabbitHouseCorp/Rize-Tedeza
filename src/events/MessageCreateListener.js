const { EventListener, CommandRunner } = require('../utils')
module.exports = class MessageCreateListener extends EventListener {
    constructor() {
        super('messageCreate')
    }

    async run(client, message) {
        await CommandRunner.run(client, message)
    }
}