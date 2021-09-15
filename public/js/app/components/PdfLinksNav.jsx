import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'

import { SYLLABUS_URL } from '../util/constants'
import { getDateFormat } from '../util/helpers'
import LinkToValidSyllabusPdf from './LinkToValidSyllabus'
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

function parseCourseOffering(ladokRoundIds, rawSemester, lang = 'sv') {
  const languageIndex = typeof lang === 'string' ? (lang === 'en' ? 0 : 1) : lang
  const { archiveTitles: memoTitles } = i18n.messages[languageIndex].messages

  const { label_memo: memoLabel, course_short_semester: shortSemLabels } = memoTitles

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
  const { courseCode, ladokRoundIds, memoCommonLangAbbr, semester, memoName: courseOffering } = courseMemo

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

@inject(['adminStore'])
@observer
class PdfLinksNav extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.getMemoLinksInfo = this.getMemoLinksInfo.bind(this)
  }

  getMemoLinksInfo(thisSemesterMemos, analysesLadokRounds) {
    const unfilteredRoundsMissingMemos = []
    const tmpMemoNames = {}
    // move rounds without a memo to a separate array
    const roundsWithMemo = analysesLadokRounds.filter((analysesRoundId) => {
      const hasMemo = !!thisSemesterMemos[analysesRoundId]
      if (!hasMemo) {
        unfilteredRoundsMissingMemos.push(analysesRoundId)
        return false
      }
      return true
    })
    // check for duplicates and mark it
    const existingMemosAndDuplicates =
      roundsWithMemo.map((analysesRoundId) => {
        const thisRoundMemo = thisSemesterMemos[analysesRoundId]
        const { courseMemoFileName, memoEndPoint, isPdf } = thisRoundMemo
        const memoUniqueId = isPdf ? courseMemoFileName : memoEndPoint
        const uid = memoUniqueId ? memoUniqueId : 'noName'
        if (!tmpMemoNames[uid]) {
          tmpMemoNames[uid] = 'has_memo'
          return { type: 'original', ...thisRoundMemo }
        } else return { type: 'duplicate', uid, analysesRoundId, isPdf }
      }) || []

    const uniqueMemos = existingMemosAndDuplicates.filter(({ type }) => type !== 'duplicate') || []
    const duplicates = existingMemosAndDuplicates.filter(({ type }) => type === 'duplicate') || []

    // update original memos with ladok round id from a duplicate memo
    duplicates.forEach(({ uid, analysesRoundId, isPdf }) => {
      const index = uniqueMemos.findIndex(({ isPdf, courseMemoFileName = 'noName', memoEndPoint = 'noName' }) =>
        isPdf ? courseMemoFileName === uid : memoEndPoint === uid
      )
      uniqueMemos[index].ladokRoundIds.push(analysesRoundId)
    })

    return [unfilteredRoundsMissingMemos, uniqueMemos]
  }

  render() {
    const { translate, staticAnalysisInfo, lang } = this.props
    const { link_memo: linkMemoTexts, link_analysis: linkAnalysisTexts } = translate
    const { miniMemosPdfAndWeb } = this.props.adminStore

    const { storageUri, memoStorageUri, hostUrl } = this.props.adminStore.browserConfig
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
    const [unfilteredRoundsMissingMemos, existingMemos] = this.getMemoLinksInfo(thisSemesterMemos, analysesLadokRounds)
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
            const { isPdf, courseCode, memoEndPoint } = memoInfo
            return isPdf ? (
              <ParseUploadedMemo
                key={index}
                translate={linkMemoTexts}
                fileInfo={memoInfo}
                memoBlobUrl={memoStorageUri}
                userLanguageAbbr={lang}
                translate={linkMemoTexts}
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
}

PdfLinksNav.propTypes = {
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

ParseUploadedMemo.propTypes = {
  fileInfo: PropTypes.shape({
    courseCode: PropTypes.string,
    courseMemoFileName: PropTypes.string,
    ladokRoundIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    semester: PropTypes.string
  }),
  memoBlobUrl: PropTypes.string,
  translate: PropTypes.shape({
    label_memo: PropTypes.string.isRequired
  }).isRequired,
  userLanguageAbbr: PropTypes.oneOf(['en', 'sv']).isRequired
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

export default PdfLinksNav
