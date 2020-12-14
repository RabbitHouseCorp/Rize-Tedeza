const RizeClient = require('./src/RizeClient')
const { token, options } = require('./config')
const client = new RizeClient(token, options)
client.connect()