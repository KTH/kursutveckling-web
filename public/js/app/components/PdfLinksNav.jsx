import React, { Component } from 'react'
import { SYLLABUS_URL } from '../util/constants'
import { getDateFormat } from '../util/helpers'
import LinkToValidSyllabusPdf from './LinkToValidSyllabus'
import { inject, observer } from 'mobx-react'

const ActiveOrDisabledLink = ({
  fileName,
  linkTitle,
  storageUri,
  roundName,
  translate,
  validFrom
}) => {
  const { no_added } = translate
  return (
    <p>
      {fileName === '' ? (
        <a
          aria-label={`PDF ${linkTitle} ${roundName}: ${no_added}`}
          className="pdf-link btn-link disabled"
          key={linkTitle}
        >
          {linkTitle}: {no_added}
        </a>
      ) : (
        <a
          aria-label={`PDF ${linkTitle} ${roundName}: ${validFrom}`}
          href={`${storageUri}${fileName}`}
          className="pdf-link"
          key={linkTitle}
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
    const { translate, thisAnalysisObj, lang } = this.props
    const { storageUri } = this.props.adminStore.browserConfig

    const {
      analysisFileName,
      analysisName,
      courseCode,
      pdfAnalysisDate,
      pmFileName, //TODO-MEMO: REMOVE
      pdfPMDate,
      syllabusStartTerm,
      roundIdList,
      semester
    } = thisAnalysisObj
    //     roundIdList: "9"
    // semester: "20202"
    console.log('thisAnalysisObj', thisAnalysisObj)

    // function getMemosLinks() {
    //   const thisSemesterMemos = this.props.adminStore.miniMemosPdfAndWeb[semester] || []
    // }
    // const relatedMemos = getMemosLinks()

    return (
      <span className="right-block-of-links">
        <LinkToValidSyllabusPdf startDate={syllabusStartTerm} lang={lang} key={syllabusStartTerm} />
        <span className="vertical-block-of-links">
          <ActiveOrDisabledLink
            fileName={pmFileName}
            storageUri={storageUri}
            linkTitle={translate.link_pm}
            roundName={analysisName}
            translate={translate}
            validFrom={getDateFormat(pdfPMDate, lang)}
          />
          <ActiveOrDisabledLink
            fileName={pmFileName}
            storageUri={storageUri}
            linkTitle={translate.link_pm}
            roundName={analysisName}
            translate={translate}
            validFrom={getDateFormat(pdfPMDate, lang)}
          />
        </span>

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
