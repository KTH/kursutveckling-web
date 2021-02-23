'use strict'

const log = require('kth-node-log')
const language = require('kth-node-web-common/lib/language')
const ReactDOMServer = require('react-dom/server')
const { toJS } = require('mobx')
// const sortedKursutveckligApiInfo = require('../apiCalls/kursutvecklingApi')
const filteredKoppsData = require('../apiCalls/koppsApi')
const sortedKursutveckligApiInfo = require('../apiCalls/kursutvecklingApi')
const i18n = require('../../i18n')
const { browser: browserConfig, server: serverConfig } = require('../configuration')
const { getCourseMemos } = require('../apiCalls/kursPmDataApi')

const serverPaths = require('../server').getPaths()

function hydrateStores(renderProps) {
  // This assumes that all stores are specified in a root element called Provider
  const { props } = renderProps.props.children
  const outp = {}
  Object.keys(props).forEach((key) => {
    if (typeof props[key].initializeStore === 'function') {
      outp[key] = encodeURIComponent(JSON.stringify(toJS(props[key], true)))
    }
  })
  return outp
}

function _staticRender(context, location) {
  if (process.env.NODE_ENV === 'development') {
    delete require.cache[require.resolve('../../dist/app.js')]
  }
  const { staticRender } = require('../../dist/app.js')
  return staticRender(context, location)
}

async function _getContent(req, res, next) {
  const { courseCode: cc } = req.params
  const courseCode = cc.toUpperCase()
  const lang = language.getLanguage(res) || 'sv'

  try {
    const renderProps = _staticRender()
    const { archiveStore } = renderProps.props.children.props

    archiveStore.setBrowserConfig(browserConfig, serverPaths, serverConfig.hostUrl)
    archiveStore.__SSR__setCookieHeader(req.headers.cookie)
    archiveStore.courseCode = courseCode
    archiveStore.userLang = lang
    archiveStore.courseKoppsData = await filteredKoppsData(courseCode, lang)
    archiveStore.courseMemos = await getCourseMemos(courseCode, lang)
    archiveStore.analysisData = await sortedKursutveckligApiInfo(courseCode)

    const html = ReactDOMServer.renderToString(renderProps)
    res.render('archive/index', {
      aboutCourse: {
        siteName: `${i18n.message('page_about_course', lang)} ${courseCode}`,
        siteUrl: serverConfig.hostUrl + '/student/kurser/kurs/' + courseCode
      },
      debug: 'debug' in req.query,
      description: i18n.message('description', lang),
      html,
      initialState: JSON.stringify(hydrateStores(renderProps)),
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
