'use strict'
import { observable, action } from 'mobx'
import axios from 'axios'

const paramRegex = /\/(:[^\/\s]*)/g

function _paramReplace(path, params) {
  let tmpPath = path
  const tmpArray = tmpPath.match(paramRegex)
  tmpArray.forEach((element) => {
    tmpPath = tmpPath.replace(element, '/' + params[element.slice(2)])
  })
  return tmpPath
}

function _webUsesSSL(url) {
  return url.startsWith('https:')
}
class AdminStore {
  @observable courseKoppsData = undefined // kopps

  analysisData = undefined // kursutveckling-api

  buildApiUrl(path, params) {
    let host
    if (typeof window !== 'undefined') {
      host = this.apiHost
    } else {
      host = 'http://localhost:' + this.browserConfig.port
    }
    if (host[host.length - 1] === '/') {
      host = host.slice(0, host.length - 1)
    }

    const newPath = params ? _paramReplace(path, params) : path

    return [host, newPath].join('')
  }

  _getOptions(params) {
    // Pass Cookie header on SSR-calls
    let options
    if (typeof window === 'undefined') {
      options = {
        headers: {
          Cookie: this.cookieHeader,
          Accept: 'application/json',
          'X-Forwarded-Proto': _webUsesSSL(this.apiHost) ? 'https' : 'http'
        },
        timeout: 10000,
        params
      }
    } else {
      options = {
        params
      }
    }
    return options
  }

  @action getLdapUserByUsername(params) {
    return axios
      .get(this.buildApiUrl(this.paths.api.searchLdapUser.uri, params), this._getOptions())
      .then((res) => {
        return res.data
      })
      .catch((err) => {
        if (err.response) {
          throw new Error(err.message, err.response.data)
        }
        throw err
      })
  }

  @action setUser(userKthId) {
    this.user = userKthId
  }

  @action clearBreadcrumbs() {
    this.breadcrumbs.replace([])
  }

  @action hasBreadcrumbs() {
    return this.breadcrumbs.length > 0
  }

  @action setBrowserConfig(config, paths, apiHost, profileBaseUrl) {
    this.browserConfig = config
    this.paths = paths
    this.apiHost = apiHost
    this.profileBaseUrl = profileBaseUrl
  }

  @action __SSR__setCookieHeader(cookieHeader) {
    if (typeof window === 'undefined') {
      this.cookieHeader = cookieHeader || ''
    }
  }

  @action doSetLanguage(lang) {
    this.language = lang
  }

  @action getBrowserInfo() {
    var navAttrs = [
      'appCodeName',
      'appName',
      'appMinorVersion',
      'cpuClass',
      'platform',
      'opsProfile',
      'userProfile',
      'systemLanguage',
      'userLanguage',
      'appVersion',
      'userAgent',
      'onLine',
      'cookieEnabled'
    ]
    var docAttrs = ['referrer', 'title', 'URL']
    var value = { document: {}, navigator: {} }

    for (let i = 0; i < navAttrs.length; i++) {
      if (navigator[navAttrs[i]] || navigator[navAttrs[i]] === false) {
        value.navigator[navAttrs[i]] = navigator[navAttrs[i]]
      }
    }

    for (let i = 0; i < docAttrs.length; i++) {
      if (document[docAttrs[i]]) {
        value.document[docAttrs[i]] = document[docAttrs[i]]
      }
    }
    return value
  }

  initializeStore(storeName) {
    const store = this

    if (
      typeof window !== 'undefined' &&
      window.__initialState__ &&
      window.__initialState__[storeName]
    ) {
      const tmp = JSON.parse(decodeURIComponent(window.__initialState__[storeName]))
      for (let key in tmp) {
        store[key] = tmp[key]
        delete tmp[key]
      }

      // Just a nice helper message
      if (Object.keys(window.__initialState__).length === 0) {
        window.__initialState__ = 'Mobx store state initialized'
      }
    }
  }
}

export default AdminStore
