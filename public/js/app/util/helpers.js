'use strict'
import '@babel/polyfill'

export const getDateFormat = (date, language) => {
  if (language === 'Svenska' || language === 1 || language === 'sv' || date.length === 0) {
    return date
  }
  const splitDate = date.split('-')
  return `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`
}
