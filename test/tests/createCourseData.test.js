const { createCourseData } = require('../../server/controllers/helperFunctions')

jest.mock('../../server/apiCalls/ladokApi', () => ({
  getLadokCourseData: jest.fn().mockResolvedValue({
    ladokProp: 'From Ladok'
  }),
  getLadokCourseSyllabusPeriodsData: jest.fn().mockResolvedValue({
    syllabusPeriods: {
      20221: { endPeriod: '20221' },
      20222: { endPeriod: '' }
    }
  })
}))

describe('createCourseData', () => {
  test('should merge course and syllabus data from ladokApi', async () => {
    const courseData = await createCourseData('SF1624', 'en')

    expect(courseData).toStrictEqual({
      courseCode: 'SF1624',
      courseDataLang: 'en',
      ladokProp: 'From Ladok',
      syllabusPeriods: {
        20221: { endPeriod: '20221' },
        20222: { endPeriod: '' }
      }
    })
  })
})
