'use strict'

require('dotenv').config()

const { KthAppinsights } = require('@kth/appinsights')
KthAppinsights.init({ name: 'kursutveckling-web' })

const config = require('./server/configuration').server
const server = require('./server/server')
const log = require('@kth/log')

/* ****************************
 * ******* SERVER START *******
 * ****************************
 */
// Exports a promise to use in integration tests
module.exports = server.start({
  useSsl: config.useSsl,
  pfx: config.ssl.pfx,
  passphrase: config.ssl.passphrase,
  key: config.ssl.key,
  ca: config.ssl.ca,
  cert: config.ssl.cert,
  port: config.port,
  logger: log
})
