import { action, computed, observable } from 'mobx'

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

    require('../../../../node_modules/kth-style/dist/js/menus')
    require('../../../../node_modules/kth-style/dist/js/backtotop')
  }

  @action setBrowserConfig(config, paths, apiHost, profileBaseUrl) {
    this.browserConfig = config
    this.paths = paths
    this.apiHost = apiHost
    this.profileBaseUrl = profileBaseUrl
  }

  @observable courseCode = ''

  @observable userLang = 'sv'

  @observable courseKoppsData = {
    courseCode: '',
    courseTitle: '',
    courseCredits: 0,
    koppsDataLang: 'sv'
  }

  @observable analysisData = undefined

  @computed get formattedCredits() {
    const unit = {
      en: 'credits',
      sv: 'hp'
    }
    const { courseCredits } = this.courseKoppsData
    const credits =
      this.userLang === 'sv' ? courseCredits.toString().replace('.', ',') : courseCredits
    return `${credits} ${unit[this.userLang]}`
  }

  @computed get subHeadline() {
    const { courseCode, courseTitle } = this.courseKoppsData
    return `${courseCode} ${courseTitle}, ${this.formattedCredits}`
  }
}

export default ArchiveStore
