'use strict'
const log = require('kth-node-log')
const language = require('kth-node-web-common/lib/language')
const ReactDOMServer = require('react-dom/server')
const { toJS } = require('mobx')
const sortedKursutveckligApiInfo = require('../apiCalls/kursutvecklingApi')
const filteredKoppsData = require('../apiCalls/koppsApi')
const { getSortedAndPrioritizedMiniMemosWebOrPdf } = require('../apiCalls/kursPmDataApi')

const i18n = require('../../i18n')
const { browser: browserConfig, server: serverConfig } = require('../configuration')

const serverPaths = require('../server').getPaths()

function hydrateStores(renderProps) {
  // This assumes that all stores are specified in a root element called Provider
  const { props } = renderProps.props.children
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

async function getCourseDevInfo(req, res, next) {
  const { courseCode } = req.params
  const lang = language.getLanguage(res) || 'sv'
  const langIndex = lang === 'en' ? 0 : 1

  try {
    // Render react app
    // const context = {}
    const renderProps = _staticRender()
    renderProps.props.children.props.adminStore.setBrowserConfig(browserConfig, serverPaths, serverConfig.hostUrl)
    renderProps.props.children.props.adminStore.courseKoppsData = await filteredKoppsData(courseCode, lang)
    renderProps.props.children.props.adminStore.analysisData = await sortedKursutveckligApiInfo(courseCode)

    renderProps.props.children.props.adminStore.miniMemosPdfAndWeb =
      (await getSortedAndPrioritizedMiniMemosWebOrPdf(courseCode)) || []

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
