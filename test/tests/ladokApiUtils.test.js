const { transformPeriodInDigits, createSyllabusPeriods } = require('../../server/utils/ladokApiUtils')

describe('transformPeriodInDigits', () => {
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
