'use strict'

const log = require('@kth/log')
const language = require('@kth/kth-node-web-common/lib/language')
const { sortedAnalysisDataFromCanvas, sortedAnalysisDataFromAdminWeb } = require('../apiCalls/kursutvecklingApi')
const { getSortedAndPrioritizedMiniMemosWebOrPdf } = require('../apiCalls/kursPmDataApi')

const i18n = require('../../i18n')
const browserConfig = require('../configuration').browser
const serverConfig = require('../configuration').server
const paths = require('../server').getPaths()
const { createBreadcrumbs } = require('../utils/breadcrumbUtil')
const { getServerSideFunctions } = require('../utils/serverSideRendering')
const { createServerSideContext } = require('../ssr-context/createServerSideContext')
const { createCourseData } = require('./helperFunctions')

async function getCourseDevInfo(req, res, next) {
  const { courseCode } = req.params
  const lang = language.getLanguage(res) || 'sv'
  const langIndex = lang === 'en' ? 0 : 1
  let klaroAnalyticsConsentCookie = false
  if (req.cookies.klaro) {
    const consentCookiesArray = req.cookies.klaro.slice(1, -1).split(',')
    // eslint-disable-next-line prefer-destructuring
    const analyticsConsentCookieString = consentCookiesArray
      .find((cookie) => cookie.includes('analytics-consent'))
      .split(':')[1]
    // eslint-disable-next-line no-const-assign
    klaroAnalyticsConsentCookie = analyticsConsentCookieString === 'true'
  }

  try {
    const { getCompressedData, renderStaticPage } = getServerSideFunctions()
    const webContext = { lang, proxyPrefixPath: serverConfig.proxyPrefixPath, ...createServerSideContext() }

    webContext.setBrowserConfig(browserConfig, paths, serverConfig.hostUrl)
    webContext.courseCode = courseCode
    webContext.userLang = lang
    webContext.courseData = await createCourseData(courseCode, lang)
    webContext.analysisDataAdminWeb = await sortedAnalysisDataFromAdminWeb(courseCode)
    webContext.analysisDataCanvas = await sortedAnalysisDataFromCanvas(courseCode)
    webContext.miniMemosPdfAndWeb = await getSortedAndPrioritizedMiniMemosWebOrPdf(courseCode)

    const compressedData = getCompressedData(webContext)

    const { uri: proxyPrefix } = serverConfig.proxyPrefixPath

    const view = renderStaticPage({
      applicationStore: {},
      location: req.url,
      basename: proxyPrefix,
      context: webContext
    })

    const breadcrumbsList = createBreadcrumbs(lang, courseCode)

    res.render('course/index', {
      compressedData,
      aboutCourse: {
        siteName: `${i18n.messages[langIndex].messages.page_about_course} ${courseCode}`,
        siteUrl: serverConfig.hostUrl + '/student/kurser/kurs/' + courseCode
      },
      debug: 'debug' in req.query,
      description: i18n.messages[langIndex].messages.description,
      html: view,
      lang,
      title: courseCode + ' | ' + i18n.messages[langIndex].messages.title,
      klaroAnalyticsConsentCookie,
      toolbarUrl: serverConfig.toolbar.url,
      breadcrumbsList,
      proxyPrefix,
      theme: 'student-web'
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

  const breadcrumbsList = createBreadcrumbs(lang, courseCode)

  res.render('noCourse/index', {
    html,
    lang,
    title: 'Ingen kurskod',
    toolbarUrl: serverConfig.toolbar.url,
    breadcrumbsList,
    proxyPrefix,
    theme: 'student-web'
  })
}

module.exports = {
  getCourseDevInfo,
  getErrorPage
}
