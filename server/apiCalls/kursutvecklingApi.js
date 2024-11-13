const log = require('@kth/log')
const { rawAnalysisDataFromCanvas, rawAnalysisDataFromKursinfoadmin } = require('./getRawAnalysisData')

async function sortedAnalysisDataFromCanvas(courseCode) {
  try {
    const unsortedData = await rawAnalysisDataFromCanvas(courseCode)
    const currentYear = new Date().getFullYear()

    // Initialize sorted structure with empty arrays for each of the last 6 years
    const sortedByYear = Array.from({ length: 6 }, (_, i) => currentYear - i).reduce(
      (acc, year) => ({ ...acc, [year]: [] }),
      {}
    )

    // Sort analyses into their respective year
    unsortedData.forEach((analysis) => {
      const year = analysis.semester.slice(0, 4)
      if (sortedByYear[year]) {
        sortedByYear[year].push(analysis)
      } else {
        sortedByYear[year] = [analysis]
      }
    })

    return sortedByYear
  } catch (error) {
    const apiError = new Error('sortedRecentAnalysisDataFromCanvas är inte tillgänglig för nu, försök senare')
    log.error('Error in getKursutvecklingApiInfo', { error })
    throw apiError
  }
}

async function sortedAnalysisDataFromKursinfoadmin(courseCode, testApiObj = null) {
  try {
    const arrOfNonSortedObj = testApiObj || (await rawAnalysisDataFromKursinfoadmin(courseCode))
    const thisYear = testApiObj ? '2021' : new Date().getFullYear()
    // let year
    let sortedByYear = {}
    let i = 0
    while (i <= 5) {
      //initialize array for each year in range of last 5 years f.e. 2014-2019 to save all course analysis obj
      // { 2019: [], 2018: [], ..., 2014: []}
      sortedByYear[thisYear - i] = []
      i++
    }
    arrOfNonSortedObj.map((analysis) => {
      const {
        isPublished,
        examinationGrade,
        examinationGradeFromLadok,
        registeredStudentsFromLadok,
        registeredStudents
      } = analysis

      const year = analysis.semester.substr(0, 4)
      if (isPublished) {
        if (examinationGrade)
          analysis.examinationGrade = !examinationGradeFromLadok ? examinationGrade + ' % *' : examinationGrade + ' %'
        if (!registeredStudentsFromLadok) analysis.registeredStudents = registeredStudents + ' *' || ''
        if (sortedByYear[year]) sortedByYear[year].push(analysis)
        else {
          //typ sortedOlderThan5YearsAgo
          //Let's check it there is course development for more than 5 years ago, f.e. 2007
          sortedByYear[year] = [analysis]
        }
      }
    })

    return sortedByYear
  } catch (error) {
    const apiError = new Error('sortedRecentAnalysisDataFromKursinfoadmin är inte tillgänlig för nu, försöker senare')
    // apiError.status = 500
    log.error('Error in getKursutvecklingApiInfo', { error })
    throw apiError
  }
}

module.exports = { sortedAnalysisDataFromCanvas, sortedAnalysisDataFromKursinfoadmin }
