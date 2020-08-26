import React from 'react'
import { SYLLABUS_URL } from '../util/constants'
import { getDateFormat } from '../util/helpers'

const ActiveOrDisabledLink = ({ fileName, storageUri, linkTitle, ariaLabel, validFrom }) => {
  return (
    <p>
      {fileName === '' ? (
        <a className="pdf-link" key={linkTitle}>
          {linkTitle}: -
        </a>
      ) : (
        <a
          href={`${storageUri}${fileName}`}
          className="pdf-link"
          key={linkTitle}
          aria-label={ariaLabel}
          target="_blank"
        >
          {linkTitle}: {validFrom}
        </a>
      )}
    </p>
  )
}

const SyllabusPmAnalysLinks = ({ translate, courseRoundObj, storageUri, lang }) => {
  const {
    courseCode,
    syllabusStartTerm,
    analysisFileName,
    pdfAnalysisDate,
    pmFileName,
    pdfPMDate
  } = courseRoundObj
  const syllabusFileName = syllabusStartTerm
    ? `${courseCode}-${syllabusStartTerm}.pdf?lang=${lang}`
    : ''
  const syllabusPublishedDate = syllabusStartTerm
    ? `${
        translate.course_short_semester[syllabusStartTerm.toString().substring(4, 5)]
      } ${syllabusStartTerm.toString().substring(0, 4)}`
    : ''

  return (
    <span className="right-links">
      <ActiveOrDisabledLink
        fileName={syllabusFileName}
        storageUri={SYLLABUS_URL}
        linkTitle={translate.link_syllabus}
        ariaLabel={translate.alt_link_syllabus}
        validFrom={syllabusPublishedDate}
      />
      <ActiveOrDisabledLink
        fileName={pmFileName}
        storageUri={storageUri}
        linkTitle={translate.link_pm}
        ariaLabel={translate.alt_link_pm}
        validFrom={getDateFormat(pdfPMDate, lang)}
      />
      <ActiveOrDisabledLink
        fileName={analysisFileName}
        storageUri={storageUri}
        linkTitle={translate.link_analysis}
        ariaLabel={translate.alt_link_analysis}
        validFrom={getDateFormat(pdfAnalysisDate, lang)}
      />
    </span>
  )
}

export default SyllabusPmAnalysLinks
