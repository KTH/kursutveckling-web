/* eslint-disable jest/expect-expect */
const mockery = require('mockery')
const filteredKoppsData = require('../../server/apiCalls/koppsApi')
const { mockRawKoppsData, mockRawLadokData } = require('../mocks/rawCourseData')
const transformedCourseData = require('../mocks/transformedCourseData')
const { getNameInLanguageOrSetEmpty } = require('../../server/utils/languageUtil')
const { parseOrSetEmpty } = require('../../server/controllers/ctrlHelper')
const { getLadokCourseData } = require('../../server/apiCalls/ladokApi')

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
    const { benamning: ladokCourseTitle, omfattning: ladokCourseCredits } = await getLadokCourseData(
      'SF1624',
      mockRawLadokData
    )
    const filteredData = {
      ...(await filteredKoppsData('SF1624', 'en', mockRawKoppsData.en)),
      courseCode: 'SF1624',
      courseDataLang: 'en',
      courseDataLangIndex: 0,
      courseTitle: getNameInLanguageOrSetEmpty(ladokCourseTitle, 'en'),
      courseCredits: parseOrSetEmpty(ladokCourseCredits)
    }

    expect(filteredData).toStrictEqual(transformedCourseData.en)
  })

  test('if filteredKoppsData function is returning a correct data in swedish', async () => {
    const { benamning: ladokCourseTitle, omfattning: ladokCourseCredits } = await getLadokCourseData(
      'SF1624',
      mockRawLadokData
    )

    const filteredData = {
      ...(await filteredKoppsData('SF1624', 'sv', mockRawKoppsData.en)),
      courseCode: 'SF1624',
      courseDataLang: 'sv',
      courseDataLangIndex: 1,
      courseTitle: getNameInLanguageOrSetEmpty(ladokCourseTitle, 'sv'),
      courseCredits: parseOrSetEmpty(ladokCourseCredits)
    }
    expect(filteredData).toStrictEqual(transformedCourseData.sv)
  })

  test('if filteredKoppsData function handles empty data', async () => {
    const filteredData = await filteredKoppsData('SF1624', 'en', {})
    const result = {
      sortedSyllabusStart: [],
      syllabusPeriods: {}
    }
    expect(filteredData).toStrictEqual(result)
  })
})
