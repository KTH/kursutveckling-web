import React from 'react'

import { useWebContext } from '../context/WebContext'
import Table from '../components/Table'
import i18n from '../../../../i18n'
import { getDateFormat } from '../util/helpers'

const ActiveOrDisabledLink = ({ fileName, linkTitle, storageUri, roundName, validFrom }) => {
  const no_added = 'no_added'
  return (
    <p>
      {fileName === '' ? (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
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
          rel="noreferrer"
        >
          {`${linkTitle}: ${validFrom}`}
        </a>
      )}
    </p>
  )
}

// NOTE: uses state from & is hard coded to archive page.
// So less a 'component' and more a part of a page.
const AnalysisTable = () => {
  const [context] = useWebContext()
  const { userLang, courseCode, analysisData } = context
  const { storageUri } = context.browserConfig
  const translations = i18n.message('archiveTitles', userLang)

  const yearsDescending = Object.keys(analysisData).reverse()
  const analysisPerSemester = yearsDescending.flatMap((year) => analysisData[year])
  const analysisDataRows = analysisPerSemester.map((semesterData) => {
    const { analysisFileName, pdfAnalysisDate, analysisName: courseOffering } = semesterData
    return [
      courseOffering,
      <ActiveOrDisabledLink
        key={analysisFileName}
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
      {analysisDataRows.length ? (
        <Table
          headings={[translations.analysis_table_heading1, translations.analysis_table_heading2]}
          rows={analysisDataRows}
          tableClasses={['table', 'archive-table']}
        />
      ) : (
        <p className="inline-information">{translations.no_analyses}</p>
      )}
    </>
  )
}

export default AnalysisTable
