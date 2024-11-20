import { transformedAnalysisDataFromCanvas, transformedAnalysisDataFromAdminWeb } from './transformedAnalysisData'

const mockArchiveStore = (lang) => {
  const context = {
    courseCode: 'SF1624',
    subHeaderText: 'SF1624 Algebra and Geometry, 7,5 credits',
    courseTitle: '',
    courseCredits: 0,
    userLang: lang,
    courseKoppsData: {
      courseCode: '',
      courseTitle: '',
      courseCredits: 0,
      koppsDataLang: 'sv',
      syllabusPeriods: { 19701: { endDate: 20372 } }
    },
    miniMemosPdfAndWeb: [],
    subHeadline: 'SF1624 Algebra and Geometry, 7,5 credits',
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
