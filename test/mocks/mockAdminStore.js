import transformedAnalysisData from './transformedAnalysisData'
import transformedCourseData from './transformedCourseData'

const mockAdminStore = (lang = 'en') => {
  const context = {
    userLang: lang,
    courseCode: 'SF1624',
    courseData: transformedCourseData[lang],
    analysisData: transformedAnalysisData,
    browserConfig: { storageUri: '', hostUrl: '' },
    miniMemosPdfAndWeb: { courseCode: 'SF1624', miniMemos: {} }
  }

  return context
}

export default mockAdminStore
