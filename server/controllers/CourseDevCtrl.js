'use strict'

const co = require('co')
const log = require('kth-node-log')
const language = require('kth-node-web-common/lib/language')
const ReactDOMServer = require('react-dom/server')
const { toJS } = require('mobx')
const browserConfig = require('../configuration').browser
const serverConfig = require('../configuration').server
const { sortedKursutveckligApiInfo } = require('../apiCalls/kursutvecklingApi')
const { filteredKoppsData } = require('../apiCalls/koppsApi')
const i18n = require('../../i18n')


module.exports = {
  getCourseDevInfo: co.wrap(_getCourseDevInfo),
}

const serverPaths = require('../server').getPaths()

//MOVE THIS PART TO OTHER CONTROLLER

function hydrateStores (renderProps) {
  // This assumes that all stores are specified in a root element called Provider

  const {props} = renderProps.props.children
  const outp = {}
  for (let key in props) {
    if (typeof props[key].initializeStore === 'function') {
      outp[key] = encodeURIComponent(JSON.stringify(toJS(props[key], true)))
    }
  }
  return outp
}

function _staticRender(context, location) {
  if (process.env.NODE_ENV === 'development') {
    delete require.cache[require.resolve('../../dist/app.js')]
  }

  const { staticRender } = require('../../dist/app.js')

  return staticRender(context, location)
}

async function _getCourseDevInfo (req, res, next) {

  const { courseCode } = req.params
  // const ldapUser = req.session.authUser ? requireRole('isCourseResponsible', 'isExaminator', 'isCourseTeacher') : 'null'
  const lang = language.getLanguage(res) || 'sv'
  const langIndex = lang === 'en' ? 0 : 1

  try {
    // Render react app
    // const context = {}
    const renderProps = _staticRender()
    renderProps.props.children.props.adminStore.setBrowserConfig(browserConfig, serverPaths, serverConfig.hostUrl)
    renderProps.props.children.props.adminStore.__SSR__setCookieHeader(req.headers.cookie)
    renderProps.props.children.props.adminStore.courseKoppsData = await filteredKoppsData(courseCode, lang)
    renderProps.props.children.props.adminStore.analysisData = await sortedKursutveckligApiInfo(courseCode)
    let breadcrumbs = [
      { url: '/student/kurser/kurser-inom-program', label: i18n.message('page_course_programme', lang) },
      { url: `/student/kurser/kurs/${courseCode.toUpperCase()}`, label: `${i18n.messages[langIndex].pageTitles.course_info_title.toUpperCase()} ${courseCode.toUpperCase()}` }
    ]
    const html = ReactDOMServer.renderToString(renderProps)
    res.render('course/index', {
      breadcrumbsPath: breadcrumbs,
      debug: 'debug' in req.query,
      description: i18n.messages[langIndex].messages.description,
      html,
      initialState: JSON.stringify(hydrateStores(renderProps)),
      instrumentationKey: serverConfig.appInsights.instrumentationKey,
      lang: lang,
      title: courseCode + ' | ' + i18n.messages[langIndex].messages.title
    })
  } catch (err) {
    log.error('Error in _getCourseDevInfo', { error: err })
    next(err)
  }
}
