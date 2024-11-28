const log = require('@kth/log')
const { rawAnalysisDataFromCanvas, rawAnalysisDataFromAdminWeb } = require('./getRawAnalysisData')

// Helper function to initialize sorted data structure for the last 5 years
const initializeYearlyDataObject = (currentYear) =>
  Array.from({ length: 6 }, (_, i) => currentYear - i).reduce((acc, year) => {
    acc[year] = []
    return acc
  }, {})

const sortAnalysesByYear = (data, sortedByYear, transformAnalysis = (x) => x) => {
  data.forEach((analysis) => {
    const year = analysis.semester.slice(0, 4)
    if (sortedByYear[year]) {
      sortedByYear[year].push(transformAnalysis(analysis))
    } else {
      sortedByYear[year] = [transformAnalysis(analysis)]
    }
  })
}

async function sortedAnalysisDataFromCanvas(courseCode) {
  try {
    const unsortedData = await rawAnalysisDataFromCanvas(courseCode)
    const currentYear = new Date().getFullYear()
    const sortedByYear = initializeYearlyDataObject(currentYear)

    sortAnalysesByYear(unsortedData, sortedByYear)

    return sortedByYear
  } catch (error) {
    const apiError = new Error('sortedAnalysisDataFromCanvas är inte tillgänglig för nu, försök senare')
    log.error('Error in sortedAnalysisDataFromCanvas', { error })
    throw apiError
  }
}

async function sortedAnalysisDataFromAdminWeb(courseCode) {
  try {
    const unsortedData = await rawAnalysisDataFromAdminWeb(courseCode)
    const currentYear = new Date().getFullYear()
    const sortedByYear = initializeYearlyDataObject(currentYear)

    sortAnalysesByYear(unsortedData, sortedByYear, (analysis) => {
      const {
        isPublished,
        examinationGrade,
        examinationGradeFromLadok,
        registeredStudentsFromLadok,
        registeredStudents
      } = analysis

      if (!isPublished) return null

      if (examinationGrade) {
        analysis.examinationGrade = examinationGradeFromLadok ? `${examinationGrade}%` : `${examinationGrade} %*`
      }

      if (!registeredStudentsFromLadok) analysis.registeredStudents = registeredStudents ? `${registeredStudents}*` : ''

      return analysis
    })

    // Remove null entries (non-published analyses)
    Object.keys(sortedByYear).forEach((year) => {
      sortedByYear[year] = sortedByYear[year].filter(Boolean)
    })

    return sortedByYear
  } catch (error) {
    const apiError = new Error('sortedAnalysisDataFromAdminWeb är inte tillgänglig för nu, försök senare')
    log.error('Error in sortedAnalysisDataFromAdminWeb', { error })
    throw apiError
  }
}

module.exports = { sortedAnalysisDataFromCanvas, sortedAnalysisDataFromAdminWeb }
