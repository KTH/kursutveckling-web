const {
  sortedAnalysisDataFromAdminWeb,
  sortedAnalysisDataFromCanvas
} = require('../../server/apiCalls/kursutvecklingApi')
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

describe('Test functions in kursutveckling web api to filter raw data', () => {
  test('if sortedAnalysisDataFromAdminWeb function is returning a correct data on correct order', async () => {
    const sortedData = await sortedAnalysisDataFromAdminWeb('SF1624', mockRawAnalysisDataFromAdminWeb)
    expect(sortedData).toStrictEqual(transformedAnalysisDataFromAdminWeb)
  })

  test('if sortedAnalysisDataFromCanvas function is returning a correct data on correct order', async () => {
    const sortedData = await sortedAnalysisDataFromCanvas('AI1527', mockRawAnalysisDataFromCanvas)
    expect(sortedData).toStrictEqual(transformedAnalysisDataFromCanvas)
  })
})
