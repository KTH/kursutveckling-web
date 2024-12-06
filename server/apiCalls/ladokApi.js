'use strict'

const { createApiClient } = require('@kth/om-kursen-ladok-client')
const serverConfig = require('../configuration').server

async function getLadokCourseData(courseCode, lang) {
  const client = createApiClient(serverConfig.ladokMellanlagerApi)
  const course = await client.getLatestCourseVersion(courseCode, lang)
  const { benamning: ladokCourseTitle, omfattning: ladokCourseCredits } = course
  return {
    courseTitle: ladokCourseTitle ?? '',
    courseFormattedCredits: ladokCourseCredits.formattedWithUnit ?? ''
  }
}

module.exports = {
  getLadokCourseData
}
