'use strict'
const { BasicAPI } = require('kth-node-api-call')
const { server } = require('../configuration.js')
const log = require('kth-node-log')
const redis = require('kth-node-redis')

const koppsApi = new BasicAPI({
  hostname: server.kopps.host,
  basePath: server.kopps.basePath,
  https: true, //server.kopps.https,
  json: true,
  defaultTimeout: 5000, //server.kopps.defaultTimeout
  redis: {
    client: redis,
    prefix: 'server-kopps',
    expire: 20000
  }
})

const koppsCourseData = async (courseCode) => {
  try {
    const course = await koppsApi.getAsync({ uri: `course/${encodeURIComponent(courseCode)}/courseroundterms?fromTerm=20071`, useCache: true })
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
