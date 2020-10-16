import { action, computed } from 'mobx'

class ArchiveStore {
  initializeStore(storeName) {
    const store = this

    if (
      typeof window !== 'undefined' &&
      window.__initialState__ &&
      window.__initialState__[storeName]
    ) {
      const tmp = JSON.parse(decodeURIComponent(window.__initialState__[storeName]))
      Object.keys(tmp).forEach((key) => {
        store[key] = tmp[key]
        delete tmp[key]
      })
      // Just a nice helper message
      if (Object.keys(window.__initialState__).length === 0) {
        window.__initialState__ = 'Mobx store state initialized'
      }
    }
  }

  @action setBrowserConfig(config, paths, apiHost, profileBaseUrl) {
    this.browserConfig = config
    this.paths = paths
    this.apiHost = apiHost
    this.profileBaseUrl = profileBaseUrl
  }

  // eslint-disable-next-line camelcase
  @action __SSR__setCookieHeader(cookieHeader) {
    if (typeof window === 'undefined') {
      this.cookieHeader = cookieHeader || ''
    }
  }

  courseCode = ''

  @computed get subHeadline() {
    return `${this.courseCode}`
  }
}

export default ArchiveStore
