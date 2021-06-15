import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import { getDateFormat } from '../util/helpers'
import LinkToValidSyllabusPdf from './LinkToValidSyllabus'

const ActiveOrDisabledLink = ({
  fileName,
  linkTitle,
  storageUri,
  roundName,
  translate,
  validFrom
}) => {
  const { noAddedText } = translate
  return (
    <p>
      {fileName === '' ? (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a
          aria-label={`PDF ${linkTitle} ${roundName}: ${noAddedText}`}
          className="pdf-link btn-link disabled"
          key={linkTitle}
        >
          {`${linkTitle}: ${noAddedText}`}
        </a>
      ) : (
        <a
          aria-label={`PDF ${linkTitle} ${roundName}: ${validFrom}`}
          href={`${storageUri}${fileName}`}
          className="pdf-link"
          key={linkTitle}
          rel="noreferrer"
          target="_blank"
        >
          {`${linkTitle}: ${validFrom}`}
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
    this.state = {}
  }

  render() {
    const { adminStore, translate, thisAnalysisObj, lang } = this.props
    const { storageUri } = adminStore.browserConfig

    const {
      analysisFileName,
      analysisName,
      pdfAnalysisDate,
      pmFileName,
      pdfPMDate,
      syllabusStartTerm
    } = thisAnalysisObj

    return (
      <span className="right-block-of-links">
        <LinkToValidSyllabusPdf startDate={syllabusStartTerm} lang={lang} key={syllabusStartTerm} />
        <ActiveOrDisabledLink
          fileName={pmFileName}
          storageUri={storageUri}
          linkTitle={translate.link_pm}
          roundName={analysisName}
          translate={translate}
          validFrom={getDateFormat(pdfPMDate, lang)}
        />
        <ActiveOrDisabledLink
          fileName={analysisFileName}
          storageUri={storageUri}
          linkTitle={translate.link_analysis}
          roundName={analysisName}
          translate={translate}
          validFrom={getDateFormat(pdfAnalysisDate, lang)}
        />
      </span>
    )
  }
}

export default PdfLinksNav
