jest.mock('../../server/configuration', () => ({ server: {} }))

function createSyllabusPeriods(periods) {
  const result = {}

  for (let i = 0; i < periods.length; i++) {
    const current = String(periods[i])
    const next = periods[i + 1]

    let endPeriod = ''

    if (next !== undefined) {
      const year = parseInt(String(next).slice(0, 4), 10)
      const semester = parseInt(String(next).slice(4), 10)

      let prevYear = semester === 1 ? year - 1 : year
      let prevSemester = semester === 1 ? 2 : 1

      endPeriod = `${prevYear}${prevSemester}`
    }

    result[current] = { endPeriod }
  }

  return result
}

function transformPeriodInDigits(period) {
  if (!period) return

  const validPrefixes = ['HT', 'VT']

  if (validPrefixes.includes(period.slice(0, 2)) && period.length > 2) {
    const suffix = period.startsWith('HT') ? '2' : '1'
    const year = period.slice(2)
    return year + suffix
  }

  return null
}

module.exports = {
  transformPeriodInDigits,
  createSyllabusPeriods
}
