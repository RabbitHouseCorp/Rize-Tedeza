const chalk = require("chalk")

module.exports = class Logger {
    static log(log) {
        console.log(`${chalk.bgBlue('RIZE TEDEZA')} ${chalk.blue('[LOG]')} ${log}`)
    }

    static error(log) {
        console.log(`${chalk.bgRed('RIZE TEDEZA')} ${chalk.red('[ERROR]')} ${log}`)
    }

    static debug(log) {
        console.log(`${chalk.bgYellow('RIZE TEDEZA')} ${chalk.yellow('[DEBUG]')} ${log}`)
    }
}