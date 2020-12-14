const { Command, EmbedBuilder, Colors } = require('../../utils')
module.exports = class PingCommand extends Command {
    constructor() {
        super({
            name: 'ping',
            category: 'misc'
        })
    }

    run(ctx) {
        const embed = new EmbedBuilder()
        embed.setColor(Colors['default'])
        embed.setTitle('What\'s my latency?')
        embed.setDescription(`**Ping:**: ${ctx.msg.channel.guild.shard.latency}ms\n**Shard:** ${ctx.msg.channel.guild.shard.id}/${ctx.client.shards.size}`)
        
        ctx.send(embed.build())
    }
}