const { getLadokCourseData, getLadokCourseSyllabusPeriodsData } = require('../apiCalls/ladokApi')

async function createCourseData(courseCode, lang) {
  const [courseData, syllabusData] = await Promise.all([
    getLadokCourseData(courseCode, lang),
    getLadokCourseSyllabusPeriodsData(courseCode, lang)
  ])

  return {
    courseCode: courseCode.toUpperCase(),
    courseDataLang: lang,
    ...courseData,
    ...syllabusData
  }
}

module.exports = { createCourseData }
