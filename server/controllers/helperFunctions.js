const filteredKoppsData = require('../apiCalls/koppsApi')
const { getLadokCourseData } = require('../apiCalls/ladokApi')

const createCourseData = async (courseCode, lang) => ({
  courseCode: courseCode.toUpperCase(),
  courseDataLang: lang,
  courseDataLangIndex: lang === 'en' ? 0 : 1,
  ...(await filteredKoppsData(courseCode, lang)),
  ...(await getLadokCourseData(courseCode, lang))
})

module.exports = {
  createCourseData
}
