'use strict'

const { createApiClient } = require('om-kursen-ladok-client')
const serverConfig = require('../configuration').server

async function getLadokCourseData(courseCode, lang) {
  const client = createApiClient(serverConfig.ladokMellanlagerApi)
  const course = await client.getLatestCourseVersion(courseCode, lang)
  const { benamning: ladokCourseTitle, omfattning: ladokCourseCredits } = course
  return {
    courseTitle: ladokCourseTitle ?? '',
    courseCredits: ladokCourseCredits ?? ''
  }
}

module.exports = {
  getLadokCourseData
}
