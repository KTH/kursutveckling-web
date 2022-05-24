'use strict'

const log = require('@kth/log')
const config = require('./configuration').server
const redis = require('kth-node-redis')
const connections = require('@kth/api-call').Connections

const opts = {
  log,
  redis,
  cache: config.cache,
  timeout: 30000,
  retryOnESOCKETTIMEDOUT: true,
  checkAPIs: true // performs api-key checks against the apis, if a "required" check fails, the app will exit. Required apis are specified in the config
}

const api = connections.setup(config.nodeApi, config.apiKey, opts)

module.exports = api