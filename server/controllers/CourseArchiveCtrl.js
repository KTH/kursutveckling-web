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

function getFormattedSubHeadline(courseKoppsData) {
  const unit = {
    en: 'credits',
    sv: 'hp'
  }
  const { courseCredits } = this.courseKoppsData
  const credits = this.userLang === 'sv' ? courseCredits.toString().replace('.', ',') : courseCredits
  const formattedCredits = `${credits} ${unit[this.userLang]}`

  const { courseCode, courseTitle } = this.courseKoppsData
  const subHeadline = `${courseCode} ${courseTitle}, ${this.formattedCredits}`

  return subHeadline
}

async function _getContent(req, res, next) {
  try {
    const { courseCode: cc } = req.params
    const courseCode = cc.toUpperCase()
    const lang = language.getLanguage(res) || 'sv'

    const { getCompressedData, renderStaticPage } = getServerSideFunctions()

    // Browser config.
    const browser = {
      browserConfig,
      proxyPrefixPath: serverConfig.proxyPrefixPath,
      paths: serverPaths,
      apiHost: serverConfig.hostUrl
    }

    const courseKoppsData = await filteredKoppsData(courseCode, lang)
    //console.log('===============================================')
    //console.log(`KOPPSDATA:${JSON.stringify(courseKoppsData)}`)
    //console.log('-----------------------------------------------')

    // Domain data.
    const archiveContext = {
      ...browser,
      courseCode,
      userLang: lang,
      // TODO: check that await is not skipped, ie that data is written to object even if there is delay
      courseKoppsData,
      courseMemos: await getCourseMemosVersions(courseCode, lang),
      analysisData: await sortedKursutveckligApiInfo(courseCode),
      subHeadline: getFormattedSubHeadline(courseKoppsData),
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
