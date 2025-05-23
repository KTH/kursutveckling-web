const { getLadokCourseData, getLadokCourseSyllabusPeriodsData } = require('../../server/apiCalls/ladokApi')
const { mockRawLadokData, mockLadokCourseSyllabuses } = require('../mocks/rawCourseData')
import transformedLadokData from '../mocks/transformedLadokData'

jest.mock('@kth/om-kursen-ladok-client', () => ({
  createApiClient: () => ({
    getCourseSyllabuses: () => mockLadokCourseSyllabuses,
    getLatestCourseVersionIncludingCancelled: () => mockRawLadokData.en
  })
}))

jest.mock('../../server/configuration', () => ({ server: {} }))

describe('transformPeriodInDigits', () => {
  const { transformPeriodInDigits } = require('../../server/apiCalls/ladokApi')

  test.each([
    ['HT2022', '20222'],
    ['VT2023', '20231'],
    ['INVALID', null],
    [undefined, undefined],
    ['HT', null],
    ['VT', null]
  ])('transforms %s into %s', (input, expected) => {
    expect(transformPeriodInDigits(input)).toBe(expected)
  })
})

describe('createSyllabusPeriods', () => {
  const { createSyllabusPeriods } = require('../../server/apiCalls/ladokApi')

  test('should create periods with correct endPeriods', () => {
    const input = [20051, 20092, 20221, 20222, 20231]
    const expected = {
      20051: { endPeriod: '20091' },
      20092: { endPeriod: '20212' },
      20221: { endPeriod: '20221' },
      20222: { endPeriod: '20222' },
      20231: { endPeriod: '' }
    }

    expect(createSyllabusPeriods(input)).toEqual(expected)
  })
})

describe('getLadokCourseSyllabusPeriodsData', () => {
  test('should transform and sort periods correctly', async () => {
    const result = await getLadokCourseSyllabusPeriodsData('SF1624', 'en')

    expect(result).toEqual({
      syllabusPeriods: {
        20221: { endPeriod: '20221' },
        20222: { endPeriod: '' }
      }
    })
  })
})

describe('getLadokCourseData', () => {
  test('should transform data', async () => {
    const courseData = await getLadokCourseData('SF1624', 'en')
    expect(courseData).toStrictEqual(transformedLadokData.en)
  })
})
