'use strict'

const log = require('@kth/log')
const rawKoppsCourseData = require('./getRawKoppsData')

function isValidData(dataObject) {
  return !dataObject ? ' ' : dataObject
}

function getListOfValidFromSyllabusTerms(roundsInfo = []) {
  const startYears = []
  let validFrom,
    prev = 0
  if (roundsInfo.length > 0) {
    for (const termObj of roundsInfo) {
      validFrom = parseInt(termObj.courseSyllabus.validFromTerm)
      if (validFrom !== prev && validFrom) {
        startYears.push(validFrom)
        prev = validFrom
      }
    }
  }
  const descListOfStartDate = startYears.sort().reverse() // just to be sure it is always correct order independent on API
  if (descListOfStartDate.length > 0) descListOfStartDate.unshift('')
  return descListOfStartDate // [ '', 20182, 20082, 20082, 20081 ]
}

const combineStartEndDates = async (syllabusStartDates) => {
  if (!syllabusStartDates.length > 0) return {} // {20182}
  let periods = {}
  await syllabusStartDates.map((nextSyllabusDate, index, startDates) => {
    if (startDates[index + 1]) {
      const start = startDates[index + 1]
      const lastTerm = nextSyllabusDate.toString().substring(4, 5)
      if (lastTerm === '2') nextSyllabusDate -= 1
      else if (lastTerm === '1') nextSyllabusDate -= 9
      periods = { ...periods, ...{ [start]: { endDate: nextSyllabusDate } } }
    }
  })
  return periods
}

const filteredKoppsData = async (courseCode, lang, testCourseObj = null) => {
  try {
    const courseObj = testCourseObj || (await rawKoppsCourseData(courseCode))
    const sortedSyllabusStart = await getListOfValidFromSyllabusTerms(courseObj.termsWithCourseRounds)
    const syllabusPeriods = await combineStartEndDates(sortedSyllabusStart)

    return {
      courseCode: courseCode.toUpperCase(),
      courseTitle: isValidData(courseObj.course ? courseObj.course.title[lang] : null),
      sortedSyllabusStart,
      syllabusPeriods,
      courseCredits: isValidData(courseObj.course ? courseObj.course.credits : null),
      koppsDataLang: lang,
      koppsLangIndex: lang === 'en' ? 0 : 1
    }
  } catch (error) {
    log.error('Error in filteredKoppsData while trying to filter data from KOPPS', { error })
    const apiError = new Error('KOPPS API information är inte tillgänlig för nu, försöker senare')
    apiError.status = 500
    throw apiError
  }
}

module.exports = filteredKoppsData
