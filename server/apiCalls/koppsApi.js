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
    const course = await koppsApi.getAsync({ uri: `course/${encodeURIComponent(courseCode)}`, useCache: true })
    return course.body
  } catch (error) {
    log.error('Exception calling from koppsAPI in koppsApi.koppsCourseData', { error })
    throw error
  }
}

function isValidData (dataObject, language = 0) {
  return !dataObject ? EMPTY : dataObject
}

const filteredKoppsData = async (courseCode, lang) => {
  try {
    const course = await koppsCourseData(courseCode)
    const courseTitleData = {
      course_code: isValidData(course.code),
      course_title: isValidData(course.title[lang]),
      course_credits: isValidData(course.credits),
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

module.exports = {filteredKoppsData}
