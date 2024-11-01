'use strict'

function setBrowserConfig(config, paths, hostUrl) {
  this.browserConfig = config
  this.paths = paths
  this.hostUrl = hostUrl
}

function createServerSideContext() {
  const context = {
    courseCode: '',
    userLang: 'sv',
    courseData: {
      courseCode: '',
      courseTitle: '',
      courseFormattedCredits: '',
      courseDataLang: 'sv'
    },
    analysisData: undefined, // kursutveckling-api
    miniMemosPdfAndWeb: [], // kurs-pm-data-api
    courseMemos: [],
    setBrowserConfig
  }
  return context
}

module.exports = { createServerSideContext }
