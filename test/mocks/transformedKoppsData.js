const transformedKoppsData = (userLang = 'en') => ({
  courseCode: 'SF1624',
  courseTitle: userLang === 'en' ? 'Algebra and Geometry' : 'Algebra och geometri',
  sortedSyllabusStart: ['', 20192, 20102, 20092, 20082],
  syllabusPeriods: {
    20082: { endDate: 20091 },
    20092: { endDate: 20101 },
    20102: { endDate: 20191 },
    20192: { endDate: '' }
  },
  courseCredits: 7.5,
  koppsDataLang: userLang,
  koppsLangIndex: 0
})

export default transformedKoppsData
module.exports = transformedKoppsData
