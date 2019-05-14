const api = require('../api')
const log = require('kth-node-log')


async function _getKursutvecklingApiInfo (courseCode) {
    try {
      const client = api.kursutvecklingApi.client
      const paths = api.kursutvecklingApi.paths

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
    const kurstuvApiResponse = await _getKursutvecklingApiInfo(courseCode)
    const arrOfObj = kurstuvApiResponse.body
    const thisYear = new Date().getFullYear()
    let objYear
    let sortedByYear = {}
    let i=0
    while (i <= 10) {//initialize for 10 years f.e. 2009-2019
            sortedByYear[thisYear-i] = []
            i++
        }
    for (obj of arrOfObj) {
        objYear = obj.semester.substr(0,4)
        if (sortedByYear[objYear])
            sortedByYear[objYear].push(obj)
        else { //TODO: Maybe it is better to move it to a separate function typ sortedOlderThan10YearsAgo
            //Let's check it there is course development for more than 10 years ago, f.e. 2007
            sortedByYear[objYear] = [obj] 
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

  module.exports = {sortedKursutveckligApiInfo}

    // 2019
    // 2018
    // latest
    // earliestYear in kursutvAPi