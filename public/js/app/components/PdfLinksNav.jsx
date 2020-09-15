import React from 'react'
import { SYLLABUS_URL } from '../util/constants'
import { getDateFormat } from '../util/helpers'
import LinkToValidSyllabusPdf from './LinkToValidSyllabus'

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

const PdfLinksNav = ({ translate, thisAnalysisObj, storageUri, lang }) => {
  const {
    courseCode,
    syllabusStartTerm,
    analysisFileName,
    pdfAnalysisDate,
    pmFileName,
    pdfPMDate
  } = thisAnalysisObj

  return (
    <span className="right-links">
      <LinkToValidSyllabusPdf startDate={syllabusStartTerm} lang={lang} key={syllabusStartTerm} />
      <ActiveOrDisabledLink
        fileName={pmFileName}
        storageUri={storageUri}
        linkTitle={translate.link_pm}
        ariaLabel={translate.aria_label_link_pm}
        validFrom={getDateFormat(pdfPMDate, lang)}
      />
      <ActiveOrDisabledLink
        fileName={analysisFileName}
        storageUri={storageUri}
        linkTitle={translate.link_analysis}
        ariaLabel={translate.aria_label_link_analysis}
        validFrom={getDateFormat(pdfAnalysisDate, lang)}
      />
    </span>
  )
}

export default PdfLinksNav
