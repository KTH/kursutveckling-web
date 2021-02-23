import ArchiveStore from '../../public/js/app/stores/ArchiveStore'
import transformedAnalysisData from './transformedAnalysisData'

const realArchiveStore = new ArchiveStore()

const mockArchiveStore = (mockData) => {
  const storeWithData = {
    ...realArchiveStore,
    analysisData: transformedAnalysisData,
    browserConfig: { storageUri: '' },
    ...mockData
  }

  return storeWithData
}

export default mockArchiveStore
