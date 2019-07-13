import React, { Component } from 'react'
import { SYLLABUS_URL } from '../util/constants'

const ActiveOrDisavledLink = ({href, linkTitle, validFrom}) => {
  let isDisabled
  href === '#' ? isDisabled = true : isDisabled = false
  return (
    <p>
        {isDisabled
        ? <a className='pdf-link' key={linkTitle}>
            {linkTitle}: -
        </a>
        : <a href={href} className='pdf-link' key={linkTitle} target='_blank'>
            {linkTitle}: {validFrom}
        </a>}
    </p>
    )
}

const SyllabusPmAnalysLinks = ({translate, courseRoundData, storageUri, koppsData}) => {
  const analysisLink = courseRoundData.analysisFileName !== '' ? storageUri + courseRoundData.analysisFileName : '#'
  const analysisPublishedDate = courseRoundData.pdfAnalysisDate
  const syllabusRawStartTerm = courseRoundData.syllabusStartTerm
  const syllabusHref = syllabusRawStartTerm ? `${SYLLABUS_URL}${koppsData.course_code}-${syllabusRawStartTerm}` : '#'
  const syllabusPublishedDate = syllabusRawStartTerm ? `${translate.course_short_semester[syllabusRawStartTerm.toString().substring(4, 5)]} ${syllabusRawStartTerm.toString().substring(0, 4)}` : ''

  return (
    <span className='right-links' >
      <ActiveOrDisavledLink href={syllabusHref} linkTitle={translate.link_syllabus} validFrom={syllabusPublishedDate} />
      <ActiveOrDisavledLink href='https://kth.box.com/s/i9xu34n5conqdoj7re81bmcto20wavib' linkTitle={translate.link_pm} validFrom='2019-05-20' />
      <ActiveOrDisavledLink href={analysisLink} linkTitle={translate.link_analysis} validFrom={analysisPublishedDate} />
    </span>
    )
}

export default SyllabusPmAnalysLinks
