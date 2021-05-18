const { EventListener, Logger } = require('../utils')

module.exports = class ShardResumeListener extends EventListener {
  constructor() {
    super('shardResume')
  }

  run(client, shardID) {
    Logger.log(`Resumed shard ${shardID}.`)
  }
}