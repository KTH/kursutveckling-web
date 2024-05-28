import React from 'react'

import { useWebContext } from '../context/WebContext'
import Table from '../components/Table'
import { getDateFormat, seasonStr } from '../util/helpers'

const ActiveOrDisabledLink = ({ fileName, linkTitle, storageUri, roundName, validFrom }) => {
  const no_added = 'no_added'
  return (
    <p>
      {fileName === '' ? (
        <span className={`${className} disabled-link`}>
          {linkTitle}: {no_added}
        </span>
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
const AnalysisTable = ({ translation }) => {
  const [context] = useWebContext()
  const { userLang, courseCode, analysisData } = context
  const { storageUri } = context.browserConfig

  const yearsDescending = Object.keys(analysisData).reverse()
  const analysisPerSemester = yearsDescending.flatMap((year) => analysisData[year])
  const analysisDataRows = analysisPerSemester.map((semesterData) => {
    const { semester, analysisFileName, pdfAnalysisDate, analysisName: courseOffering } = semesterData
    return [
      seasonStr(translation.course_short_semester, semester),
      courseOffering,
      <ActiveOrDisabledLink
        key={analysisFileName}
        semester={semester}
        fileName={analysisFileName}
        storageUri={storageUri}
        linkTitle={translation.label_analysis + ' ' + courseCode}
        roundName={courseOffering}
        validFrom={getDateFormat(pdfAnalysisDate, userLang)}
      />
    ]
  })

  return (
    <>
      <h2>{translation.label_analyses}</h2>
      {analysisDataRows.length ? (
        <Table
          headings={[
            translation.label_semesters,
            translation.analysis_table_heading1,
            translation.analysis_table_heading2
          ]}
          rows={analysisDataRows}
          tableClasses={['table', 'archive-table']}
        />
      ) : (
        <p className="inline-information">{translation.no_analyses}</p>
      )}
    </>
  )
}

export default AnalysisTable
