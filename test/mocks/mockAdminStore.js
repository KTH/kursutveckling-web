import { transformedAnalysisDataFromCanvas, transformedAnalysisDataFromAdminWeb } from './transformedAnalysisData'
import transformedKoppsData from './transformedKoppsData'

const mockAdminStore = (lang = 'en') => {
  const context = {
    userLang: lang,
    courseCode: 'SF1624',
    courseKoppsData: transformedKoppsData[lang],
    analysisDataAdminWeb: transformedAnalysisDataFromAdminWeb,
    analysisDataCanvas: transformedAnalysisDataFromCanvas,
    browserConfig: { storageUri: '', hostUrl: '' },
    miniMemosPdfAndWeb: { courseCode: 'SF1624', miniMemos: {} }
  }

  return context
}

export default mockAdminStore
