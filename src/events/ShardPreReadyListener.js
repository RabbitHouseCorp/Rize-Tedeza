const { EventListener, Logger } = require('../utils')

module.exports = class ShardPreReadyListener extends EventListener {
    constructor() {
        super('shardPreReady')
    }

    run(client, shardID) {
        Logger.log(`Connecting shard ${shardID}...`)
    }
}