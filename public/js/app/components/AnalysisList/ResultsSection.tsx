import React from 'react'
import { Col, Row } from 'reactstrap'
import { RoundAnalysisAdminWeb, RoundAnalysisCanvas } from './types'
import { isCanvasAnalysis } from './utils'
import i18n from '../../../../../i18n'
import { useWebContext } from '../../context/WebContext'
import GridCell from './GridCell'

interface ResultsSectionContentProps {
  analysis: RoundAnalysisCanvas | RoundAnalysisAdminWeb
}

const ResultsSection: React.FC<ResultsSectionContentProps> = ({ analysis }) => {
  const { _id } = analysis

  const [{ userLang }] = useWebContext()
  const { result: resultHeaderObj } = i18n.messages[userLang === 'en' ? 0 : 1].analysisHeaders

  const renderGradingDistribution = (analysis: RoundAnalysisCanvas) => {
    const { totalReportedResults, gradingDistribution } = analysis

    const sumNonFailedResults = Object.entries(gradingDistribution)
      .filter(([key]) => key !== 'F' && key !== 'FX')
      .reduce((total, [, value]) => total + value, 0)

    const resultsPercentage = sumNonFailedResults ? Math.round((sumNonFailedResults / totalReportedResults) * 100) : 0

    return (
      <>
        <Row className="mb-3">
          <Col xs="3">
            <b>{resultHeaderObj.subHeader}</b>
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
          <b>{resultHeaderObj.subHeader}</b>
        </Col>
        <Col xs="9">
          <span>{examinationGrade}</span>
        </Col>
      </Row>
    )
  }

  return (
    <GridCell
      id={`${_id}-result`}
      header={resultHeaderObj.header}
      content={
        isCanvasAnalysis(analysis)
          ? renderGradingDistribution(analysis as RoundAnalysisCanvas)
          : renderExaminationGrade(analysis as RoundAnalysisAdminWeb)
      }
      popoverText={resultHeaderObj.popover_text}
      md="12"
    />
  )
}

export default ResultsSection
