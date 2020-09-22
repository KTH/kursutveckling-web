const filteredKoppsData = require('../../server/apiCalls/koppsApi')
const mockRawKoppsData = require('../mocks/rawKoppsData')
const transformedKoppsData = require('../mocks/transformedKoppsData')
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
    session: { options: { sessionOptions: { secret: '' } } },
    koppsApi: {
      basePath: 'https://localhost/v2/',
      defaultTimeout: '60000'
    }
  }
}))

describe('Test functions in kopps api to filter raw data', () => {
  test('Test function to filter data is working', async (done) => {
    const filteredData = await filteredKoppsData('SF1624', 'en', mockRawKoppsData)
    done()
  })

  test('Test if filteredKoppsData function is returning a correct data', async (done) => {
    const filteredData = await filteredKoppsData('SF1624', 'en', mockRawKoppsData)
    expect(filteredData).toStrictEqual(transformedKoppsData('en'))
    done()
  })
})
