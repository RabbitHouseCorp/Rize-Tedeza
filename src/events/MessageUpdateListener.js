const { EventListener } = require('../utils')

module.exports = class MessageUpdateListener extends EventListener {
    constructor() {
        super('messageUpdate')
    }

    run(client, message, oldMessage) {
        if (message?.content === oldMessage?.content) return

        client.emit('messageUpdate', message)
    }
}