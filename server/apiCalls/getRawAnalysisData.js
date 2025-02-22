'use strict'
const log = require('@kth/log')
const api = require('../api')

async function rawAnalysisDataFromCanvas(courseCode) {
  try {
    const { client, paths } = api.kursutvecklingApi
    const kursutvApiResponse = await client.getAsync(
      client.resolve(paths.getCanvasAnalysisListByCourseCode.uri, { courseCode }),
      { useCache: true }
    )
    return kursutvApiResponse.body
  } catch (error) {
    const apiError = new Error('Kursutvecklingsinformation är inte tillgänlig för nu, försöker senare')
    // apiError.status = 500
    log.error('Error in getKursutvecklingApiInfo', { error })
    throw apiError
  }
}

async function rawAnalysisDataFromAdminWeb(courseCode) {
  try {
    const { client, paths } = api.kursutvecklingApi
    const kursutvApiResponse = await client.getAsync(
      client.resolve(paths.getAdminWebAnalysisListByCourseCode.uri, { courseCode }),
      { useCache: true }
    )
    return kursutvApiResponse.body
  } catch (error) {
    const apiError = new Error('Kursutvecklingsinformation är inte tillgänlig för nu, försöker senare')
    // apiError.status = 500
    log.error('Error in getKursutvecklingApiInfo', { error })
    throw apiError
  }
}

module.exports = { rawAnalysisDataFromCanvas, rawAnalysisDataFromAdminWeb }
