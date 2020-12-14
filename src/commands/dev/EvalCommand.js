const { Command } = require('../../utils')
const util = require('util')
module.exports = class EvalCommand extends Command {
    constructor() {
        super({
            name: 'eval',
            category: 'dev',
            dev: true
        })
    }

    async run(ctx) {
        try {
            const util = require('util')
            let code = ctx.args.join(' ')
            if (code.includes(ctx.client.token)) code = undefined
            const ev = eval(code)
            let str = util.inspect(ev, {
                depth: 1
            })
            str = `${str.replace(new RegExp(`${ctx.client.token}`, 'g'), undefined)}`
            if (str.length > 1800) {
                str = str.substr(0, 1800)
                str = str + '...'
            }

            ctx.send(str, { code: 'js' })

        } catch (err) {
            ctx.send(err.message, { code: 'js' })
        }
    }
}