import { transformedAnalysisDataFromCanvas, transformedAnalysisDataFromKursinfoadmin } from './transformedAnalysisData'
import transformedKoppsData from './transformedKoppsData'

const mockAdminStore = (lang = 'en') => {
  const context = {
    userLang: lang,
    courseCode: 'SF1624',
    courseKoppsData: transformedKoppsData[lang],
    analysisDataKursinfoadmin: transformedAnalysisDataFromKursinfoadmin,
    analysisDataCanvas: transformedAnalysisDataFromCanvas,
    browserConfig: { storageUri: '', hostUrl: '' },
    miniMemosPdfAndWeb: { courseCode: 'SF1624', miniMemos: {} }
  }

  return context
}

export default mockAdminStore
