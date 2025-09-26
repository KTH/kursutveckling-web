/**
 *
 *            Server specific settings
 *
 * *************************************************
 * * WARNING! Secrets should be read from env-vars *
 * *************************************************
 *
 */
const { getEnv, devDefaults, unpackRedisConfig, unpackNodeApiConfig } = require('kth-node-configuration')
const { safeGet } = require('safe-utils')

// DEFAULT SETTINGS used for dev, if you want to override these for you local environment, use env-vars in .env
const devPort = devDefaults(3003)
const devSsl = devDefaults(false)
const devUrl = devDefaults('http://localhost:' + devPort)
const devKursutvecklingApi = devDefaults('https://api-r.referens.sys.kth.se/api/kursutveckling?defaultTimeout=10000') // required=true&
const devKursPmDataApi = devDefaults('https://api-r.referens.sys.kth.se/api/kurs-pm-data?defaultTimeout=10000')
const devSessionKey = devDefaults('kursutveckling-web.sid')
const devSessionUseRedis = devDefaults(true)
const devRedis = devDefaults('redis://localhost:6379/')
// END DEFAULT SETTINGS

module.exports = {
  hostUrl: getEnv('SERVER_HOST_URL', devUrl),
  useSsl: safeGet(() => getEnv('SERVER_SSL', devSsl + '').toLowerCase() === 'true'),
  port: getEnv('SERVER_PORT', devPort),
  ssl: {
    // In development we don't have SSL feature enabled
    pfx: getEnv('SERVER_CERT_FILE', ''),
    passphrase: getEnv('SERVER_CERT_PASSPHRASE', '')
  },

  // API keys
  apiKey: {
    kursutvecklingApi: getEnv('KURSUTVECKLING_API_KEY', devDefaults('1234')),
    kursPmDataApi: getEnv('KURS_PM_DATA_API_KEY', devDefaults('1234'))
  },
  // Service API's
  nodeApi: {
    kursutvecklingApi: unpackNodeApiConfig('KURSUTVECKLING_API_URI', devKursutvecklingApi),
    kursPmDataApi: unpackNodeApiConfig('KURS_PM_DATA_API_URI', devKursPmDataApi)
  },

  ladokMellanlagerApi: {
    clientId: getEnv('LADOK_AUTH_CLIENT_ID', null),
    clientSecret: getEnv('LADOK_AUTH_CLIENT_SECRET', null),
    tokenUrl: getEnv('LADOK_AUTH_TOKEN_URL', null),
    scope: getEnv('LADOK_AUTH_SCOPE', null),
    baseUrl: getEnv('LADOK_BASE_URL', null),
    ocpApimSubscriptionKey: getEnv('LADOK_OCP_APIM_SUBSCRIPTION_KEY', null)
  },

  // Cortina
  blockApi: {
    blockUrl: getEnv('CM_HOST_URL', devDefaults('https://www-r.referens.sys.kth.se/cm/')), // Block API base URL
    addBlocks: {
      studentMegaMenu: '1.1066510',
      studentSearch: '1.1066521',
      studentFooter: '1.1066523'
    }
  },

  // Logging
  logging: {
    log: {
      level: getEnv('LOGGING_LEVEL', 'debug')
    },
    accessLog: {
      useAccessLog: getEnv('LOGGING_ACCESS_LOG', true)
    }
  },
  clientLogging: {
    level: 'debug'
  },
  cache: {
    cortinaBlock: {
      redis: unpackRedisConfig('REDIS_URI', devRedis),
      redisKey: 'CortinaBlock_kursutveckling-web_'
    },
    kursutvecklingApi: {
      redis: unpackRedisConfig('REDIS_URI', devRedis),
      expireTime: getEnv('KURSUTVECKLING_API_CACHE_EXPIRE_TIME', 3 * 60) // 3 * 60 s = 3 MINUTES
    }
  },

  // Session
  sessionSecret: getEnv('SESSION_SECRET', devDefaults('1234567890')),
  session: {
    key: getEnv('SESSION_KEY', devSessionKey),
    useRedis: safeGet(() => getEnv('SESSION_USE_REDIS', devSessionUseRedis) === 'true'),
    sessionOptions: {
      // do not set session secret here!!
      cookie: {
        secure: String(getEnv('SESSION_SECURE_COOKIE', false)).toLowerCase() === 'true',
        path: getEnv('SERVICE_PUBLISH', '/kursutveckling'),
        sameSite: getEnv('SESSION_SAME_SITE_COOKIE', 'Lax')
      },
      proxy: safeGet(() => getEnv('SESSION_TRUST_PROXY', true) === 'true')
    },
    redisOptions: unpackRedisConfig('REDIS_URI', devRedis)
  },

  toolbar: {
    url: getEnv('TOOLBAR_URL', devDefaults('https://www-r.referens.sys.kth.se/social/toolbar/widget.js'))
  }
}
