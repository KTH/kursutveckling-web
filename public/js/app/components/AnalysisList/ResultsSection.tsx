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
  const { gradingDistribution: gradingDistributionHeaderObj, examinationGrade: examinationGradeHeaderObj } =
    i18n.messages[userLang === 'en' ? 0 : 1].analysisHeaders

  const renderGradingDistribution = (analysis: RoundAnalysisCanvas) => {
    const { totalReportedResults, gradingDistribution } = analysis
    return (
      <GridCell
        id={`${_id}-gradingDistribution`}
        header={gradingDistributionHeaderObj.header}
        content={
          <>
            <Row className="mb-3">
              <Col xs="5">{gradingDistributionHeaderObj.total}</Col>
              <Col xs="7">
                <span>{totalReportedResults}</span>
              </Col>
            </Row>
            {Object.entries(gradingDistribution).map(([grade, count]) => (
              <Row key={grade}>
                <Col xs="2">{grade}</Col>
                <Col xs="8">
                  <span>{count}</span>
                </Col>
              </Row>
            ))}
          </>
        }
        popoverText={gradingDistributionHeaderObj.popover_text}
        md="12"
      />
    )
  }

  const renderExaminationGrade = (analysis: RoundAnalysisAdminWeb) => {
    const { examinationGrade } = analysis
    return (
      <GridCell
        id={`${_id}-examinationGrade`}
        header={examinationGradeHeaderObj.header}
        content={
          <Row className="mb-3">
            <Col>
              <span>{examinationGrade}</span>
            </Col>
          </Row>
        }
        popoverText={examinationGradeHeaderObj.popover_text}
        md="12"
      />
    )
  }

  return isCanvasAnalysis(analysis)
    ? renderGradingDistribution(analysis as RoundAnalysisCanvas)
    : renderExaminationGrade(analysis as RoundAnalysisAdminWeb)
}

export default ResultsSection
