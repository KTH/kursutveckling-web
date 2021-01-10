/* eslint-disable jest/expect-expect */
const mockery = require('mockery')
const filteredKoppsData = require('../../server/apiCalls/koppsApi')
const { mockRawKoppsData, mockEmptyRawKoppsData } = require('../mocks/rawKoppsData')
const transformedKoppsData = require('../mocks/transformedKoppsData')

const mockLogger = {}
// eslint-disable-next-line no-multi-assign
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
  test('function to filter data is working', async (done) => {
    const filteredData = await filteredKoppsData('SF1624', 'en', mockRawKoppsData)
    done()
  })

  test('if filteredKoppsData function is returning a correct data', async (done) => {
    const filteredData = await filteredKoppsData('SF1624', 'en', mockRawKoppsData)
    expect(filteredData).toStrictEqual(transformedKoppsData('en'))
    done()
  })

  test('if filteredKoppsData function handles empty data', async (done) => {
    const filteredData = await filteredKoppsData('SF1624', 'en', mockEmptyRawKoppsData)
    done()
  })
})
