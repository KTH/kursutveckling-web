'use strict'

export const getDateFormat = (date, language) => {
  if (language === 'Svenska' || language === 1 || language === 'sv' || date.length === 0) {
    return date
  }
  const timestamp = Date.parse(date)
  const parsedDate = new Date(timestamp)
  const options = {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }
  return parsedDate.toLocaleString('en-GB', options)
}
