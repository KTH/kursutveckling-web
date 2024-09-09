'use strict'

const { createApiClient } = require('om-kursen-ladok-client')
const serverConfig = require('../configuration').server

async function getLadokCourseData(courseCode) {
  const client = createApiClient(serverConfig.ladokMellanlagerApi)
  const course = await client.getLatestCourseVersion(courseCode)
  return course
}

module.exports = {
  getLadokCourseData
}
