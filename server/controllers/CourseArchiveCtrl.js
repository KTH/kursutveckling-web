'use strict'

const log = require('@kth/log')
const language = require('@kth/kth-node-web-common/lib/language')
const { sortedAnalysisDataFromCanvas, sortedAnalysisDataFromAdminWeb } = require('../apiCalls/kursutvecklingApi')
const i18n = require('../../i18n')
const { browser: browserConfig, server: serverConfig } = require('../configuration')
const paths = require('../server').getPaths()
const { getCourseMemosVersions } = require('../apiCalls/kursPmDataApi')
const { createBreadcrumbs } = require('../utils/breadcrumbUtil')
const { getServerSideFunctions } = require('../utils/serverSideRendering')
const { createServerSideContext } = require('../ssr-context/createServerSideContext')
const { createCourseData } = require('./helperFunctions')

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
    webContext.courseData = await createCourseData(courseCode, lang)
    webContext.analysisDataAdminWeb = await sortedAnalysisDataFromAdminWeb(courseCode)
    webContext.analysisDataCanvas = await sortedAnalysisDataFromCanvas(courseCode)
    webContext.courseMemos = await getCourseMemosVersions(courseCode, lang)

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
      lang,
      title: courseCode + ' | ' + i18n.message('title', lang),
      toolbarUrl: serverConfig.toolbar.url,
      breadcrumbsList,
      proxyPrefix,
      theme: 'student-web'
    })
  } catch (err) {
    log.error('Error in _getContent in CourseArchiveCtrl', { error: err })
    next(err)
  }
}

module.exports = {
  getContent: _getContent
}
