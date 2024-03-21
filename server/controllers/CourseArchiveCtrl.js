'use strict'

const log = require('@kth/log')
const language = require('@kth/kth-node-web-common/lib/language')
const filteredKoppsData = require('../apiCalls/koppsApi')
const sortedKursutveckligApiInfo = require('../apiCalls/kursutvecklingApi')
const i18n = require('../../i18n')
const { browser: browserConfig, server: serverConfig } = require('../configuration')
const paths = require('../server').getPaths()
const { getCourseMemosVersions } = require('../apiCalls/kursPmDataApi')
const { createBreadcrumbs } = require('../utils/breadcrumbUtil')
const { getServerSideFunctions } = require('../utils/serverSideRendering')
const { createServerSideContext } = require('../ssr-context/createServerSideContext')

function getFormattedSubHeadline(courseKoppsData, lang) {
  const unit = {
    en: 'credits',
    sv: 'hp'
  }
  const { courseCredits } = courseKoppsData
  const credits = lang === 'sv' ? courseCredits.toString().replace('.', ',') : courseCredits
  const formattedCredits = `${credits} ${unit[lang]}`

  const { courseCode, courseTitle } = courseKoppsData
  const subHeadline = `${courseCode} ${courseTitle}, ${formattedCredits}`

  return subHeadline
}

async function _getContent(req, res, next) {
  try {
    const { courseCode: cc } = req.params
    const courseCode = cc.toUpperCase()
    const lang = language.getLanguage(res) || 'sv'

    const { getCompressedData, renderStaticPage } = getServerSideFunctions()

    const webContext = { lang, proxyPrefixPath: serverConfig.proxyPrefixPath, ...createServerSideContext() }

    webContext.setBrowserConfig(browserConfig, paths, serverConfig.hostUrl)
    webContext.courseCode = courseCode
    webContext.userLang = lang
    webContext.courseKoppsData = await filteredKoppsData(courseCode, lang)
    webContext.analysisData = await sortedKursutveckligApiInfo(courseCode)
    webContext.courseMemos = await getCourseMemosVersions(courseCode, lang)
    webContext.subHeadline = getFormattedSubHeadline(webContext.courseKoppsData, lang)

    const compressedData = getCompressedData(webContext)

    const { uri: proxyPrefix } = serverConfig.proxyPrefixPath

    const view = renderStaticPage({
      applicationStore: {},
      location: req.url,
      basename: proxyPrefix,
      context: webContext
    })

    const breadcrumbsList = createBreadcrumbs(lang, courseCode)

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
      title: courseCode + ' | ' + i18n.message('title', lang),
      breadcrumbsList
    })
  } catch (err) {
    log.error('Error in _getContent in CourseArchiveCtrl', { error: err })
    next(err)
  }
}

module.exports = {
  getContent: _getContent
}
