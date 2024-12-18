import transformedKoppsData from './transformedKoppsData'
import transformedLadokData from './transformedLadokData'
const transformedCourseData = {
  sv: {
    courseCode: 'SF1624',
    courseDataLang: 'sv',
    ...transformedKoppsData.sv,
    ...transformedLadokData.sv
  },
  en: {
    courseCode: 'SF1624',
    courseDataLang: 'en',
    ...transformedKoppsData.en,
    ...transformedLadokData.en
  }
}
module.exports = transformedCourseData
