const { EventListener, EmbedBuilder, Colors, Logger } = require('../utils')
const { boosterInfo } = require('../../config')
module.exports = class GuildMemberUpdateListener extends EventListener {
  constructor() {
    super('guildMemberUpdate')
  }

  async run(client, guild, member, oldMember) {
    if (guild.id !== boosterInfo.guildID) return
    if (guild.premiumSubscriptionCount > 40) return
    const embed = new EmbedBuilder()
    embed.setColor(Colors['default'])
    embed.setAuthor(`${member.user.username}#${member.user.discriminator} thank you!`, member.user.avatarURL)
    embed.setDescription(`${member.user.mention} boosted \`${guild.name}\`. Thank you very much! I added ${Number(boosterInfo.value).toLocaleString()} yens into your account as a reward for boosting. Enjoy and call your friend to chat with us. Again: thanks.`)
    embed.setThumbnail(member.user.avatarURL)

    if (!oldMember.premiumSince && member.premiumSince) {
      if (!member.roles.includes(boosterInfo.donateRoleID)) {
        member.addRole(boosterInfo.donateRoleID)
      }
      let user = await client.db.users.getOrCreate(member.user.id)
      user.yens += Math.round(boosterInfo.value)
      user.save()
      guild.channels.get(boosterInfo.channelID)
        .createMessage(embed.build(member.user.mention))
      try {
        const dmChannel = await member.user.getDMChannel()
        dmChannel.createMessage(`Hey ${member.user.mention}, thanks for boosting the \`${guild.name}\`, I added **${Number(boosterInfo.value).toLocaleString()}** yens into your account.`)
      } catch {
        Logger.error(`The direct message of ${member.user.username}#${member.user.discriminator} are closed.`)
      }
    }

    if (oldMember.premiumSince && !member.premiumSince) {
      if (member.roles.includes(boosterInfo.donateRoleID)) {
        member.removeRole(boosterInfo.donateRoleID)
      }
    }
  }
}
