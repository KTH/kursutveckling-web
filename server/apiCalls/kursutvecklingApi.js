const log = require('@kth/log')
const { rawAnalysisDataFromCanvas, rawAnalysisDataFromAdminWeb } = require('./getRawAnalysisData')

const sortAnalysesByYear = (data, transformAnalysis = (x) => x) => {
  return data.reduce((acc, analysis) => {
    const year = analysis.semester.slice(0, 4)
    acc[year] = acc[year] || []
    const transformedAnalysis = transformAnalysis(analysis)
    if (transformedAnalysis) acc[year].push(transformedAnalysis)
    return acc
  }, {})
}

async function sortedAnalysisDataFromCanvas(courseCode) {
  try {
    const unsortedData = await rawAnalysisDataFromCanvas(courseCode)
    return sortAnalysesByYear(unsortedData)
  } catch (error) {
    log.error('Error in sortedAnalysisDataFromCanvas', { error })
    throw new Error('sortedAnalysisDataFromCanvas is currently unavailable. Please try again later.')
  }
}

async function sortedAnalysisDataFromAdminWeb(courseCode) {
  try {
    const unsortedData = await rawAnalysisDataFromAdminWeb(courseCode)

    const sortedByYear = sortAnalysesByYear(unsortedData, (analysis) => {
      if (!analysis.isPublished) return null

      return {
        ...analysis,
        examinationGrade: analysis.examinationGradeFromLadok
          ? `${analysis.examinationGrade}%`
          : `${analysis.examinationGrade}%*`,
        registeredStudents: analysis.registeredStudentsFromLadok
          ? analysis.registeredStudents
          : `${analysis.registeredStudents}*`
      }
    })

    return sortedByYear
  } catch (error) {
    log.error('Error in sortedAnalysisDataFromAdminWeb', { error })
    throw new Error('sortedAnalysisDataFromAdminWeb is currently unavailable. Please try again later.')
  }
}

module.exports = { sortedAnalysisDataFromCanvas, sortedAnalysisDataFromAdminWeb }
