import React from 'react'
import { Col, Row } from 'reactstrap'
import HtmlWrapper from '../HtmlWrapper'
import LinkToValidSyllabusPdf from '../LinkToValidSyllabus'
import { Analysis, KoppsCourseData, SyllabusPeriods } from './types'

const getSyllabusPeriodStart = (periods: SyllabusPeriods, semester: string): string | null => {
  const semesterAsNumber = Number(semester)

  for (const [key, value] of Object.entries(periods)) {
    const keyAsNumber = parseInt(key, 10)
    const endDate = value.endDate ? Number(value.endDate) : Infinity

    if (semesterAsNumber >= keyAsNumber && semesterAsNumber <= endDate) {
      return key
    }
  }

  return null
}

const AlterationTextBox: React.FC<{ alterationText: string }> = ({ alterationText }) => (
  <div className="info-box">
    <h4>Förändringar som införs till nästa kursomgång</h4>
    <HtmlWrapper id="alteration-text" html={alterationText} />
  </div>
)

const GridCell: React.FC<{ header: string; content: React.ReactNode; md?: string }> = ({
  header,
  content,
  md = '4'
}) => (
  <Col md={md} className="grid-cell">
    <span className="cell-header">{header}</span>
    <span>{content}</span>
  </Col>
)

const ResultsSection: React.FC<{
  totalResults: number
  percentage: number
  grades: Record<string, number>
}> = ({ totalResults, percentage, grades }) => (
  <Col className="grid-cell result">
    <span className="cell-header">Resultat på kurs</span>
    <Col className="grid-cell horizontal mb-2">
      <Col md="3">
        <span className="cell-header">Totalt</span>
      </Col>
      <Col md="9">
        <span>{`${totalResults} (${percentage}%)`}</span>
      </Col>
    </Col>
    <Col>
      {Object.entries(grades).map(([grade, count]) => (
        <Col className="grid-cell horizontal" key={grade}>
          <Col md="3">
            <span className="cell-header">{grade}</span>
          </Col>
          <Col md="9">
            <span>{count}</span>
          </Col>
        </Col>
      ))}
    </Col>
  </Col>
)

const AnalysisListItem: React.FC<{ analysis: Analysis; koppsData: KoppsCourseData }> = ({ analysis, koppsData }) => {
  const {
    analysisName,
    alterationText,
    responsibles,
    examiners,
    registeredStudents,
    programmeCodes,
    totalReportedResults,
    gradingDistribution,
    semester
  } = analysis

  const { koppsDataLang, syllabusPeriods } = koppsData

  const syllabusPeriodStart = getSyllabusPeriodStart(syllabusPeriods, semester)
  const resultsPercentage = registeredStudents ? Math.round((totalReportedResults / registeredStudents) * 100) : 0

  return (
    <div className="round-analysis">
      <h3>{analysisName}</h3>
      <AlterationTextBox alterationText={alterationText} />
      <Row>
        <Col md="9">
          <Row className="mb-4">
            <GridCell header="Kursansvarig" content={responsibles} />
            <GridCell header="Examinator" content={examiners} />
            <GridCell header="Studenter" content={registeredStudents} />
          </Row>
          <Row className="mb-4">
            <GridCell
              header="Kursplan"
              content={<LinkToValidSyllabusPdf startDate={syllabusPeriodStart} lang={koppsDataLang} />}
            />
            <GridCell header="Kurs-PM" content="-" />
            <GridCell header="Obligatorisk inom program" content={programmeCodes} />
          </Row>
          {/* <Row className="mb-4">
            <GridCell header="Kursanalys" content="-"/>
            <GridCell header="Förändringar som införts till den här kursomgången" content={alterationText} md="8"/>
          </Row> */}
        </Col>
        <Col md="3">
          <ResultsSection
            totalResults={totalReportedResults}
            percentage={resultsPercentage}
            grades={gradingDistribution}
          />
        </Col>
      </Row>
    </div>
  )
}

export default AnalysisListItem
