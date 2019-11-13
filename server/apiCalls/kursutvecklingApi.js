const api = require('../api')
const log = require('kth-node-log')


async function _getKursutvecklingApiInfo (courseCode) {
    try {
      const { client, paths } = api.kursutvecklingApi

      return await client.getAsync(client.resolve(paths.getAnalysisListByCourseCode.uri, { courseCode }), { useCache: true })
    } catch (error) {
      const apiError = new Error('Kursutvecklingsinformation är inte tillgänlig för nu, försöker senare')
      // apiError.status = 500
      log.error('Error in getKursutvecklingApiInfo', {error})
      throw apiError
    }
  }

async function sortedKursutveckligApiInfo (courseCode) { //TODO: CACHE
  try {
    const kursutvApiResponse = await _getKursutvecklingApiInfo(courseCode)
    const arrOfNonSortedObj = kursutvApiResponse.body
    const thisYear = new Date().getFullYear()
    let objYear
    let sortedByYear = {}
    let i=0
    while (i <= 5) {
      //initialize array for each year in range of last 5 years f.e. 2014-2019 to save all course analysis obj
      // { 2019: [], 2018: [], ..., 2014: []}
      sortedByYear[thisYear-i] = []
      i++
    }
    for (obj of arrOfNonSortedObj) {
      objYear = obj.semester.substr(0,4)
      //if = true manually edited
      if (obj.isPublished === true) {
        obj.examinationGrade = obj.examinationGradeFromLadok === false ? obj.examinationGrade + ' % *' : obj.examinationGrade + ' %'
        obj.registeredStudents = obj.registeredStudentsFromLadok === false ? obj.registeredStudents + ' *' : obj.registeredStudents
        if (sortedByYear[objYear])
          sortedByYear[objYear].push(obj)
        else { //typ sortedOlderThan5YearsAgo
          //Let's check it there is course development for more than 5 years ago, f.e. 2007
          sortedByYear[objYear] = [obj] 
        }
      }
    }
    return sortedByYear
  } catch (error) {
    const apiError = new Error('sortedKursutveckligApiInfo är inte tillgänlig för nu, försöker senare')
    // apiError.status = 500
    log.error('Error in getKursutvecklingApiInfo', {error})
    throw apiError
  }
}

  module.exports = { sortedKursutveckligApiInfo }

    // 2019
    // 2018
    // ....
    // earliestYear in kursutvAPi