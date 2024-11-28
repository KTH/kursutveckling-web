import React from 'react'
import { useWebContext } from '../../context/WebContext'
import { CourseMemoPdf, CourseMemoWeb } from './types'
import i18n from '../../../../../i18n'
import ActiveOrDisabledLink from '../ActiveOrDisabledLink'

function isCourseMemoPdf(memo: CourseMemoPdf | CourseMemoWeb): memo is CourseMemoPdf {
  return (memo as CourseMemoPdf).isPdf === true
}

function groupApplicationCodesByMemoStatus(
  thisSemesterMemos: Record<string, CourseMemoPdf | CourseMemoWeb>,
  applicationCodes: string
): [string[], string[]] {
  const applicationCodesArray = applicationCodes.split(',')
  const roundsWithoutMemo: string[] = []
  const roundsWithMemo: string[] = []

  applicationCodesArray.forEach((applicationCode) => {
    if (thisSemesterMemos[applicationCode]) roundsWithMemo.push(applicationCode)
    else roundsWithoutMemo.push(applicationCode)
  })

  return [roundsWithoutMemo, roundsWithMemo]
}

function getUniqueMemos(
  thisSemesterMemos: Record<string, CourseMemoPdf | CourseMemoWeb>,
  applicationCodes: string[]
): [Record<string, CourseMemoPdf>, Record<string, CourseMemoWeb>] {
  const uniquePdfMemos: Record<string, CourseMemoPdf> = {}
  const uniqueWebMemos: Record<string, CourseMemoWeb> = {}

  applicationCodes.forEach((applicationCode) => {
    const courseMemo = thisSemesterMemos[applicationCode]

    if (isCourseMemoPdf(courseMemo)) {
      const { courseMemoFileName } = courseMemo
      if (!uniquePdfMemos[courseMemoFileName]) uniquePdfMemos[courseMemoFileName] = courseMemo
      else uniquePdfMemos[courseMemoFileName].applicationCodes.push(applicationCode)
    } else {
      const { memoEndPoint } = courseMemo
      if (!uniqueWebMemos[memoEndPoint]) uniqueWebMemos[memoEndPoint] = courseMemo
      else uniqueWebMemos[memoEndPoint].applicationCodes.push(applicationCode)
    }
  })
  return [uniquePdfMemos, uniqueWebMemos]
}

const LinkToCourseMemo: React.FC<{ applicationCodes: string; semester: string }> = ({ applicationCodes, semester }) => {
  const [{ miniMemosPdfAndWeb, browserConfig, userLang, courseCode }] = useWebContext()
  const thisSemesterMemos = miniMemosPdfAndWeb[semester] || []

  const { memoStorageUri, hostUrl } = browserConfig
  const cleanHostUrl = hostUrl.endsWith('/') ? hostUrl.slice(0, -1) : hostUrl

  const [roundsWithoutMemo, roundsWithMemo] = groupApplicationCodesByMemoStatus(thisSemesterMemos, applicationCodes)
  const [uniquePdfMemos, uniqueWebMemos] = getUniqueMemos(thisSemesterMemos, roundsWithMemo)

  const translate = i18n.messages[userLang === 'en' ? 0 : 1]
  const { label, noAddedDoc } = translate.tableHeaders.memoLink
  const { courseShortSemester } = translate.messages

  const semesterLabel = courseShortSemester[semester.slice(-1)]
  const year = semester.slice(0, 4)
  const offeringIds = applicationCodes.split(',').join('-')
  const courseOfferingName = `${semesterLabel} ${year}-${offeringIds}`
  const memoNameWithCourseOfferings = `${label} ${courseCode} ${courseOfferingName}`

  return (
    <>
      {roundsWithoutMemo.map((applicationCode, index) => {
        return (
          <ActiveOrDisabledLink
            key={index}
            ariaLabel={memoNameWithCourseOfferings}
            linkTitle={noAddedDoc}
            disabled={true}
          />
        )
      })}
      {Object.keys(uniquePdfMemos).map((courseMemoFileName) => {
        return (
          <ActiveOrDisabledLink
            key={courseMemoFileName}
            ariaLabel={`PDF ${memoNameWithCourseOfferings}`}
            className="pdf-link"
            href={`${memoStorageUri}${courseMemoFileName}`}
            linkTitle={memoNameWithCourseOfferings}
          />
        )
      })}
      {Object.keys(uniqueWebMemos).map((memoEndPoint) => {
        return (
          <ActiveOrDisabledLink
            key={memoEndPoint}
            ariaLabel={memoNameWithCourseOfferings}
            href={`${cleanHostUrl}/kurs-pm/${courseCode}/${memoEndPoint}`}
            linkTitle={memoNameWithCourseOfferings}
          />
        )
      })}
    </>
  )
}

export default LinkToCourseMemo
