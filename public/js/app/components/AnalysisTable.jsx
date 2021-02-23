import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Table from '../components/Table'
import i18n from '../../../../i18n'
import { getDateFormat } from '../util/helpers'

const ActiveOrDisabledLink = ({ fileName, linkTitle, storageUri, roundName, validFrom }) => {
  const no_added = 'no_added'
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

// NOTE: uses state from & is hard coded to archive page.
// So less a 'component' and more a part of a page.
@inject(['archiveStore'])
@observer
class AnalysisTable extends Component {
  render() {
    const { archiveStore } = this.props
    const { userLang, courseCode, analysisData } = archiveStore
    const { storageUri } = this.props.archiveStore.browserConfig
    const translations = i18n.message('archiveTitles', userLang)

    const yearsDescending = Object.keys(analysisData).reverse()
    const analysisPerSemester = yearsDescending.flatMap((year) => analysisData[year])
    const analysisDataRows = analysisPerSemester.map((semesterData) => {
      const { analysisFileName, pdfAnalysisDate, analysisName: courseOffering } = semesterData
      return [
        courseOffering,
        <ActiveOrDisabledLink
          fileName={analysisFileName}
          storageUri={storageUri}
          linkTitle={translations.label_analysis + ' ' + courseCode}
          roundName={courseOffering}
          validFrom={getDateFormat(pdfAnalysisDate, userLang)}
        />
      ]
    })

    return (
      <>
        <h2>{translations.label_analyses}</h2>
        <Table
          headings={[translations.analysis_table_heading1, translations.analysis_table_heading2]}
          rows={analysisDataRows}
          tableClasses={['table', 'archive-table']}
        />
      </>
    )
  }
}

export default AnalysisTable
