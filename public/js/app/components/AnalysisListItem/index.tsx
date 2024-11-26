import React from 'react'
import { Col, Row } from 'reactstrap'
import HtmlWrapper from '../HtmlWrapper'
import { RoundAnalysisCanvas, KoppsCourseData } from './types'
import LinkToValidSyllabusPdf from '../LinkToValidSyllabusPdf'

const AlterationTextBox: React.FC<{ htmlContent: string }> = ({ htmlContent }) => (
  <div className="info-box">
    <h4>Förändringar som införs till nästa kursomgång</h4>
    <HtmlWrapper id="alteration-text" html={htmlContent} />
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

const AnalysisListItem: React.FC<{ analysis: RoundAnalysisCanvas ; koppsData: KoppsCourseData }> = ({ analysis, koppsData }) => {
  const {
    analysisName,
    alterationText,
    responsibles,
    examiners,
    registeredStudents,
    programmeCodes,
    totalReportedResults,
    gradingDistribution,
    semester,
    analysisType
  } = analysis

  const resultsPercentage = registeredStudents ? Math.round((totalReportedResults / registeredStudents) * 100) : 0

  const isCanvasType = analysisType === 'canvas';

  return (
    <div className="round-analysis">
      <h3>{analysisName}</h3>
      <AlterationTextBox htmlContent={isCanvasType ? alterationText : 'Inga planerade förändringar.'} />
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
              content={<LinkToValidSyllabusPdf semester={semester}/>}
            />
            <GridCell header="Kurs-PM" content="-" />
            <GridCell header="Obligatorisk inom program" content={programmeCodes} />
          </Row>
          {!isCanvasType && (
            <Row className="mb-4">
              <GridCell header="Kursanalys" content="-" />
              <GridCell header="Förändringar som införts till den här kursomgången" content={alterationText} md="8" />
            </Row>
          )}
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
