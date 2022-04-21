'use strict'
const log = require('kth-node-log')
const language = require('@kth/kth-node-web-common/lib/language')
const ReactDOMServer = require('react-dom/server')
const sortedKursutveckligApiInfo = require('../apiCalls/kursutvecklingApi')
const filteredKoppsData = require('../apiCalls/koppsApi')
const { getSortedAndPrioritizedMiniMemosWebOrPdf } = require('../apiCalls/kursPmDataApi')

const i18n = require('../../i18n')
const { browser: browserConfig, server: serverConfig } = require('../configuration')

const serverPaths = require('../server').getPaths()

const { getServerSideFunctions } = require('../utils/serverSideRendering')

async function getCourseDevInfo(req, res, next) {
  try {
    const { courseCode } = req.params
    const lang = language.getLanguage(res) || 'sv'
    const langIndex = lang === 'en' ? 0 : 1

    const { getCompressedData, renderStaticPage } = getServerSideFunctions()

    // Browser config.
    const browser = {
      browserConfig,
      paths: serverPaths,
      apiHost: serverConfig.hostUrl
    }

    // Domain data.
    const adminContext = {
      ...browser,
      // TODO: check that await is not skipped, ie that data is written to object even if there is delay
      courseKoppsData: await filteredKoppsData(courseCode, lang),
      analysisData: await sortedKursutveckligApiInfo(courseCode),
      miniMemosPdfAndWeb: (await getSortedAndPrioritizedMiniMemosWebOrPdf(courseCode)) || []
    }

    const { uri: proxyPrefix } = serverConfig.proxyPrefixPath

    const view = renderStaticPage({})

    const html = ReactDOMServer.renderToString(renderProps)
    res.render('course/index', {
      aboutCourse: {
        siteName: `${i18n.messages[langIndex].messages.page_about_course} ${courseCode}`,
        siteUrl: serverConfig.hostUrl + '/student/kurser/kurs/' + courseCode
      },
      debug: 'debug' in req.query,
      description: i18n.messages[langIndex].messages.description,
      html,
      initialState: JSON.stringify(hydrateStores(renderProps)),
      instrumentationKey: serverConfig.appInsights.instrumentationKey,
      lang,
      title: courseCode + ' | ' + i18n.messages[langIndex].messages.title
    })
  } catch (err) {
    log.error('Error in getCourseDevInfo', { error: err })
    next(err)
  }
}

function getErrorPage(req, res) {
  const lang = language.getLanguage(res) || 'sv'

  const html =
    lang === 'en'
      ? 'No course code was entered. Try to add a course code to the existing web browser addresss'
      : 'Web addressen saknar en kurskod. Försöka med att lägga till en kurskod till addressen.'

  res.render('noCourse/index', {
    html,
    lang,
    initialState: 'Ingen kurskod'
  })
}

module.exports = {
  getCourseDevInfo,
  getErrorPage
}
