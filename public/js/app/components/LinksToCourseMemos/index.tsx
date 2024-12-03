import React from 'react'
import { useWebContext } from '../../context/WebContext'
import { CourseMemoPdf, CourseMemoWeb } from './types'
import i18n from '../../../../../i18n'
import ActiveOrDisabledLink from '../ActiveOrDisabledLink'

function isCourseMemoPdf(memo: CourseMemoPdf | CourseMemoWeb): memo is CourseMemoPdf {
  return memo.isPdf === true
}

function groupApplicationCodesByMemoStatus(
  memos: Record<string, CourseMemoPdf | CourseMemoWeb>,
  applicationCodes: string
): [string[], string[]] {
  const applicationCodesArray = applicationCodes.split(',')
  const withMemo: string[] = []
  const withoutMemo: string[] = []

  applicationCodesArray.forEach((code) => {
    if (memos[code]) withMemo.push(code)
    else withoutMemo.push(code)
  })

  return [withoutMemo, withMemo]
}

function getUniqueMemos(
  memos: Record<string, CourseMemoPdf | CourseMemoWeb>,
  applicationCodes: string[]
): [Record<string, CourseMemoPdf>, Record<string, CourseMemoWeb>] {
  const pdfMemos: Record<string, CourseMemoPdf> = {}
  const webMemos: Record<string, CourseMemoWeb> = {}

  applicationCodes.forEach((applicationCode) => {
    const memo = memos[applicationCode]
    if (isCourseMemoPdf(memo)) {
      if (!pdfMemos[memo.courseMemoFileName]) pdfMemos[memo.courseMemoFileName] = memo
      else pdfMemos[memo.courseMemoFileName].applicationCodes.push(applicationCode)
    } else {
      if (!webMemos[memo.memoEndPoint]) webMemos[memo.memoEndPoint] = memo
      else webMemos[memo.memoEndPoint].applicationCodes.push(applicationCode)
    }
  })

  return [pdfMemos, webMemos]
}

const LinksToCourseMemos: React.FC<{
  applicationCodes: string
  semester: string
}> = ({ applicationCodes, semester }) => {
  const [{ miniMemosPdfAndWeb, browserConfig, userLang, courseCode }] = useWebContext()
  const { memoStorageUri, hostUrl } = browserConfig

  const memos = miniMemosPdfAndWeb[semester] || {}
  const [roundsWithoutMemo, roundsWithMemo] = groupApplicationCodesByMemoStatus(memos, applicationCodes)
  const [pdfMemos, webMemos] = getUniqueMemos(memos, roundsWithMemo)

  const translate = i18n.messages[userLang === 'en' ? 0 : 1]
  const { memoLink, courseShortSemester } = translate.tableHeaders
  const { label, noAddedDoc } = memoLink

  const semesterLabel = courseShortSemester[semester.slice(-1)]
  const year = semester.slice(0, 4)
  const offeringIds = applicationCodes.split(',').join('-')
  const courseOfferingName = `${semesterLabel} ${year}-${offeringIds}`
  const memoTitle = `${label} ${courseCode} ${courseOfferingName}`
  const cleanHostUrl = hostUrl.endsWith('/') ? hostUrl.slice(0, -1) : hostUrl

  return (
    <>
      {roundsWithoutMemo.map((applicationCode, index) => (
        <ActiveOrDisabledLink key={index} ariaLabel={memoTitle} linkTitle={noAddedDoc} disabled />
      ))}
      {Object.entries(pdfMemos).map(([fileName]) => (
        <ActiveOrDisabledLink
          key={fileName}
          ariaLabel={`PDF ${memoTitle}`}
          className="pdf-link"
          href={`${memoStorageUri}${fileName}`}
          linkTitle={memoTitle}
        />
      ))}
      {Object.entries(webMemos).map(([endPoint]) => (
        <ActiveOrDisabledLink
          key={endPoint}
          ariaLabel={memoTitle}
          href={`${cleanHostUrl}/kurs-pm/${courseCode}/${endPoint}`}
          linkTitle={memoTitle}
        />
      ))}
    </>
  )
}

export default LinksToCourseMemos
