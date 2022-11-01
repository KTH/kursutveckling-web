'use strict'

const log = require('@kth/log')
const language = require('@kth/kth-node-web-common/lib/language')
const sortedKursutveckligApiInfo = require('../apiCalls/kursutvecklingApi')
const filteredKoppsData = require('../apiCalls/koppsApi')
const { getSortedAndPrioritizedMiniMemosWebOrPdf } = require('../apiCalls/kursPmDataApi')

const i18n = require('../../i18n')
const browserConfig = require('../configuration').browser
const serverConfig = require('../configuration').server
const paths = require('../server').getPaths()
const { getServerSideFunctions } = require('../utils/serverSideRendering')
const { createServerSideContext } = require('../ssr-context/createServerSideContext')

async function getCourseDevInfo(req, res, next) {
  const { courseCode } = req.params
  const lang = language.getLanguage(res) || 'sv'
  const langIndex = lang === 'en' ? 0 : 1
  let klaroConsentCookie = false
  if (req.cookies.klaro) {
    const consentCookiesArray = req.cookies.klaro.slice(1, -1).split(',')
    // eslint-disable-next-line prefer-destructuring
    const analyticsConsentCookieString = consentCookiesArray
      .find((cookie) => cookie.includes('analytics-consent'))
      .split(':')[1]
    // eslint-disable-next-line no-const-assign
    klaroConsentCookie = analyticsConsentCookieString === 'true'
  }

  try {
    const { getCompressedData, renderStaticPage } = getServerSideFunctions()
    const webContext = { lang, proxyPrefixPath: serverConfig.proxyPrefixPath, ...createServerSideContext() }

    webContext.setBrowserConfig(browserConfig, paths, serverConfig.hostUrl)
    webContext.courseCode = courseCode
    webContext.userLang = lang
    webContext.courseKoppsData = await filteredKoppsData(courseCode, lang)
    webContext.analysisData = await sortedKursutveckligApiInfo(courseCode)
    webContext.miniMemosPdfAndWeb = await getSortedAndPrioritizedMiniMemosWebOrPdf(courseCode)

    const compressedData = getCompressedData(webContext)

    const { uri: proxyPrefix } = serverConfig.proxyPrefixPath

    const view = renderStaticPage({
      applicationStore: {},
      location: req.url,
      basename: proxyPrefix,
      context: webContext
    })

    res.render('course/index', {
      compressedData,
      aboutCourse: {
        siteName: `${i18n.messages[langIndex].messages.page_about_course} ${courseCode}`,
        siteUrl: serverConfig.hostUrl + 'student/kurser/kurs/' + courseCode
      },
      debug: 'debug' in req.query,
      description: i18n.messages[langIndex].messages.description,
      html: view,
      instrumentationKey: serverConfig.appInsights.instrumentationKey,
      lang,
      title: courseCode + ' | ' + i18n.messages[langIndex].messages.title,
      cookies: klaroConsentCookie
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
    title: 'Ingen kurskod'
  })
}

module.exports = {
  getCourseDevInfo,
  getErrorPage
}
