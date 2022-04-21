'use strict'

const log = require('kth-node-log')
const language = require('@kth/kth-node-web-common/lib/language')
const ReactDOMServer = require('react-dom/server')
const filteredKoppsData = require('../apiCalls/koppsApi')
const sortedKursutveckligApiInfo = require('../apiCalls/kursutvecklingApi')
const i18n = require('../../i18n')
const { browser: browserConfig, server: serverConfig } = require('../configuration')
const { getCourseMemosVersions } = require('../apiCalls/kursPmDataApi')

const serverPaths = require('../server').getPaths()

const { getServerSideFunctions } = require('../utils/serverSideRendering')

async function _getContent(req, res, next) {
  try {
    const { courseCode: cc } = req.params
    const courseCode = cc.toUpperCase()
    const lang = language.getLanguage(res) || 'sv'

    const { getCompressedData, renderStaticPage } = getServerSideFunctions()

    // Browser config.
    let archiveContext = {
      browserConfig,
      paths: serverPaths,
      apiHost : serverConfig.hostUrl,
    }

    // Domain data.
    archiveContext = {
      ...archiveContext,
      courseCode,
      userLang: lang,
      courseKoppsData: await filteredKoppsData(courseCode, lang),
      courseMemos: await getCourseMemosVersions(courseCode, lang),
      analysisData: await sortedKursutveckligApiInfo(courseCode),
    }

    const compressedData = getCompressedData(archiveContext)

    const { uri: proxyPrefix } = serverConfig.proxyPrefixPath

    const view = renderStaticPage({
      applicationStore: {},
      location: req.url,
      basename: proxyPrefix,
      context: archiveContext
                                  })

    res.render('archive/index', {
      aboutCourse: {
        siteName: `${i18n.message('page_about_course', lang)} ${courseCode}`,
        siteUrl: serverConfig.hostUrl + '/student/kurser/kurs/' + courseCode
      },
      debug: 'debug' in req.query,
      description: i18n.message('description', lang),
      html: view,
      compressedData,
      instrumentationKey: serverConfig.appInsights.instrumentationKey,
      lang,
      title: courseCode + ' | ' + i18n.message('title', lang)
    })
  } catch (err) {
    log.error('Error in _getContent in CourseArchiveCtrl', { error: err })
    next(err)
  }
}

module.exports = {
  getContent: _getContent
}
