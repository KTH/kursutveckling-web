'use strict'
const log = require('kth-node-log')
const config = require('../configuration').server
const redis = require('kth-node-redis')
const connections = require('kth-node-api-call').Connections

const koppsOpts = {
  log,
  https: true,
  redis,
  cache: config.cache,
  timeout: 5000,
  defaultTimeout: config.koppsApi.defaultTimeout,
  retryOnESOCKETTIMEDOUT: true,
  useApiKey: false // skip key
}

config.koppsApi.doNotCallPathsEndpoint = true // skip checking _paths, because kopps doesnt have it
config.koppsApi.connected = true

const koppsConfig = {
  koppsApi: config.koppsApi
}

const api = connections.setup(koppsConfig, koppsConfig, koppsOpts)

const koppsCourseData = async (courseCode) => {
  const { client } = api.koppsApi
  const uri = `${config.koppsApi.basePath}course/${encodeURIComponent(courseCode)}/courseroundterms?fromTerm=20071`
  try {
    const course = await client.getAsync({ uri, useCache: true })
    return course.body
  } catch (error) {
    log.error('Exception calling from koppsAPI in koppsApi.koppsCourseData', { error })
    throw error
  }
}

function isValidData (dataObject) {
  return !dataObject ? ' ' : dataObject
}

function getListOfCoursePlanValidYearsPeriods (allRoundsArrOfObjs) {
  let allValidStartYearsArr = []
  let thisCourseSyllabusTerm, prev = 0
  if (allRoundsArrOfObjs.length > 0) {  
    for (let termObj of allRoundsArrOfObjs) {
      thisCourseSyllabusTerm = parseInt(termObj.courseSyllabus.validFromTerm)
      if (thisCourseSyllabusTerm !== prev && thisCourseSyllabusTerm) {
        allValidStartYearsArr.push(thisCourseSyllabusTerm)
        prev = thisCourseSyllabusTerm
      }
    }
  }
  let courseSyllabysPeriodFromToYearsArr = allValidStartYearsArr.sort().reverse() //just to be sure it is always correct order independent on API
  if (courseSyllabysPeriodFromToYearsArr.length > 0) courseSyllabysPeriodFromToYearsArr.unshift('')
  return courseSyllabysPeriodFromToYearsArr //[ '', 20182, 20082, 20082, 20081 ]
}

const filteredKoppsData = async (courseCode, lang) => {
  try {
    const courseObj = await koppsCourseData(courseCode)
    return {
      courseCode: courseCode.toUpperCase(),
      courseTitle: isValidData(courseObj.course.title[lang]),
      syllabusSemesterList: getListOfCoursePlanValidYearsPeriods(courseObj.termsWithCourseRounds),
      courseCredits: isValidData(courseObj.course.credits),
      koppsDataLang: lang,
      koppsLangIndex: lang === 'en' ? 0 : 1
    }
  } catch(error) {
    log.error("Error in filteredKoppsData while trying to filter data from KOPPS", {error})
    const apiError = new Error('KOPPS API information är inte tillgänlig för nu, försöker senare')
    apiError.status = 500
    throw apiError
  }
}

module.exports = { filteredKoppsData }
