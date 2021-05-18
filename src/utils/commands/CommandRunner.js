const CommandContext = require('./CommandContext')
const config = require('../../../config')
const Colors = require('../Colors')
const EmbedBuilder = require('../EmbedBuilder')
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
    if (command.config.dev && !config.owner.includes(message.author.id)) {
      const embed = new EmbedBuilder()
      embed.setColor(Colors['default'])
      embed.setTitle('Missing permission')
      embed.setDescription('You\'re not one of my developers.')

      ctx.send(embed.build())
      return
    }

    command.run(ctx)
  }
}