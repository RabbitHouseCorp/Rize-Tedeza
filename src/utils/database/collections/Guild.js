const mongoose = require('mongoose')
const Guild = new mongoose.Schema({
  id: { type: String },
  prefix: { type: String, default: process.env.PREFIX },
  channelReport: { type: String, default: '' },
  reportModule: { type: Boolean, default: false },
  lang: { type: String, default: 'en-US' },
  punishChannel: { type: String, default: '' },
  punishModule: { type: Boolean, default: false },
  partner: { type: Boolean, default: false },
  animu: { type: Boolean, default: false },
  animuChannel: { type: String, default: '' },
  antiflood: {
    type: Object,
    default: {
      enabled: false,
      messagesLimit: 5
    }
  }
})

const guilds = mongoose.model('Guilds', Guild)
module.exports = guilds