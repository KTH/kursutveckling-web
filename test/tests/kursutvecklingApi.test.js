const {
  sortedAnalysisDataFromAdminWeb,
  sortedAnalysisDataFromCanvas
} = require('../../server/apiCalls/kursutvecklingApi')
const { rawAnalysisDataFromCanvas, rawAnalysisDataFromAdminWeb } = require('./../../server/apiCalls/getRawAnalysisData')

const { mockRawAnalysisDataFromCanvas, mockRawAnalysisDataFromAdminWeb } = require('../mocks/rawAnalysisData')
const {
  transformedAnalysisDataFromCanvas,
  transformedAnalysisDataFromAdminWeb
} = require('../mocks/transformedAnalysisData')

// eslint-disable-next-line no-multi-assign

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
    session: { options: { sessionOptions: { secret: '' } } }
  }
}))

jest.mock('../../server/api', () => ({ kursutvecklingApi: {} }))

jest.mock('./../../server/apiCalls/getRawAnalysisData', () => ({
  rawAnalysisDataFromAdminWeb: jest.fn(),
  rawAnalysisDataFromCanvas: jest.fn()
}))

describe('Test functions in kursutveckling web api to filter raw data', () => {
  test('if sortedAnalysisDataFromAdminWeb function is returning a correct data on correct order', async () => {
    const courseCode = 'SF1624'
    const mockedCurrentYear = '2021'

    rawAnalysisDataFromAdminWeb.mockResolvedValue(mockRawAnalysisDataFromAdminWeb)
    // Spy on `Date` and mock `getFullYear` to return the mocked current year
    jest.spyOn(global.Date.prototype, 'getFullYear').mockReturnValue(mockedCurrentYear)

    const sortedData = await sortedAnalysisDataFromAdminWeb(courseCode)

    expect(rawAnalysisDataFromAdminWeb).toHaveBeenCalledWith(courseCode)
    expect(sortedData).toStrictEqual(transformedAnalysisDataFromAdminWeb)
  })

  test('if sortedAnalysisDataFromCanvas function is returning a correct data on correct order', async () => {
    const courseCode = 'AI1527'
    const mockedCurrentYear = 2024

    rawAnalysisDataFromCanvas.mockResolvedValue(mockRawAnalysisDataFromCanvas)
    // Spy on `Date` and mock `getFullYear` to return the mocked current year
    jest.spyOn(global.Date.prototype, 'getFullYear').mockReturnValue(mockedCurrentYear)

    const sortedData = await sortedAnalysisDataFromCanvas(courseCode)

    expect(rawAnalysisDataFromCanvas).toHaveBeenCalledWith(courseCode)
    expect(sortedData).toStrictEqual(transformedAnalysisDataFromCanvas)
  })
})
