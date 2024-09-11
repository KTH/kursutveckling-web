'use strict'

const log = require('@kth/log')
const rawKoppsCourseData = require('./getRawKoppsData')

function getListOfValidFromSyllabusTerms(terms = []) {
  const startYears = []
  let validFrom,
    prev = 0
  if (terms.length > 0) {
    for (const term of terms) {
      validFrom = parseInt(term.validFromTerm.term)
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
  await syllabusStartDates.forEach((syllabusDate, index, startDates) => {
    let nextSyllabusDate = syllabusDate
    if (startDates[index + 1]) {
      const startDate = startDates[index + 1]
      const lastTerm = nextSyllabusDate.toString().substring(4, 5)
      if (lastTerm === '2') nextSyllabusDate -= 1
      else if (lastTerm === '1') nextSyllabusDate -= 9
      periods = { ...periods, ...{ [startDate]: { endDate: nextSyllabusDate } } }
    }
  })
  return periods
}

const filteredKoppsData = async (courseCode, lang, testCourse = null) => {
  try {
    const { publicSyllabusVersions } = testCourse || (await rawKoppsCourseData(courseCode, lang))
    const sortedSyllabusStartDates = await getListOfValidFromSyllabusTerms(publicSyllabusVersions)
    const syllabusPeriods = await combineStartEndDates(sortedSyllabusStartDates)
    return {
      syllabusPeriods
    }
  } catch (error) {
    log.error('Error in filteredKoppsData while trying to filter data from KOPPS', { error })
    const apiError = new Error('KOPPS API information är inte tillgänlig för nu, försöker senare')
    apiError.status = 500
    throw apiError
  }
}

module.exports = filteredKoppsData
