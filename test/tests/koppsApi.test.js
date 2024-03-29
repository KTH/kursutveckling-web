/* eslint-disable jest/expect-expect */
const mockery = require('mockery')
const filteredKoppsData = require('../../server/apiCalls/koppsApi')
const mockRawKoppsData = require('../mocks/rawKoppsData')
const transformedKoppsData = require('../mocks/transformedKoppsData')

const mockLogger = {}
// eslint-disable-next-line no-multi-assign
mockLogger.debug = mockLogger.info = mockLogger.error = mockLogger.warn = () => {}
mockLogger.init = () => {}

mockery.registerMock('@kth/log', mockLogger)
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
  test('if filteredKoppsData function is returning a correct data in english', async () => {
    const filteredData = await filteredKoppsData('SF1624', 'en', mockRawKoppsData.en)
    expect(filteredData).toStrictEqual(transformedKoppsData.en)
  })

  test('if filteredKoppsData function is returning a correct data in swedish', async () => {
    const filteredData = await filteredKoppsData('SF1624', 'sv', mockRawKoppsData.sv)
    expect(filteredData).toStrictEqual(transformedKoppsData.sv)
  })

  test('if filteredKoppsData function handles empty data', async () => {
    const filteredData = await filteredKoppsData('SF1624', 'en', {})
    const result = {
      courseCode: 'SF1624',
      courseTitle: ' ',
      sortedSyllabusStart: [],
      syllabusPeriods: {},
      courseCredits: ' ',
      koppsDataLang: 'en',
      koppsLangIndex: 0
    }
    expect(filteredData).toStrictEqual(result)
  })
})
