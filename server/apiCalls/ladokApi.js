'use strict'

const { createApiClient } = require('@kth/om-kursen-ladok-client')
const { transformPeriodInDigits, createSyllabusPeriods } = require('./ladokApiUtils')
const serverConfig = require('../configuration').server

async function getLadokCourseData(courseCode, lang) {
  const client = createApiClient(serverConfig.ladokMellanlagerApi)
  const course = await client.getLatestCourseVersionIncludingCancelled(courseCode, lang)
  const { benamning: ladokCourseTitle, omfattning: ladokCourseCredits } = course
  return {
    courseTitle: ladokCourseTitle ?? '',
    courseFormattedCredits: ladokCourseCredits?.formattedWithUnit ?? ''
  }
}

async function getLadokCourseSyllabusPeriodsData(courseCode, lang) {
  const client = createApiClient(serverConfig.ladokMellanlagerApi)
  const courseSyllabuses = await client.getAllValidCourseSyllabuses(courseCode, lang)
  const periods = courseSyllabuses.map((x) => x.kursplan.giltigfrom)
  const uniquePeriods = [...new Set(periods)]
  const sortedPeriodsInDigits = uniquePeriods.map((x) => transformPeriodInDigits(x)).sort()
  const syllabusPeriods = createSyllabusPeriods(sortedPeriodsInDigits)

  return {
    syllabusPeriods
  }
}

module.exports = {
  getLadokCourseData,
  getLadokCourseSyllabusPeriodsData
}
