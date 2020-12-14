const { Eris } = require('eris')
module.exports = class CommandContext {
    constructor(client, msg, args, db) {

        /**
         * 
         * @param client {Eris.Client}
         * @param msg {Eris.Message}
         * @param args {Array<String>}
         * @param db
         */
        this.client = client
        this.msg = msg
        this.args = args
        this.db = db
    }

    send(content, object) {
        if (object) {
            if (typeof object.embed === 'object') content = { content, embed: object.embed }
            if (object.code === 'js') content = `\`\`\`js\n${content}\`\`\``
        }

        this.msg.channel.createMessage(content)
    }
}