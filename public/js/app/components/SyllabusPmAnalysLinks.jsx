import React from 'react'
import { SYLLABUS_URL } from '../util/constants'

const ActiveOrDisavledLink = ({ fileName, storageUri, linkTitle, alt, validFrom }) => {
  return (
    <p>
        {fileName === ''
        ? <a className='pdf-link' key={linkTitle}>
            {linkTitle}: -
        </a>
        : <a href={`${storageUri}${fileName}`} className='pdf-link' key={linkTitle} alt={alt} target='_blank'>
            {linkTitle}: {validFrom}
        </a>}
    </p>
    )
}

const SyllabusPmAnalysLinks = ({translate, courseRoundObj, storageUri, lang}) => {
  const { courseCode, syllabusStartTerm,
    analysisFileName, pdfAnalysisDate,
    pmFileName, pdfPMDate } = courseRoundObj
  console.log('courseRoundObj', courseRoundObj) // TODO: REMOVE
  const syllabusFileName = syllabusStartTerm
        ? `${courseCode}-${syllabusStartTerm}.pdf?lang=${lang}` : ''
  const syllabusPublishedDate = syllabusStartTerm
        ? `${translate.course_short_semester[syllabusStartTerm.toString().substring(4, 5)]} ${syllabusStartTerm.toString().substring(0, 4)}` : ''

  return (
    <span className='right-links' >
      <ActiveOrDisavledLink fileName={syllabusFileName}
        storageUri={SYLLABUS_URL}
        linkTitle={translate.link_syllabus} alt={translate.alt_link_syllabus}
        validFrom={syllabusPublishedDate}
        />
      <ActiveOrDisavledLink fileName={pmFileName}
        storageUri={storageUri}
        linkTitle={translate.link_pm} alt={translate.alt_link_pm}
        validFrom={pdfPMDate}
        />
      <ActiveOrDisavledLink fileName={analysisFileName}
        storageUri={storageUri}
        linkTitle={translate.link_analysis} alt={translate.alt_link_analysis}
        validFrom={pdfAnalysisDate}
        />
    </span>
    )
}

export default SyllabusPmAnalysLinks
