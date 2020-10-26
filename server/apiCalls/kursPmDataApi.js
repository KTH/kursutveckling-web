'use strict'

const log = require('kth-node-log')
const api = require('../api')

async function getMiniMemosPdfAndWeb(courseCode) {
  const { client, paths } = api.kursPmDataApi
  const uri = client.resolve(paths.getPdfAndWebMemosListByCourseCode.uri, { courseCode })

  try {
    const res = await client.getAsync({ uri })
    return res.body
  } catch (err) {
    log.debug('getMiniMemosPdfAndWeb is not available', err)
    return err
  }
}

module.exports = {
  getMiniMemosPdfAndWeb
}
