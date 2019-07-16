import React from 'react'
import { SYLLABUS_URL } from '../util/constants'

const ActiveOrDisavledLink = ({href, linkTitle, validFrom}) => {
  return (
    <p>
        {href === '#'
        ? <a className='pdf-link' key={linkTitle}>
            {linkTitle}: -
        </a>
        : <a href={href} className='pdf-link' key={linkTitle} target='_blank'>
            {linkTitle}: {validFrom}
        </a>}
    </p>
    )
}

const SyllabusPmAnalysLinks = ({translate, courseRoundObj, storageUri, koppsData}) => {
  const { pdfAnalysisDate, syllabusStartTerm, analysisFileName } = courseRoundObj
  const analysisLink = analysisFileName !== '' ? storageUri + analysisFileName : '#'
  const syllabusHref = syllabusStartTerm ? `${SYLLABUS_URL}${koppsData.course_code}-${syllabusStartTerm}` : '#'
  const syllabusPublishedDate = syllabusStartTerm ? `${translate.course_short_semester[syllabusStartTerm.toString().substring(4, 5)]} ${syllabusStartTerm.toString().substring(0, 4)}` : ''

  return (
    <span className='right-links' >
      <ActiveOrDisavledLink href={syllabusHref} linkTitle={translate.link_syllabus} alt={translate.alt_link_syllabus} validFrom={syllabusPublishedDate} />
      <ActiveOrDisavledLink href='https://kth.box.com/s/i9xu34n5conqdoj7re81bmcto20wavib' linkTitle={translate.link_pm} alt={translate.alt_link_pm} validFrom='2019-05-20' />
      <ActiveOrDisavledLink href={analysisLink} linkTitle={translate.link_analysis} alt={translate.alt_link_analysis} validFrom={pdfAnalysisDate} />
    </span>
    )
}

export default SyllabusPmAnalysLinks
