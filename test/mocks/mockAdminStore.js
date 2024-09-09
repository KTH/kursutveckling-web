import transformedAnalysisData from './transformedAnalysisData'
import transformedKoppsData from './transformedKoppsData'

const mockAdminStore = (lang = 'en') => {
  const context = {
    userLang: lang,
    courseCode: 'SF1624',
    courseData: transformedKoppsData[lang],
    analysisData: transformedAnalysisData,
    browserConfig: { storageUri: '', hostUrl: '' },
    miniMemosPdfAndWeb: { courseCode: 'SF1624', miniMemos: {} }
  }

  return context
}

export default mockAdminStore
