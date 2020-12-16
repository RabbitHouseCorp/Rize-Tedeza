const { EventListener, Logger } = require('../utils')

module.exports = class ShardDisconnectListener extends EventListener {
    constructor() {
        super('shardDisconnect')
    }

    run(client, err, shardID) {
        Logger.error(`An error has been ocorred in shard ${shardID}: ${err?.message}`)
    }
}
