import React from 'react'
import { Col, Row } from 'reactstrap'
import { RoundAnalysisAdminWeb, RoundAnalysisCanvas } from './types'
import { isCanvasAnalysis } from './utils'

interface ResultsSectionContentProps {
  subHeader: string
  analysis: RoundAnalysisCanvas | RoundAnalysisAdminWeb
}

const ResultsSectionContent: React.FC<ResultsSectionContentProps> = ({ subHeader, analysis }) => {
  const renderGradingDistribution = (analysis: RoundAnalysisCanvas) => {
    const { totalReportedResults, gradingDistribution } = analysis

    const sumNonFailedResults = Object.entries(gradingDistribution)
      .filter(([key]) => key !== 'F' && key !== 'FX')
      .reduce((total, [, value]) => total + value, 0)

    const resultsPercentage = sumNonFailedResults ? Math.round((sumNonFailedResults / totalReportedResults) * 100) : 0

    console.log(gradingDistribution)
    return (
      <>
        <Row className="mb-3">
          <Col xs="3">
            <b>{subHeader}</b>
          </Col>
          <Col xs="9">
            <span>{`${sumNonFailedResults} (${resultsPercentage}%)`}</span>
          </Col>
        </Row>
        {Object.entries(gradingDistribution).map(([grade, count]) => (
          <Row key={grade}>
            <Col xs="3">
              <b>{grade}</b>
            </Col>
            <Col xs="9">
              <span>{count}</span>
            </Col>
          </Row>
        ))}
      </>
    )
  }

  const renderExaminationGrade = (analysis: RoundAnalysisAdminWeb) => {
    const { examinationGrade } = analysis

    return (
      <Row className="mb-3">
        <Col xs="3">
          <b>{subHeader}</b>
        </Col>
        <Col xs="9">
          <span>{examinationGrade}</span>
        </Col>
      </Row>
    )
  }

  return isCanvasAnalysis(analysis)
    ? renderGradingDistribution(analysis as RoundAnalysisCanvas)
    : renderExaminationGrade(analysis as RoundAnalysisAdminWeb)
}

export default ResultsSectionContent
