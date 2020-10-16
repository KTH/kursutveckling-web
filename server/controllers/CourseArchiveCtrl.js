'use strict'

const log = require('kth-node-log')
const language = require('kth-node-web-common/lib/language')
const ReactDOMServer = require('react-dom/server')
const { toJS } = require('mobx')
// const sortedKursutveckligApiInfo = require('../apiCalls/kursutvecklingApi')
// const filteredKoppsData = require('../apiCalls/koppsApi')
const i18n = require('../../i18n')
const { browser: browserConfig, server: serverConfig } = require('../configuration')

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
  const { courseCode } = req.params
  const lang = language.getLanguage(res) || 'sv'
  const langIndex = lang === 'en' ? 0 : 1

  try {
    const renderProps = _staticRender()
    renderProps.props.children.props.archiveStore.setBrowserConfig(
      browserConfig,
      serverPaths,
      serverConfig.hostUrl
    )
    renderProps.props.children.props.archiveStore.__SSR__setCookieHeader(req.headers.cookie)
    renderProps.props.children.props.archiveStore.courseCode = courseCode.toUpperCase()
    // renderProps.props.children.props.archiveStore.courseKoppsData = await filteredKoppsData(
    //   courseCode,
    //   lang
    // )
    // renderProps.props.children.props.archiveStore.analysisData = await sortedKursutveckligApiInfo(
    //   courseCode
    // )
    const breadcrumbs = [
      {
        url: '/student/kurser/kurser-inom-program',
        label: i18n.message('page_course_programme', lang)
      },
      {
        url: `/student/kurser/kurs/${courseCode.toUpperCase()}`,
        label: `${i18n.message('page_about_course', lang)} ${courseCode.toUpperCase()}`
      }
    ]

    const html = ReactDOMServer.renderToString(renderProps)
    res.render('archive/index', {
      aboutCourse: {
        siteName: `${i18n.messages[langIndex].messages.page_about_course} ${courseCode}`,
        siteUrl: serverConfig.hostUrl + '/student/kurser/kurs/' + courseCode
      },
      breadcrumbsPath: breadcrumbs,
      debug: 'debug' in req.query,
      description: i18n.messages[langIndex].messages.description,
      html,
      initialState: JSON.stringify(hydrateStores(renderProps)),
      instrumentationKey: serverConfig.appInsights.instrumentationKey,
      lang,
      title: courseCode + ' | ' + i18n.messages[langIndex].messages.title
    })
  } catch (err) {
    log.error('Error in _getCourseDevInfo', { error: err })
    next(err)
  }
}

module.exports = {
  getContent: _getContent
}
