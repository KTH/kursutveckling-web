import React from 'react'
import PropTypes from 'prop-types'

import { getDateFormat } from '../util/helpers'
import { useWebContext } from '../context/WebContext'
import i18n from '../../../../i18n'
import LinkToValidSyllabusPdf from './LinkToValidSyllabus'

const ActiveOrDisabledPdfLink = ({ ariaLabel, href = '', className = '', linkTitle, translate, validFrom = '' }) => {
  const { no_added_doc } = translate
  return (
    <p key={linkTitle}>
      {href === '' ? (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
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
          rel="noreferrer"
        >
          {`${linkTitle}${validFrom ? ': ' + validFrom : ''}`}
        </a>
      )}
    </p>
  )
}

function parseCourseOffering(ladokRoundIds, rawSemester, lang = 'sv') {
  const languageIndex = typeof lang === 'string' ? (lang === 'en' ? 0 : 1) : lang
  const { archiveTitles: memoTitles } = i18n.messages[languageIndex].messages

  const { course_short_semester: shortSemLabels } = memoTitles

  const semester = shortSemLabels[rawSemester.toString().slice(-1)]
  const year = rawSemester.toString().slice(0, 4)

  const offeringIds = ladokRoundIds.reduce((label, id) => `${label}-${id}`, '')

  const courseOfferings = `${semester} ${year}${offeringIds}`
  return courseOfferings
}

