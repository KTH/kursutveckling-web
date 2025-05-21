import transformedLadokData from './transformedLadokData'
import transformedCourseSyllabusData from './transformedCourseSyllabusData'

const transformedCourseData = {
  sv: {
    courseCode: 'SF1624',
    courseDataLang: 'sv',
    ...transformedLadokData.sv,
    ...transformedCourseSyllabusData.sv
  },
  en: {
    courseCode: 'SF1624',
    courseDataLang: 'en',
    ...transformedLadokData.en,
    ...transformedCourseSyllabusData.en
  }
}
module.exports = transformedCourseData
