const { defineConfig } = require('cypress')
const { verifyDownloadTasks } = require('cy-verify-downloads')

module.exports = defineConfig({
  e2e: {
    // baseUrl: 'http://localhost:3000/kursutveckling',
    baseUrl: 'https://www-r.referens.sys.kth.se/kursutveckling',
    watchForFileChanges: false,

    setupNodeEvents(on, config) {
      on('task', verifyDownloadTasks)

      // implement node event listeners here
    }
  }
})
