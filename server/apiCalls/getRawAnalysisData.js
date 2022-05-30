'use strict'
const log = require('@kth/log')
const api = require('../api')


async function rawAnalysisData (courseCode) {
  try {
    const { client, paths } = api.kursutvecklingApi
    const kursutvApiResponse = await client.getAsync(client.resolve(paths.getAnalysisListByCourseCode.uri, { courseCode }), { useCache: true })
    return kursutvApiResponse.body
  } catch (error) {
    const apiError = new Error('Kursutvecklingsinformation är inte tillgänlig för nu, försöker senare')
    // apiError.status = 500
    log.error('Error in getKursutvecklingApiInfo', {error})
    throw apiError
  }
}

module.exports = rawAnalysisData