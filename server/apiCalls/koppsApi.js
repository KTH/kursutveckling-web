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
    const course = await koppsApi.getAsync({ uri: `course/${encodeURIComponent(courseCode)}/detailedinformation`, useCache: true })
    return course.body
  } catch (error) {
    log.error('Exception calling from koppsAPI in koppsApi.koppsCourseData', { error })
    throw error
  }
}

function isValidData (dataObject) {
  return !dataObject ? ' ' : dataObject
}

function getCoursePlanYears (publicSyllabusVersionsArr) {
  let coursePlanYearsArr = []
  if (publicSyllabusVersionsArr.length > 0) {  
    for (let publicSyllabus of publicSyllabusVersionsArr) {
      coursePlanYearsArr.push(publicSyllabus.validFromTerm.term)
    }
  }
  let coursePlansPeriodFromToYearsArr = coursePlanYearsArr.sort().reverse()
  if (coursePlansPeriodFromToYearsArr.length > 0) coursePlansPeriodFromToYearsArr.unshift('')
  return coursePlansPeriodFromToYearsArr //[ '', 20182, 20082, 20082, 20081 ]
}

const filteredKoppsData = async (courseCode, lang) => {
  try {
    const courseObj = await koppsCourseData(courseCode)
    const courseTitleData = {
      course_code: isValidData(courseObj.course.courseCode),
      course_title: isValidData(courseObj.course.title),
      course_title_en: isValidData(courseObj.course.titleOther),
      course_plans: getCoursePlanYears(courseObj.publicSyllabusVersions),
      course_credits: isValidData(courseObj.course.credits),
      apiError: false
    }
    return {
      courseTitleData,
      lang
    }
  } catch(error) {
    log.error("Error while trying to filter data from KOPPS", {error})
    const courseTitleData = {
      course_code: courseCode.toUpperCase(),
      apiError: true
    }
    return {
      courseTitleData,
      lang
    }
  }
}

module.exports = { filteredKoppsData }
