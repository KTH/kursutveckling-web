const { getLadokCourseData } = require('../../server/apiCalls/ladokApi')
const { mockRawLadokData } = require('../mocks/rawCourseData')
import transformedLadokData from '../mocks/transformedLadokData'
const { createApiClient } = require('@kth/om-kursen-ladok-client')

jest.mock('@kth/om-kursen-ladok-client')
jest.mock('../../server/configuration', () => ({ server: {} }))

describe('getLadokCourseData', () => {
  test('should transform data', async () => {
    createApiClient.mockReturnValue({
      getLatestCourseVersion: jest.fn().mockResolvedValue(mockRawLadokData.en)
    })
    const courseData = await getLadokCourseData('SF1624', 'en')
    expect(courseData).toStrictEqual(transformedLadokData.en)
  })
})
