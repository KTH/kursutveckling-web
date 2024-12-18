import { transformedAnalysisDataFromCanvas, transformedAnalysisDataFromAdminWeb } from './transformedAnalysisData'
import transformedCourseData from './transformedCourseData'

const mockAdminStore = (lang = 'en') => {
  const context = {
    userLang: lang,
    courseCode: 'SF1624',
    courseData: transformedCourseData[lang],
    analysisDataAdminWeb: transformedAnalysisDataFromAdminWeb,
    analysisDataCanvas: transformedAnalysisDataFromCanvas,
    browserConfig: { storageUri: '', hostUrl: '' },
    miniMemosPdfAndWeb: { courseCode: 'SF1624', miniMemos: {} }
  }

  return context
}

export default mockAdminStore
