'use strict'

function setBrowserConfig(config, paths, hostUrl) {
  this.browserConfig = config
  this.paths = paths
  this.hostUrl = hostUrl
}

function createServerSideContext() {
  const context = {
    courseCode: '',
    courseTitle: '',
    courseCredits: 0,
    userLang: 'sv',
    courseKoppsData: { //kopps-api
        courseCode: '',
        courseTitle: '',
        courseCredits: 0,
        koppsDataLang: 'sv'
      },
    analysisData: undefined, // kursutveckling-api
    miniMemosPdfAndWeb: [], // kurs-pm-data-api
    courseMemos: [],
    subHeadline: '',
    setBrowserConfig,
  }
  return context
}

module.exports = { createServerSideContext }

