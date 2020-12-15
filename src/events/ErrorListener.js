const { EventListener, Logger } = require('../utils')

module.exports = class ErrorListener extends EventListener {
    constructor() {
        super('error')
    }

    run(client, err, shardID) {
        Logger.error(`An error has been ocorred in shard ${shardID}: ${err.message}`)
        client.shards.get(shardID).connect
    }
}