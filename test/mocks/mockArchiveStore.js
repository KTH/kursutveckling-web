import ArchiveStore from '../../public/js/app/stores/ArchiveStore'

const realArchiveStore = new ArchiveStore()

const mockArchiveStore = (mockData) => {
  const storeWithData = {
    ...realArchiveStore,
    ...mockData
  }

  return storeWithData
}

export default mockArchiveStore
