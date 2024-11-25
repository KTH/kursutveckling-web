import React from 'react'
import { Col, Row } from 'reactstrap'
import HtmlWrapper from './HtmlWrapper'
import LinkToValidSyllabusPdf from './LinkToValidSyllabus'

interface AlterationTextProps {
  alterationText: string
}

const AlterationTextBox: React.FC<AlterationTextProps> = ({ alterationText }) => {
  return (
    <div className="info-box">
      <h4>Förändringar som införs till nästa kursomgång</h4>
      <HtmlWrapper id="alteration-text" html={alterationText} />
    </div>
  )
}

const GridCell: React.FC<{ header: string; content: React.ReactNode }> = ({ header, content }) => {
  return (
    <Col className="grid-cell mb-32">
      <span className="cell-header">{header}</span>
      <span>{content}</span>
    </Col>
  )
}

const FlexColumn: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Col md="3" className="grid-cell">
      {children}
    </Col>
  )
}

const ResultsSection: React.FC<{
  totalResults: number
  percentage: number
  grades: Record<string, number>
}> = ({ totalResults, percentage, grades }) => {
  return (
    <Col className="grid-cell result">
      <span className="cell-header">Resultat på kurs</span>
      <Col className="grid-cell horizontal mb-8">
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
}

export interface AnalysisProps {
  analysisName: string
  alterationText: string
  responsibles: string
  examiners: string
  registeredStudents: number
  programmeCodes: string
  totalReportedResults: number
  gradingDistribution: Record<string, number>,
  syllabusPeriodStart: string,
  userLang: string
}

const Analysis: React.FC<AnalysisProps> = ({
  analysisName,
  alterationText,
  responsibles,
  examiners,
  registeredStudents,
  programmeCodes,
  totalReportedResults,
  gradingDistribution,
  syllabusPeriodStart,
  userLang
}) => {
  const percentage = Math.round((100 * totalReportedResults) / registeredStudents)

  return (
    <div className="round-analysis">
      <h3>{analysisName}</h3>
      <AlterationTextBox alterationText={alterationText} />
      <Row>
        <FlexColumn>
          <GridCell header="Kursansvarig" content={responsibles} />
          <GridCell header="Kursplan" content={<LinkToValidSyllabusPdf startDate={syllabusPeriodStart} lang={userLang} />} />
        </FlexColumn>
        <FlexColumn>
          <GridCell header="Examinator" content={examiners} />
          <GridCell header="Kurs-PM" content={'-'} />
        </FlexColumn>
        <FlexColumn>
          <GridCell header="Studenter" content={registeredStudents} />
          <GridCell header="Obligatorisk inom program" content={programmeCodes} />
        </FlexColumn>
        <FlexColumn>
          <ResultsSection totalResults={totalReportedResults} percentage={percentage} grades={gradingDistribution} />
        </FlexColumn>
      </Row>
    </div>
  )
}

export default Analysis
