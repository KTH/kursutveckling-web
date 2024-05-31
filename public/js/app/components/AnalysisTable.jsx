import React from 'react'

import { useWebContext } from '../context/WebContext'
import Table from '../components/Table'
import { getDateFormat, seasonStr } from '../util/helpers'

const createRow = (translation, storageUri, userLang, courseCode, semesterData) => {
  const { semester, analysisFileName, pdfAnalysisDate, analysisName: courseOffering } = semesterData
  return [
    seasonStr(translation.course_short_semester, semester),
    courseOffering,
    <ActiveOrDisabledLink
      key={analysisFileName}
      semester={semester}
      fileName={analysisFileName}
      storageUri={storageUri}
      linkTitle={translation.label_course_analysis + ' ' + courseCode}
      roundName={courseOffering}
      validFrom={getDateFormat(pdfAnalysisDate, userLang)}
    />
  ]
}

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

  const analysisDataRows = analysisPerSemester.map((semesterData) =>
    createRow(translation, storageUri, userLang, courseCode, semesterData)
  )

  return (
    <>
      <h2>{translation.label_course_analyses}</h2>
      {analysisDataRows.length ? (
        <Table
          headings={[translation.label_semester, translation.label_course_offering, translation.label_course_analysis]}
          rows={analysisDataRows}
          tableClasses={['table', 'archive-table']}
          columnClass="semester-column"
        />
      ) : (
        <p className="inline-information">{translation.no_analyses}</p>
      )}
    </>
  )
}

export default AnalysisTable
