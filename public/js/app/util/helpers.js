'use strict'

export const getDateFormat = (date, language) => {
  if (!date) return ''

  const parsedDate = new Date(Date.parse(date))
  const isSwedish = ['Svenska', 1, 'sv'].includes(language)

  const options = isSwedish ? { dateStyle: 'short' } : { day: 'numeric', month: 'short', year: 'numeric' }

  return parsedDate.toLocaleString(isSwedish ? 'sv-SE' : 'en-US', options)
}

export const seasonStr = (semesterTranslations, semester = '') => {
  return semester ? `${semesterTranslations[semester.toString()[4]]} ${semester.toString().slice(0, 4)}` : ''
}