function ParseUploadedMemo({ fileInfo, memoBlobUrl, userLanguageAbbr, translate }) {
  const { courseCode, courseMemoFileName, ladokRoundIds, semester: memoSemester } = fileInfo

  const courseOfferingName = parseCourseOffering(ladokRoundIds, memoSemester, userLanguageAbbr)

  const { label_memo: memoLabel } = translate

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

function ParseWebMemoName({ courseMemo, memoHref, translate }) {
  const { courseCode, ladokRoundIds, memoCommonLangAbbr, semester } = courseMemo

  if (!ladokRoundIds) return null
  const courseOfferingName = parseCourseOffering(ladokRoundIds, semester, memoCommonLangAbbr)
  const { label_memo: memoLabel } = translate

  const memoNameWithCourseOfferings = `${memoLabel} ${courseCode} ${courseOfferingName}`

  return (
    <ActiveOrDisabledPdfLink
      ariaLabel={`${memoNameWithCourseOfferings}`}
      href={memoHref}
      linkTitle={memoNameWithCourseOfferings}
      translate={translate}
    />
  )
}

function getMemoLinksInfo(thisSemesterMemos, analysesLadokRounds) {
  const unfilteredRoundsMissingMemos = []
  const tmpMemoNames = {}
  // move rounds without a memo to a separate array
  const roundsWithMemo = analysesLadokRounds.filter((analysesLadokRoundId) => {
    const hasMemo = !!thisSemesterMemos[analysesLadokRoundId]
    if (!hasMemo) {
      unfilteredRoundsMissingMemos.push(analysesLadokRoundId)
      return false
    }
    return true
  })
  // check for duplicates and mark it
  const existingMemosAndDuplicates =
    roundsWithMemo.map((analysesLadokRoundId) => {
      const thisRoundMemo = thisSemesterMemos[analysesLadokRoundId]
      const { courseMemoFileName, memoEndPoint, isPdf } = thisRoundMemo
      const memoUniqueId = isPdf ? courseMemoFileName : memoEndPoint
      const uid = memoUniqueId ? memoUniqueId : 'noName'
      if (!tmpMemoNames[uid]) {
        tmpMemoNames[uid] = 'has_memo'
        return { type: 'original', ...thisRoundMemo }
      } else return { type: 'duplicate', uid, analysesLadokRoundId, isPdf }
    }) || []

  const uniqueMemos = existingMemosAndDuplicates.filter(({ type }) => type !== 'duplicate') || []
  const duplicates = existingMemosAndDuplicates.filter(({ type }) => type === 'duplicate') || []

  // update original memos with ladok round id from a duplicate memo
  duplicates.forEach(({ uid, analysesLadokRoundId, isPdf }) => {
    if (isPdf) {
      const index = uniqueMemos.findIndex(({ isPdf, courseMemoFileName = 'noName', memoEndPoint = 'noName' }) =>
        isPdf ? courseMemoFileName === uid : memoEndPoint === uid
      )
      uniqueMemos[index].ladokRoundIds.push(analysesLadokRoundId)
    }
  })

  return [unfilteredRoundsMissingMemos, uniqueMemos]
}

function DocumentLinksNav(props) {
  const [context] = useWebContext()

  const { translate, staticAnalysisInfo, lang } = props
  const { link_memo: linkMemoTexts, link_analysis: linkAnalysisTexts } = translate
  const { miniMemosPdfAndWeb } = context

  const { storageUri, memoStorageUri, hostUrl } = context.browserConfig
  const cleanHostUrl = hostUrl.slice(-1) === '/' ? hostUrl.slice(0, -1) : hostUrl

  const {
    analysisFileName,
    analysisName,
    courseCode,
    pdfAnalysisDate,
    syllabusStartTerm,
    roundIdList,
    semester: analysisSemester
  } = staticAnalysisInfo

  const analysesLadokRounds = roundIdList.split(',') || []
  const thisSemesterMemos = miniMemosPdfAndWeb[analysisSemester] || []
  const [unfilteredRoundsMissingMemos, existingMemos] = getMemoLinksInfo(thisSemesterMemos, analysesLadokRounds)

  return (
    <span className="right-block-of-links">
      <LinkToValidSyllabusPdf startDate={syllabusStartTerm} lang={lang} key={syllabusStartTerm} />
      <span className="vertical-block-of-links">
        {unfilteredRoundsMissingMemos.map((ladokRoundId) => {
          const missingMemoOfferingName = parseCourseOffering([ladokRoundId], analysisSemester, lang)
          const title = `${linkMemoTexts.label_memo} ${courseCode} ${missingMemoOfferingName}`
          return <ActiveOrDisabledPdfLink ariaLabel={title} key={title} linkTitle={title} translate={linkMemoTexts} />
        })}
        {existingMemos.map((memoInfo, index) => {
          const { isPdf, memoEndPoint } = memoInfo
          return isPdf ? (
            <ParseUploadedMemo
              key={index}
              translate={linkMemoTexts}
              fileInfo={memoInfo}
              memoBlobUrl={memoStorageUri}
              userLanguageAbbr={lang}
            />
          ) : (
            <ParseWebMemoName
              memoHref={`${cleanHostUrl}/kurs-pm/${courseCode}/${memoEndPoint}`}
              courseMemo={memoInfo}
              key={index}
              translate={linkMemoTexts}
            />
          )
        })}
      </span>

      <ActiveOrDisabledPdfLink
        ariaLabel={`PDF ${linkAnalysisTexts.label_analysis} ${analysisName}`}
        href={`${storageUri}${analysisFileName}`}
        className="pdf-link"
        linkTitle={`${linkAnalysisTexts.label_analysis}`}
        translate={linkAnalysisTexts}
        validFrom={getDateFormat(pdfAnalysisDate, lang)}
      />
    </span>
  )
}

export default DocumentLinksNav

DocumentLinksNav.propTypes = {
  lang: PropTypes.oneOf(['en', 'sv']).isRequired,
  translate: PropTypes.shape({
    link_analysis: PropTypes.shape({ label_analysis: PropTypes.string, no_added_doc: PropTypes.string }).isRequired,
    link_memo: PropTypes.shape({ label_memo: PropTypes.string, no_added_doc: PropTypes.string }).isRequired
  }).isRequired,
  staticAnalysisInfo: PropTypes.shape({
    analysisFileName: PropTypes.string,
    analysisName: PropTypes.string,
    courseCode: PropTypes.string,
    pdfAnalysisDate: PropTypes.string,
    syllabusStartTerm: PropTypes.string,
    roundIdList: PropTypes.string,
    semester: PropTypes.string
  })
}

ParseWebMemoName.propTypes = {
  courseMemo: PropTypes.shape({
    courseCode: PropTypes.string.isRequired,
    ladokRoundIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    memoCommonLangAbbr: PropTypes.oneOf(['en', 'sv']),
    semester: PropTypes.string.isRequired,
    memoName: PropTypes.string,
    memoEndPoint: PropTypes.string
  }).isRequired,
  translate: PropTypes.shape({
    label_memo: PropTypes.string.isRequired
  }).isRequired
}
