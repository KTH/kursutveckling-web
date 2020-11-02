'use strict'

const log = require('kth-node-log')
const { sv, en } = require('date-fns/locale')
const { utcToZonedTime, format } = require('date-fns-tz')

const i18n = require('../../i18n')
const api = require('../api')

const locales = { sv, en }

async function getMiniMemosPdfAndWeb(courseCode) {
  const { client, paths } = api.kursPmDataApi
  const uri = client.resolve(paths.getPdfAndWebMemosListByCourseCode.uri, { courseCode })

  try {
    const res = await client.getAsync({ uri })
    return res.body
  } catch (err) {
    log.debug('getMiniMemosPdfAndWeb is not available', err)
    return err
  }
}

async function getAllMemosByCourseCodeAndType(courseCode, type) {
  const { client, paths } = api.kursPmDataApi
  const uri = client.resolve(paths.getAllMemosByCourseCodeAndType.uri, { courseCode, type })

  try {
    const res = await client.getAsync({ uri })
    return res.body
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
    return format(zonedDate, 'Ppp', { locale: locales[language] })
  }
  return null
}

function memoVersion(courseMemo, archiveTitles, latest) {
  const versionLabel = archiveTitles.label_version
  const { courseCode, version, lastChangeDate, memoEndPoint, memoCommonLangAbbr } = courseMemo
  const versionDate = formatVersionDate(memoCommonLangAbbr, lastChangeDate)
  const versionName = `${versionLabel} ${version} – ${versionDate}`
  const url = `/kurs-pm/${latest ? '' : 'old/'}${courseCode}/${memoEndPoint}${
    latest ? '' : '/' + version
  }`
  return { name: versionName, url, latest }
}

function parseUploadedMemo(courseMemo, userLanguage) {
  const translations = i18n.messages
  const languageIndex = userLanguage === 'en' ? 0 : 1
  const { archiveTitles } = translations[languageIndex].messages

  const semester = archiveTitles.course_short_semester[courseMemo.semester.slice(-1)]
  const year = courseMemo.semester.slice(0, 4)
  const offeringIds = courseMemo.ladokRoundIds.reduce((label, id) => `${label}-${id}`, '')

  const courseOffering = `${semester} ${year}${offeringIds}`

  const memoLabel = archiveTitles.label_memo
  const { courseCode } = courseMemo
  const memoFileName = courseMemo.courseMemoFileName

  const name = `${memoLabel} ${courseCode} ${semester} ${year}${offeringIds}`
  const url = `https://kursinfostoragestage.blob.core.windows.net/memo-blob-container/${memoFileName}`
  const memoVersions = [{ name, url }]

  return { isPdf: true, courseOffering, memoVersions }
}

function parsePublishedMemo(courseMemo, oldMemos) {
  const translations = i18n.messages
  const languageIndex = courseMemo.memoCommonLangAbbr === 'en' ? 0 : 1
  const { archiveTitles } = translations[languageIndex].messages

  const memoLabel = archiveTitles.label_memo
  const semester = archiveTitles.course_short_semester[courseMemo.semester.slice(-1)]
  const year = courseMemo.semester.slice(0, 4)
  const offeringIds = courseMemo.ladokRoundIds.reduce((label, id) => `${label}-${id}`, '')
  const name = courseMemo.memoName

  const courseOffering = `${semester} ${year}${offeringIds} ${name}`
  const memoName = `${memoLabel} ${courseMemo.courseCode} ${semester} ${year}${offeringIds}`

  const memoVersions = oldMemos.map((o) => {
    return memoVersion(o, archiveTitles)
  })
  const latestMemoVersion = memoVersion(courseMemo, archiveTitles, true)
  memoVersions.push(latestMemoVersion)
  memoVersions.reverse()

  return { memoName, isPdf: false, courseOffering, memoVersions }
}

async function getCourseMemos(courseCode, userLanguage) {
  const courseMemos = []

  const allOldMemos = await getAllMemosByCourseCodeAndType(courseCode, 'old')

  const publicMemos = await getMiniMemosPdfAndWeb(courseCode)
  Object.keys(publicMemos).forEach((semester) => {
    const semesterMemos = publicMemos[semester]
    const oldMemos = allOldMemos.filter((o) => o.semester === semester)
    semesterMemos.forEach((m) => {
      const courseMemo = m.isPdf
        ? parseUploadedMemo(m, userLanguage)
        : parsePublishedMemo(
            m,
            oldMemos.filter((o) => o.memoEndPoint === m.memoEndPoint)
          )
      courseMemos.push(courseMemo)
    })
  })

  courseMemos.reverse()
  return courseMemos
}

module.exports = {
  getCourseMemos
}
