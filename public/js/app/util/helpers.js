'use strict'

export const getDateFormat = (date, language) => {
  if (language === 'Svenska' || language === 1 || language === 'sv' || date.length === 0) {
    return date
  }
  const splitDate = date.split('-')
  return `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`
}

export const formatISODate = (date, lang) => {
  if (date === '') return null
  const timestamp = Date.parse(date)
  const parsedDate = new Date(timestamp)
  let languageTag // BCP 47 language tag
  switch (lang) {
    case 'Svenska':
    case 'Engelska':
    case 1:
    case 'sv':
      languageTag = 'sv-SE'
      break
    default:
      languageTag = 'en-US'
      break
  }
  return parsedDate.toLocaleDateString(languageTag)
}
