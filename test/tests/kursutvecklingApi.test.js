const sortedKursutveckligApiInfo = require('../../server/apiCalls/kursutvecklingApi')
const mockRawAnalysisData = require('../mocks/rawAnalysisData')
const transformedAnalysisData = require('../mocks/transformedAnalysisData')

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

describe('Test functions in kopps api to filter raw data', () => {
  test('if sortedKursutveckligApiInfo function is returning a correct data on correct order', async () => {
    const sortedData = await sortedKursutveckligApiInfo('SF1624', mockRawAnalysisData)
    expect(sortedData).toStrictEqual(transformedAnalysisData)
  })
})
