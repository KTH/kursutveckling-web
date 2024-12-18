const { createCourseData } = require('../../server/controllers/helperFunctions')

jest.mock('../../server/apiCalls/koppsApi', () =>
  jest.fn().mockResolvedValue({
    koppsProp: 'From Kopps',
    koppsAndLadokProp: 'From Kopps'
  })
)
jest.mock('../../server/apiCalls/ladokApi', () => ({
  getLadokCourseData: jest.fn().mockResolvedValue({
    ladokProp: 'From Ladok',
    koppsAndLadokProp: 'From Ladok'
  })
}))

describe('createCourseData', () => {
  test.only('should merge data from ladokApi and koppsApi', async () => {
    const courseData = await createCourseData('SF1624', 'en')

    expect(courseData).toStrictEqual({
      courseCode: 'SF1624',
      courseDataLang: 'en',
      koppsProp: 'From Kopps',
      ladokProp: 'From Ladok',
      koppsAndLadokProp: 'From Ladok'
    })
  })
})
