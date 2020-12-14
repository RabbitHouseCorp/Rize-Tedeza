const CommandContext = require('./CommandContext')
const config = require('../../../config')
module.exports = class CommandRunner {
    static async run(client, message) {
        if (message.author.bot) return
        if (message.channel.type !== 0) return

        if (!message.content.startsWith(config.prefix)) return
        const args = message.content.slice(config.prefix.length).trim().split(/ +/g)
        const cmd = args.shift().toLowerCase()
        const command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd))
        if (!command) return
        const ctx = new CommandContext(client, message, args, {
            user: null,
            guild: null,
            database: {

            }
        })
        message.channel.sendTyping()
        if (command.config.dev && !config.owner.includes(message.author.id)) return ctx.send({
            title: 'Missing permission',
            description: 'You\'re not one of my developers.'
        })

        command.run(ctx)
    }
}