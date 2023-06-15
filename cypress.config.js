const { defineConfig } = require('cypress')
const { verifyDownloadTasks } = require('cy-verify-downloads')

module.exports = defineConfig({
  e2e: {
    // baseUrl: 'http://localhost:3000/kursutveckling',
    baseUrl: 'https://www-r.referens.sys.kth.se/kursutveckling',
    env: {
      COURSE_CODE: 'SF1624'
    },
    watchForFileChanges: false,
    setupNodeEvents(on, config) {
      on('task', verifyDownloadTasks)

      // implement node event listeners here
    }
  }
})
