const { EventListener, Logger } = require('../utils')

module.exports = class ShardReadyListener extends EventListener {
    constructor() {
        super('shardReady')
    }

    run(client, shardID) {
        Logger.log(`Shard ${shardID} is ready`)
    }
}