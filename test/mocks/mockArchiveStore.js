import ArchiveStore from '../../public/js/app/stores/ArchiveStore'

const realArchiveStore = new ArchiveStore()

const mockArchiveStore = (userLang = 'en') => {
  const routerWithData = {
    ...realArchiveStore,
    userLang
  }

  return routerWithData
}

export default mockArchiveStore
