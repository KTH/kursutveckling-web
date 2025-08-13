function createSyllabusPeriods(periods) {
  return periods.reduce((acc, cur, index) => {
    const next = periods[index + 1]
    let endPeriod = ''
    if (next) {
      const year = parseInt(String(next).slice(0, 4), 10)
      const semester = parseInt(String(next).slice(4), 10)

      let prevYear = semester === 1 ? year - 1 : year
      let prevSemester = semester === 1 ? 2 : 1

      endPeriod = `${prevYear}${prevSemester}`
    }
    acc[String(cur)] = { endPeriod }
    return acc
  }, {})
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
