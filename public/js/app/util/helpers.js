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

export const seasonStr = (translate, semesterCode = '') => {
  //TODO: look up why some objects are missing the semester prop
  return semesterCode ? `${translate[semesterCode.toString()[4]]} ${semesterCode.toString().slice(0, 4)}` : ''
}
