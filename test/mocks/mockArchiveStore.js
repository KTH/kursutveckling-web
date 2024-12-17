import { transformedAnalysisDataFromCanvas, transformedAnalysisDataFromAdminWeb } from './transformedAnalysisData'

const mockArchiveStore = (lang) => {
  const context = {
    courseCode: 'SF1624',
    userLang: lang,
    courseData: {
      courseCode: 'SF1624',
      courseTitle: lang === 'sv' ? 'Algebra och geometri' : 'Algebra and Geometry',
      courseFormattedCredits: lang === 'sv' ? '7,5 hp' : '7.5 credits',
      courseDataLang: lang,
      syllabusPeriods: { 19701: { endDate: 20372 } }
    },
    miniMemosPdfAndWeb: [],
    courseMemos: [
      {
        courseOffering: 'Course Offering',
        isPdf: false,
        memoName: 'Memo Name',
        memoVersionsAndUrls: [
          {
            name: 'Ver 1 – 2020-07-01 15:37:34 (senaste versionen)',
            url: '/kurs-pm/SF1624/SF162420202-5-7'
          }
        ]
      }
    ],
    analysisDataAdminWeb: transformedAnalysisDataFromAdminWeb,
    analysisDataCanvas: transformedAnalysisDataFromCanvas,
    browserConfig: { storageUri: '', hostUrl: '' }
  }
  return context
}

export default mockArchiveStore
