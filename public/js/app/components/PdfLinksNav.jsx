import React, { Component } from 'react'
import { SYLLABUS_URL } from '../util/constants'
import { getDateFormat } from '../util/helpers'
import LinkToValidSyllabusPdf from './LinkToValidSyllabus'
import { inject, observer } from 'mobx-react'

const ActiveOrDisabledLink = ({ fileName, storageUri, linkTitle, translate, validFrom }) => {
  return (
    <p>
      {fileName === '' ? (
        <a className="pdf-link btn-link disabled" key={linkTitle}>
          {linkTitle}: {translate.no_added}
        </a>
      ) : (
        <a
          href={`${storageUri}${fileName}`}
          className="pdf-link"
          key={linkTitle}
          target="_blank"
        >
          {linkTitle}: {validFrom}
        </a>
      )}
    </p>
  )
}

@inject(['adminStore'])
@observer
class PdfLinksNav extends Component {
  constructor(props) {
    super(props)
    this.state = { }
  }

  render() {
    const { translate, thisAnalysisObj, lang } = this.props
    const { storageUri } = this.props.adminStore.browserConfig

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
          translate={translate}
          validFrom={getDateFormat(pdfPMDate, lang)}
        />
        <ActiveOrDisabledLink
          fileName={analysisFileName}
          storageUri={storageUri}
          linkTitle={translate.link_analysis}
          translate={translate}
          validFrom={getDateFormat(pdfAnalysisDate, lang)}
        />
      </span>
    )
  }
} 


export default PdfLinksNav
