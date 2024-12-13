'use strict'

export const getDateFormat = (date, language) => {
  const timestamp = Date.parse(date)
  const parsedDate = new Date(timestamp)

  if (language === 'Svenska' || language === 1 || language === 'sv' || date.length === 0) {
    const options = {
      dateStyle: 'short'
    }
    return parsedDate.toLocaleString('sv-SE', options)
  }
  const options = {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }
  return parsedDate.toLocaleString('en-GB', options)
}

export const seasonStr = (semesterTranslations, semester = '') => {
  return semester ? `${semesterTranslations[semester.toString()[4]]} ${semester.toString().slice(0, 4)}` : ''
}
