'use strict'
const handlebars = require('handlebars')
const registerHeaderContentHelper = require('@kth/kth-node-web-common/lib/handlebars/helpers/headerContent')
const { registerBreadcrumbHelper } = require('@kth/kth-node-web-common/lib/handlebars/helpers/breadcrumbs')
const { registerLanguageLinkHelper } = require('@kth/kth-node-web-common/lib/handlebars/helpers/languageLink')
const config = require('../../configuration').server
const packageFile = require('../../../package.json')
const log = require('@kth/log')

let version = packageFile.version

try {
  const buildVersion = require('../../../config/version')
  version = version + '-' + buildVersion.jenkinsBuild
} catch (err) {
  log.error(err.message)
}

/*
  Register standard helpers:

    - withVersion
    - extend
    - prefixScript
    - prefixStyle
    - render

*/
registerHeaderContentHelper({
  proxyPrefixPath: config.proxyPrefixPath.uri,
  version: version
})

/**
 * Add any application specific helpers here, you can find some
 * packaged helpers in https://github.com/KTH/kth-node-web-common/tree/master/lib/handlebars/helpers
 * Those only need to be required. Docs embedded in source.
 */
registerBreadcrumbHelper()
registerLanguageLinkHelper()
require('@kth/kth-node-web-common/lib/handlebars/helpers/contentedit')

const i18n = require('../../../i18n')
require('@kth/kth-node-web-common/lib/handlebars/helpers/createI18nHelper')(i18n)
require('@kth/kth-node-web-common/lib/handlebars/helpers/safe')

handlebars.registerHelper('eq', (var1, var2) => var1.toString() === var2.toString())
