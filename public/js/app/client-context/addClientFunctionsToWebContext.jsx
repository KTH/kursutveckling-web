'use strict'

import axios from 'axios'

function setBrowserConfig(config, paths, hostUrl) {
  this.browserConfig = config
  this.paths = paths
  this.hostUrl = hostUrl
}
function addClientFunctionsToWebContext() {
  const functions = {
    setBrowserConfig,
  }
  return functions
}

export { addClientFunctionsToWebContext }
