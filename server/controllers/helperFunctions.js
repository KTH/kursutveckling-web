const { getLadokCourseData, getLadokCourseSyllabusPeriodsData } = require('../apiCalls/ladokApi')

const createCourseData = async (courseCode, lang) => ({
  courseCode: courseCode.toUpperCase(),
  courseDataLang: lang,
  ...(await getLadokCourseData(courseCode, lang)),
  ...(await getLadokCourseSyllabusPeriodsData(courseCode, lang))
})

module.exports = {
  createCourseData
}
