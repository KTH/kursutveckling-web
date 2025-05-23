// const { getLadokCourseData, getLadokCourseSyllabusPeriodsData } = require('../../server/apiCalls/ladokApi')
// import transformedLadokData from '../mocks/transformedLadokData'
// const { mockRawLadokData, mockLadokCourseSyllabuses } = require('../mocks/rawCourseData')

// jest.mock('@kth/om-kursen-ladok-client', () => ({
//   createApiClient: () => ({
//     getCourseSyllabuses: () => mockLadokCourseSyllabuses,
//     getLatestCourseVersionIncludingCancelled: () => mockRawLadokData.en
//   })
// }))

// jest.mock('../../server/configuration', () => ({ server: {} }))

// describe('getLadokCourseSyllabusPeriodsData', () => {
//   test('should transform and sort periods correctly', async () => {
//     const result = await getLadokCourseSyllabusPeriodsData('SF1624', 'en')

//     expect(result).toEqual({
//       syllabusPeriods: {
//         20221: { endPeriod: '20221' },
//         20222: { endPeriod: '' }
//       }
//     })
//   })
// })

// describe('getLadokCourseData', () => {
//   test('should transform data', async () => {
//     const courseData = await getLadokCourseData('SF1624', 'en')
//     expect(courseData).toStrictEqual(transformedLadokData.en)
//   })
// })

describe.skip('Ladok API', () => {
  it.todo('FIX!')
})
