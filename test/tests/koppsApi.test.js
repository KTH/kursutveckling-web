/* eslint-disable jest/expect-expect */
const filteredKoppsData = require('../../server/apiCalls/koppsApi')
const getRawKoppsData = require('../../server/apiCalls/getRawKoppsData')
const transformedCourseData = require('../mocks/transformedKoppsData')
const { mockRawKoppsData } = require('../mocks/rawCourseData')

jest.mock('@kth/log', () => ({
  debug: jest.fn(),
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  init: jest.fn()
}))

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

jest.mock('../../server/apiCalls/getRawKoppsData')

describe('filteredKoppsData', () => {
  test('should return transformed data in english', async () => {
    getRawKoppsData.mockResolvedValueOnce(mockRawKoppsData.en)
    const filteredData = await filteredKoppsData('SF1624', 'en')
    expect(filteredData).toStrictEqual(transformedCourseData.en)
  })
  test('should return transformed data in swedish', async () => {
    getRawKoppsData.mockResolvedValueOnce(mockRawKoppsData.sv)
    const filteredData = await filteredKoppsData('SF1624', 'sv')
    expect(filteredData).toStrictEqual(transformedCourseData.sv)
  })

  test('if filteredKoppsData function handles empty data', async () => {
    getRawKoppsData.mockResolvedValueOnce({})
    const filteredData = await filteredKoppsData('SF1624', 'en')
    const result = {
      syllabusPeriods: {}
    }
    expect(filteredData).toStrictEqual(result)
  })
})
