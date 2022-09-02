'use strict'

const log = require('@kth/log')
const { server: config } = require('../configuration')
const api = require('./setupKoppsApi')

const rawKoppsCourseData = async (courseCode, lang) => {
  const { client } = api.koppsApi
  const uri = `${config.koppsApi.basePath}syllabuses/${encodeURIComponent(courseCode)}?l=${lang}`
  try {
    const { body: course, statusCode } = await client.getAsync({ uri, useCache: true })
    if (!course || statusCode !== 200) {
      log.debug(`Failed response ${statusCode} from KOPPS API calling ${uri}`)
    }
    return course
  } catch (error) {
    log.error('Exception calling from koppsAPI in koppsApi.rawKoppsCourseData', { error })
    throw error
  }
}

module.exports = rawKoppsCourseData
