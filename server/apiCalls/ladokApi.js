'use strict'

const { createApiClient } = require('@kth/om-kursen-ladok-client')
const serverConfig = require('../configuration').server

function transformPeriodInDigits(period) {
  if (!period) return

  const validPrefixes = ['HT', 'VT']

  if (validPrefixes.includes(period.slice(0, 2)) && period.length > 2) {
    const suffix = period.startsWith('HT') ? '2' : '1'
    const year = period.slice(2)
    return year + suffix
  }

  return null
}

function createSyllabusPeriods(periods) {
  const result = {}

  for (let i = 0; i < periods.length; i++) {
    const current = String(periods[i])
    const next = periods[i + 1]

    let endPeriod = ''

    if (next !== undefined) {
      const year = parseInt(String(next).slice(0, 4), 10)
      const semester = parseInt(String(next).slice(4), 10)

      let prevYear = semester === 1 ? year - 1 : year
      let prevSemester = semester === 1 ? 2 : 1

      endPeriod = `${prevYear}${prevSemester}`
    }

    result[current] = { endPeriod }
  }

  return result
}

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
  const courseSyllabuses = await client.getCourseSyllabuses(courseCode, lang)
  const periods = courseSyllabuses.map((x) => x.kursplan.giltigfrom)
  const uniquePeriods = [...new Set(periods)]
  const sortedPeriodsInDigits = uniquePeriods.map((x) => transformPeriodInDigits(x)).sort()
  const syllabusPeriods = createSyllabusPeriods(sortedPeriodsInDigits)

  return {
    syllabusPeriods
  }
}

module.exports = {
  transformPeriodInDigits,
  createSyllabusPeriods,
  getLadokCourseData,
  getLadokCourseSyllabusPeriodsData
}
