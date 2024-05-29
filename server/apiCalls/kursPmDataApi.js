'use strict'

const log = require('@kth/log')
const { sv, en } = require('date-fns/locale')
const { utcToZonedTime, format } = require('date-fns-tz')

const i18n = require('../../i18n')
const api = require('../api')

const locales = { sv, en }

async function getSortedAndPrioritizedMiniMemosWebOrPdf(courseCode) {
  const { client, paths } = api.kursPmDataApi

  try {
    const uri = client.resolve(paths.getPrioritizedWebOrPdfMemosByCourseCode.uri, { courseCode })

    const { body } = await client.getAsync({ uri })
    if (!body) log.debug('kurs-pm-data-api is not available at the moment in getSortedAndPrioritizedMiniMemosWebOrPdf')
    return body || []
  } catch (err) {
    log.debug('getSortedAndPrioritizedMiniMemosWebOrPdf is not available', err)
    return []
  }
}

async function getAllMemosByCourseCodeAndType(courseCode, type) {
  const { client, paths } = api.kursPmDataApi

  try {
    const uri = client.resolve(paths.getAllMemosByCourseCodeAndType.uri, { courseCode, type })

    const { body } = await client.getAsync({ uri })
    if (!body) log.debug('kurs-pm-data-api is not available at the moment in getAllMemosByCourseCodeAndType ')

    return body
  } catch (err) {
    log.debug('getAllMemosByCourseCodeAndType is not available', err)
    return err
  }
}

function formatVersionDate(language = 'sv', date) {
  const unixTime = Date.parse(date)
  if (unixTime) {
    const timeZone = 'Europe/Berlin'
    const zonedDate = utcToZonedTime(new Date(unixTime), timeZone)
    if (language === 'sv') {
      return format(zonedDate, 'yyyy-MM-dd', { locale: locales[language] })
    } else {
      const options = {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }
      return zonedDate.toLocaleString('en-GB', options)
    }
  }
  return null
}
function getLanguageIndex(languageAbbr) {
  return languageAbbr === 'en' ? 0 : 1
}

function formatVersionName(memoName, versionNumber, languageAbbr, date) {
  const languageIndex = getLanguageIndex(languageAbbr)
  const { archiveTitles } = i18n.messages[languageIndex].messages
  const { label_version: versionLabel } = archiveTitles
  const versionDate = formatVersionDate(languageAbbr, date)
  const versionNumberLabel = `${versionLabel} ${versionNumber}`
  const versionName = `${versionNumberLabel} – ${versionDate}`
  const versionAriaName = `${versionNumberLabel} ${memoName} ${versionDate}`
  return { versionAriaName, versionName }
}

function memoWebBasedVersionsUrls(memoName, courseMemo, languageIndex, latest) {
  const { courseCode, version, lastChangeDate, memoEndPoint, memoCommonLangAbbr } = courseMemo
  const { versionAriaName, versionName } = formatVersionName(memoName, version, memoCommonLangAbbr, lastChangeDate)
  const url = `/kurs-pm/${latest ? '' : 'old/'}${courseCode}/${memoEndPoint}${latest ? '' : '/' + version}`
  return { ariaLabel: versionAriaName, lastChangeDate, name: versionName, url, latest }
}

function resolveMemoBlobUrl() {
  const devMemoStorageUrl = 'https://kursinfostoragestage.blob.core.windows.net/memo-blob-container/'
  const prodMemoStorageUrl = 'https://kursinfostorageprod.blob.core.windows.net/memo-blob-container/'
  const memoStorageUrl = process.env.MEMO_STORAGE_URL
  if (memoStorageUrl) {
    return memoStorageUrl
  }
  const nodeEnv = process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase()
  if (nodeEnv === 'development' || nodeEnv === 'dev' || !nodeEnv) {
    return devMemoStorageUrl
  }
  return prodMemoStorageUrl
}

function parseMemoNameAndOfferings(courseMemo, languageIndex) {
  const {
    courseCode,
    applicationCodes,
    semester: memoYearAndSeason,
    // web-based memo props
    memoName: initialMemoName
  } = courseMemo

  const { archiveTitles } = i18n.messages[languageIndex].messages
  const { label_memo: memoLabel, course_short_semester: semesterLabel } = archiveTitles

  const semester = semesterLabel[memoYearAndSeason.slice(-1)]
  const year = memoYearAndSeason.slice(0, 4)
  const offeringIds = applicationCodes.reduce((label, id) => `${label}-${id}`, '')

  const courseOffering = initialMemoName ? initialMemoName : `${semester} ${year}${offeringIds}`
  const memoName = `${memoLabel} ${courseCode} ${semester} ${year}${offeringIds}`

  return { memoName, courseOffering }
}
const FIRST_VERSION = 1

