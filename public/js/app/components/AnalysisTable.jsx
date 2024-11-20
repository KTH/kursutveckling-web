import React from 'react'
import { useWebContext } from '../context/WebContext'
import Table from '../components/Table'
import { getDateFormat, seasonStr } from '../util/helpers'

const createRowCanvas = (translation, storageUri, userLang, courseCode, analysisData) => {
  const { semester, analysisName } = analysisData
  return [seasonStr(translation.course_short_semester, semester), analysisName, translation.analysis_in_canvas]
}

const createRowAdminWeb = (translation, storageUri, userLang, courseCode, analysisData) => {
  const { semester, analysisFileName, pdfAnalysisDate, analysisName } = analysisData
  return [
    seasonStr(translation.course_short_semester, semester),
    analysisName,
    <ActiveOrDisabledLink
      key={analysisFileName}
      semester={semester}
      fileName={analysisFileName}
      storageUri={storageUri}
      linkTitle={`${translation.label_course_analysis} ${courseCode}`}
      roundName={analysisName}
      validFrom={getDateFormat(pdfAnalysisDate, userLang)}
    />
  ]
}

const ActiveOrDisabledLink = ({ fileName, linkTitle, storageUri, roundName, validFrom }) => {
  const noAddedText = 'no_added'
  const linkClassName = fileName ? 'pdf-link' : 'disabled-link'
  const linkContent = fileName ? `${linkTitle}: ${validFrom}` : `${linkTitle}: ${noAddedText}`

  return (
    <p>
      {fileName ? (
        <a
          aria-label={`PDF ${linkTitle} ${roundName}: ${validFrom}`}
          href={`${storageUri}${fileName}`}
          className={linkClassName}
          target="_blank"
          rel="noreferrer"
        >
          {linkContent}
        </a>
      ) : (
        <span className={linkClassName}>{linkContent}</span>
      )}
    </p>
  )
}

const AnalysisTable = ({ translation }) => {
  const [context] = useWebContext()
  const { userLang, courseCode, analysisDataCanvas, analysisDataAdminWeb } = context
  const { storageUri } = context.browserConfig

  const yearsCanvas = Object.keys(analysisDataCanvas ?? {})
  const yearsAdminWeb = Object.keys(analysisDataAdminWeb ?? {})
  const yearsDescending = Array.from(new Set([...yearsAdminWeb, ...yearsCanvas])).sort((a, b) => b - a)

  const combinedAnalysisDataRows = yearsDescending.flatMap((year) => {
    const canvasRows = (analysisDataCanvas[year] || []).map((analysisData) =>
      createRowCanvas(translation, storageUri, userLang, courseCode, analysisData)
    )

    const kursinfoRows = (analysisDataAdminWeb[year] || []).map((analysisData) =>
      createRowAdminWeb(translation, storageUri, userLang, courseCode, analysisData)
    )

    return [...canvasRows, ...kursinfoRows]
  })

  const tableHeadings = {
    labels: [translation.label_semester, translation.label_course_offering, translation.label_course_analysis],
    classes: ['semester', 'heading', 'heading']
  }

  return (
    <>
      <h2>{translation.label_course_analyses}</h2>
      {combinedAnalysisDataRows.length > 0 ? (
        <Table headings={tableHeadings} rows={combinedAnalysisDataRows} tableClasses={['table', 'archive-table']} />
      ) : (
        <p className="inline-information">{translation.no_analyses}</p>
      )}
    </>
  )
}

export default AnalysisTable
