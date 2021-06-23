import React, { Component } from 'react'
import { SYLLABUS_URL } from '../util/constants'
import { getDateFormat } from '../util/helpers'
import LinkToValidSyllabusPdf from './LinkToValidSyllabus'
import { inject, observer } from 'mobx-react'
import i18n from '../../../../i18n'

const ActiveOrDisabledPdfLink = ({ ariaLabel, href = '', className = '', linkTitle, translate, validFrom = '' }) => {
  const { no_added_doc } = translate
  return (
    <p key={linkTitle}>
      {href === '' ? (
        <a
          aria-label={`${ariaLabel}: ${no_added_doc}`}
          className={`${className} btn-link disabled`}
          style={{ paddingLeft: 0 }}
        >
          <i>{no_added_doc}</i>
        </a>
      ) : (
        <a
          aria-label={`${ariaLabel}${validFrom ? ': ' + validFrom : ''}`}
          href={href}
          className={className}
          target="_blank"
        >
          {`${linkTitle}${validFrom ? ': ' + validFrom : ''}`}
        </a>
      )}
    </p>
  )
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

function parseCourseOffering(ladokRoundIds, rawSemester, langAbbr) {
  const languageIndex = langAbbr === 'en' ? 0 : 1
  const { archiveTitles: memoTitles } = i18n.messages[languageIndex].messages

  const { label_memo: memoLabel, course_short_semester: shortSemLabels } = memoTitles

  const semester = shortSemLabels[rawSemester.toString().slice(-1)]
  const year = rawSemester.toString().slice(0, 4)

  const offeringIds = ladokRoundIds.reduce((label, id) => `${label}-${id}`, '')

  const courseOfferings = `${semester} ${year}${offeringIds}`
  return courseOfferings
}

function ParseUploadedMemo({ fileInfo, memoBlobUrl, userLanguageAbbr, translate }) {
  const courseOfferingName = parseCourseOffering(fileInfo.ladokRoundIds, fileInfo.semester, userLanguageAbbr)

  const { label_memo: memoLabel } = translate
  const { courseCode, courseMemoFileName } = fileInfo

  const memoNameWithCourseOfferings = `${memoLabel} ${courseCode} ${courseOfferingName}`

  return (
    <ActiveOrDisabledPdfLink
      ariaLabel={`PDF ${memoNameWithCourseOfferings}`}
      className="pdf-link"
      href={`${memoBlobUrl}${courseMemoFileName}`}
      linkTitle={memoNameWithCourseOfferings}
      translate={translate}
    />
  )
}

function ParseWebMemoName({ courseMemo, translate }) {
  const { courseCode, ladokRoundIds, memoCommonLangAbbr, semester, memoName: courseOffering, memoEndPoint } = courseMemo
  console.log('WEB courseMemo', courseMemo)
  console.log('WEB rawSemester', semester)

  if (!ladokRoundIds) return null
  const courseOfferingName = parseCourseOffering(ladokRoundIds, semester, memoCommonLangAbbr)
  const { label_memo: memoLabel } = translate

  const memoNameWithCourseOfferings = `${memoLabel} ${courseCode} ${courseOfferingName}`

  return (
    <ActiveOrDisabledPdfLink
      ariaLabel={`${memoNameWithCourseOfferings}`}
      href={`kurs-pm/${courseCode}/${memoEndPoint}`}
      linkTitle={memoNameWithCourseOfferings}
      translate={translate}
    />
  )
}

@inject(['adminStore'])
@observer
class PdfLinksNav extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.getMemoLinksInfo = this.getMemoLinksInfo.bind(this)
  }

  getMemoLinksInfo(thisSemesterMemos, analysesLadokRounds) {
    const roundsMissingMemos = []
    const existingMemos =
      analysesLadokRounds
        .filter((analysesRoundId) => {
          const roundhasMemo = !!thisSemesterMemos[analysesRoundId]
          if (!roundhasMemo) {
            roundsMissingMemos.push(analysesRoundId)
            return false
          }
          return true
        })
        .map((analysesRoundId) => {
          const thisRoundMemo = thisSemesterMemos[analysesRoundId]
          const { courseMemoFileName, memoEndPoint, isPdf } = thisRoundMemo
          const memoUniqueId = isPdf ? courseMemoFileName : memoEndPoint
          return {
            [memoUniqueId ? memoUniqueId : 'noName']: thisRoundMemo
          }
        }) || []
    return [roundsMissingMemos, existingMemos]
  }

  render() {
    const { translate, thisAnalysisObj, lang } = this.props
    const { link_memo: linkMemoTexts } = translate
    const { miniMemosPdfAndWeb } = this.props.adminStore
    const { storageUri } = this.props.adminStore.browserConfig
    const memoStorageUrl = resolveMemoBlobUrl() //move to domain or settings
    const {
      analysisFileName,
      analysisName,
      courseCode,
      pdfAnalysisDate,
      syllabusStartTerm,
      roundIdList,
      semester: analysisSemester
    } = thisAnalysisObj

    const analysesLadokRounds = roundIdList.split(',') || []
    const thisSemesterMemos = miniMemosPdfAndWeb[analysisSemester] || []
    const [roundsMissingMemos, existingMemos] = this.getMemoLinksInfo(thisSemesterMemos, analysesLadokRounds)

    return (
      <span className="right-block-of-links">
        <LinkToValidSyllabusPdf startDate={syllabusStartTerm} lang={lang} key={syllabusStartTerm} />
        <span className="vertical-block-of-links">
          {roundsMissingMemos.map((ladokRoundId) => {
            const missingMemoOfferingName = parseCourseOffering([ladokRoundId], analysisSemester, lang)
            return (
              <ActiveOrDisabledPdfLink
                ariaLabel={`${linkMemoTexts.label_memo} ${courseCode} ${missingMemoOfferingName}`}
                linkTitle={`${linkMemoTexts.label_memo} ${courseCode} ${missingMemoOfferingName}`}
                translate={linkMemoTexts}
              />
            )
          })}
          {existingMemos.map((memo) => {
            const memoInfo = Object.values(memo)[0]
            const { isPdf } = memoInfo
            return isPdf ? (
              <ParseUploadedMemo
                translate={linkMemoTexts}
                fileInfo={memoInfo}
                memoBlobUrl={memoStorageUrl}
                userLanguageAbbr={lang}
                translate={linkMemoTexts}
              />
            ) : (
              <ParseWebMemoName courseMemo={memoInfo} translate={linkMemoTexts} />
            )
          })}
        </span>

        <ActiveOrDisabledPdfLink
          ariaLabel={`PDF ${translate.link_analysis} ${analysisName}`}
          href={`${storageUri}${analysisFileName}`}
          className="pdf-link"
          linkTitle={`${translate.link_analysis.label_analysis}`}
          translate={translate.link_analysis}
          validFrom={getDateFormat(pdfAnalysisDate, lang)}
        />
      </span>
    )
  }
}

export default PdfLinksNav