function parseUploadedMemo(courseMemo, memoBlobUrl, userLanguageAbbr) {
  const { semester, courseMemoFileName: lastestMemoFileName, isPdf, lastChangeDate, previousFileList } = courseMemo
  const languageIndex = getLanguageIndex(userLanguageAbbr)

  const { memoName, courseOffering } = parseMemoNameAndOfferings(courseMemo, languageIndex)
  const latestVersionNumber = previousFileList ? previousFileList.length + 1 : FIRST_VERSION

  const latestMemo = { courseMemoFileName: lastestMemoFileName, version: latestVersionNumber, lastChangeDate }

  const allVersionsAndUrls = [latestMemo, ...previousFileList].map((memo, index) => {
    const { versionAriaName, versionName } = formatVersionName(
      memoName,
      memo.version,
      userLanguageAbbr,
      memo.lastChangeDate
    )
    const url = `${memoBlobUrl}${memo.courseMemoFileName}`
    return { ariaLabel: versionAriaName, name: versionName, url, latest: index === 0 }
  })

  return { semester, courseOffering, isPdf, memoName, memoVersionsAndUrls: allVersionsAndUrls }
}

function parseWebBasedMemo(courseMemo, oldWebMemos) {
  const { semester, memoCommonLangAbbr, isPdf } = courseMemo
  const languageIndex = getLanguageIndex(memoCommonLangAbbr)

  const { memoName, courseOffering } = parseMemoNameAndOfferings(courseMemo, languageIndex)

  const memoVersionsAndUrls = oldWebMemos.map((o) => memoWebBasedVersionsUrls(memoName, o, languageIndex))
  const latestMemoVersionAndUrl = memoWebBasedVersionsUrls(memoName, courseMemo, languageIndex, true)
  memoVersionsAndUrls.push(latestMemoVersionAndUrl)
  memoVersionsAndUrls.reverse()

  return { semester, courseOffering, isPdf, memoName, memoVersionsAndUrls }
}

function removeKeysAndFlattenToArray(memosWithRoundKeys) {
  return Object.keys(memosWithRoundKeys).map((roundid) => memosWithRoundKeys[roundid])
}

function removeWebMemosDuplicates(flattenMemosList) {
  const tmpUniqueKeys = []
  return flattenMemosList.filter(({ memoEndPoint }) => {
    if (memoEndPoint && tmpUniqueKeys.includes(memoEndPoint)) return false
    if (memoEndPoint && !tmpUniqueKeys.includes(memoEndPoint)) tmpUniqueKeys.push(memoEndPoint)
    // if web-based memo is unique or if it's pdf memo, then return true
    return true
  })
}

async function getCourseMemosVersions(courseCode, userLanguage) {
  const courseMemos = []
  const memoBlobUrl = resolveMemoBlobUrl()

  const allOldWebBasedMemos = await getAllMemosByCourseCodeAndType(courseCode, 'old')

  const publicMemos = await getSortedAndPrioritizedMiniMemosWebOrPdf(courseCode)
  Object.keys(publicMemos).forEach((semester) => {
    const semesterMemos = publicMemos[semester]
    const flattenMemosList = removeKeysAndFlattenToArray(semesterMemos)
    const cleanFlatMemosList = removeWebMemosDuplicates(flattenMemosList)

    const oldWebMemos = allOldWebBasedMemos.filter((o) => o.semester === semester)
    cleanFlatMemosList.forEach((m) => {
      const courseMemo = m.isPdf
        ? parseUploadedMemo(m, memoBlobUrl, userLanguage)
        : parseWebBasedMemo(
            m,
            oldWebMemos.filter((o) => o.memoEndPoint === m.memoEndPoint)
          )
      courseMemos.push(courseMemo)
    })
  })
  courseMemos.reverse()
  return courseMemos
}

module.exports = {
  getCourseMemosVersions,
  getSortedAndPrioritizedMiniMemosWebOrPdf
}
