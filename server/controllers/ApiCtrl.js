'use strict'

const co = require('co')
const log = require('kth-node-log')
const { koppsCourseData } = require('../apiCalls/koppsApi')

module.exports = {
  getKoppsCourseData: co.wrap(_getKoppsCourseData)
}

function * _getKoppsCourseData (req, res, next) {
  const courseCode = req.params.courseCode
  try {
    const apiResponse = yield koppsCourseData(courseCode)
    return res.json(apiResponse)
  } catch (error) {
    log.error('Exception calling from koppsAPI  in _getKoppsCourseData', { error })
    next(error)
  }
}
