'use strict'

const { createApiClient } = require('@kth/om-kursen-ladok-client')
const { transformPeriodInDigits, createSyllabusPeriods } = require('../utils/ladokApiUtils')
const serverConfig = require('../configuration').server

const client = createApiClient(serverConfig.ladokMellanlagerApi)

async function getLadokCourseData(courseCode, lang) {
  const course = await client.getLatestCourseVersionIncludingCancelled(courseCode, lang)
  return {
    courseTitle: course?.benamning ?? '',
    courseFormattedCredits: course?.omfattning?.formattedWithUnit ?? ''
  }
}

async function getLadokCourseSyllabusPeriodsData(courseCode, lang) {
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
