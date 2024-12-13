import React from 'react'
import { useWebContext } from '../context/WebContext'
import Table from '../components/Table'
import { seasonStr } from '../util/helpers'
import Alert from '../components-shared/Alert'
import { CANVAS_URL } from '../util/constants'
import LinkToCourseAnalysis from '../components/LinkToCourseAnalysis'

const createRowAdminWeb = (translation, { semester, analysisFileName, pdfAnalysisDate, analysisName }) => [
  seasonStr(translation.course_short_semester, semester),
  analysisName,
  <LinkToCourseAnalysis key={analysisFileName} analysisFileName={analysisFileName} pdfAnalysisDate={pdfAnalysisDate} />
]

const AnalysisTable = ({ translation }) => {
  const [context] = useWebContext()
  const { analysisDataAdminWeb } = context

  const yearsDescending = Object.keys(analysisDataAdminWeb ?? {}).sort((a, b) => b - a)

  const sortedAnalysisDataRows = yearsDescending.flatMap((year) =>
    (analysisDataAdminWeb[year] || []).map((analysisData) => createRowAdminWeb(translation, analysisData))
  )

  const tableHeadings = {
    labels: [translation.label_semester, translation.label_course_offering, translation.label_course_analysis],
    classes: ['semester', 'heading', 'heading']
  }

  return (
    <>
      <h2>{translation.label_course_analyses}</h2>
      <Alert type="info" header={translation.canvas_analysis_alert_heading}>
        <p>{translation.canvas_analysis_alert_p1}</p>
        <a href={CANVAS_URL}>{translation.canvas_analysis_alert_link_label}</a>
        <p>{translation.canvas_analysis_alert_p2}</p>
      </Alert>
      {sortedAnalysisDataRows.length > 0 ? (
        <Table headings={tableHeadings} rows={sortedAnalysisDataRows} tableClasses={['table', 'archive-table']} />
      ) : (
        <p className="inline-information">{translation.no_analyses}</p>
      )}
    </>
  )
}

export default AnalysisTable
