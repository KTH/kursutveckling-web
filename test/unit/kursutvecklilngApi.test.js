const sortedKursutveckligApiInfo = require('../../server/apiCalls/kursutvecklingApi')
const mockRawAnalysisData= require('../mocks/rawAnalysisData')
const transformedAnalysisData = require('../mocks/transformedAnalysisData')
const nock = require('nock')
const mockery = require('mockery')
const mockLogger = {}
mockLogger.debug = mockLogger.info = mockLogger.error = mockLogger.warn = () => {}
mockLogger.init = () => {}

mockery.registerMock('kth-node-log', mockLogger)
mockery.enable({
  warnOnReplace: false,
  warnOnUnregistered: false
})
jest.mock('../../server/configuration', () => ({
  server: {
    logging: { log: { level: 'info' } },
    proxyPrefixPath: {},
    session: { options: { sessionOptions: { secret: '' } } }
  }
}))

jest.mock('../../server/api', () => ({ kursutvecklingApi: {} }))

describe('Test functions in kopps api to filter raw data', () => {
  
  test('Test if sortedKursutveckligApiInfo function is returning a correct data on correct order', async (done) => {
    const sortedData = await sortedKursutveckligApiInfo('SF1624', mockRawAnalysisData)
    expect(sortedData).toStrictEqual(transformedAnalysisData)
    done()
  })
})