'use strict'

const { createApiClient } = require('om-kursen-ladok-client')
const serverConfig = require('../configuration').server

async function getLadokCourseData(courseCode, testCourse = null) {
  const client = createApiClient(serverConfig.ladokMellanlagerApi)
  const course = testCourse || (await client.getLatestCourseVersion(courseCode))
  return course
}

module.exports = {
  getLadokCourseData
}
