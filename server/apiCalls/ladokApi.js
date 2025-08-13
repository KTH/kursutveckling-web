'use strict'

const { createApiClient } = require('@kth/om-kursen-ladok-client')
const { transformPeriodInDigits, createSyllabusPeriods } = require('../utils/ladokApiUtils')
const serverConfig = require('../configuration').server

const client = createApiClient(serverConfig.ladokMellanlagerApi)

async function getLadokCourseData(courseCode, lang) {
  try {
    const course = await client.getLatestCourseVersionIncludingCancelled(courseCode, lang)
    return {
      courseTitle: course?.benamning ?? '',
      courseFormattedCredits: course?.omfattning?.formattedWithUnit ?? ''
    }
  } catch (error) {
    throw new Error(`Error fetching course data for ${courseCode}:`, error)
  }
}

async function getLadokCourseSyllabusPeriodsData(courseCode, lang) {
  try {
    const courseSyllabuses = await client.getAllValidCourseSyllabuses(courseCode, lang)
    const periods = courseSyllabuses.map((x) => x.kursplan.giltigfrom)
    const uniquePeriods = [...new Set(periods)]
    const sortedPeriodsInDigits = uniquePeriods.map((x) => transformPeriodInDigits(x)).sort()
    console.log('sorted periods in digits: ', sortedPeriodsInDigits)
    const syllabusPeriods = createSyllabusPeriods(sortedPeriodsInDigits)
    return {
      syllabusPeriods
    }
  } catch (error) {
    throw new Error(`Error fetching syllabus periods for ${courseCode}:`, error)
  }
}

module.exports = {
  getLadokCourseData,
  getLadokCourseSyllabusPeriodsData
}
