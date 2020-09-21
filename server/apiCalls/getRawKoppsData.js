'use strict'
const log = require('kth-node-log')
const api = require('./setupKoppsApi')
const config = require('../configuration').server


const rawKoppsCourseData = async courseCode => {
  const { client } = api.koppsApi
  const uri = `${config.koppsApi.basePath}course/${encodeURIComponent(
    courseCode
  )}/courseroundterms?fromTerm=20071`
  try {
    const course = await client.getAsync({ uri, useCache: true })

    return course.body
  } catch (error) {
    log.error('Exception calling from koppsAPI in koppsApi.rawKoppsCourseData', { error })
    throw error
  }
}

module.exports = rawKoppsCourseData