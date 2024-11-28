import React from 'react'
import { Col, Row } from 'reactstrap'
import HtmlWrapper from '../HtmlWrapper'
import { RoundAnalysisCanvas } from './types'
import LinkToValidSyllabusPdf from '../LinkToValidSyllabusPdf'
import LinkToCourseMemo from '../LinkToCourseMemo'
import { useWebContext } from '../../context/WebContext'
import i18n from '../../../../../i18n'

const AlterationTextBox: React.FC<{ header: string; htmlContent: string }> = ({ header, htmlContent }) => (
  <div className="info-box">
    <h4>{header}</h4>
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
  resultsPercentage: number
  gradingDistribution: Record<string, number>
  gradingDistributionHeader: { header: string; total: string }
}> = ({ totalResults, resultsPercentage, gradingDistribution, gradingDistributionHeader }) => (
  <Col className="grid-cell result">
    <span className="cell-header">{gradingDistributionHeader.header}</span>
    <Col className="grid-cell horizontal mb-2">
      <Col md="3">
        <span className="cell-header">{gradingDistributionHeader.total}</span>
      </Col>
      <Col md="9">
        <span>{`${totalResults} (${resultsPercentage}%)`}</span>
      </Col>
    </Col>
    <Col>
      {Object.entries(gradingDistribution).map(([grade, count]) => (
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

const AnalysisListItem: React.FC<{ analysis: RoundAnalysisCanvas }> = ({ analysis }) => {
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
    applicationCodes,
    analysisType
  } = analysis
  const [{ userLang }] = useWebContext()

  const resultsPercentage = registeredStudents ? Math.round((totalReportedResults / registeredStudents) * 100) : 0

  const isCanvasType = analysisType === 'canvas'

  const {
    responsibles: responsiblesHeader,
    examiners: examinersHeader,
    registeredStudents: registeredStudentsHeader,
    syllabus: syllabusHeader,
    courseMemo: courseMemoHeader,
    programmeCodes: programmeCodesHeader,
    courseAnalysis: courseAnalysisHeader,
    alterationText: alterationTextHeader,
    gradingDistribution: gradingDistributionHeader,
    noAdded
  } = i18n.messages[userLang === 'en' ? 0 : 1].tableHeaders

  return (
    <div className="round-analysis">
      <h3>{analysisName}</h3>
      <AlterationTextBox
        header={alterationTextHeader.header}
        htmlContent={isCanvasType ? alterationText : alterationTextHeader.noChanges}
      />
      <Row>
        <Col md="9">
          <Row className="mb-4">
            <GridCell header={responsiblesHeader.header} content={responsibles} />
            <GridCell header={examinersHeader.header} content={examiners} />
            <GridCell header={registeredStudentsHeader.header} content={registeredStudents} />
          </Row>
          <Row className="mb-4">
            <GridCell header={syllabusHeader.header} content={<LinkToValidSyllabusPdf semester={semester} />} />
            <GridCell
              header={courseMemoHeader.header}
              content={<LinkToCourseMemo semester={semester} applicationCodes={applicationCodes} />}
            />
            <GridCell header={programmeCodesHeader.header} content={programmeCodes || <i>{noAdded}</i>} />
          </Row>
          {!isCanvasType && (
            <Row className="mb-4">
              <GridCell header={courseAnalysisHeader.header} content="-" />
              <GridCell header={alterationTextHeader.header} content={alterationText} md="8" />
            </Row>
          )}
        </Col>
        <Col md="3">
          <ResultsSection
            totalResults={totalReportedResults}
            resultsPercentage={resultsPercentage}
            gradingDistribution={gradingDistribution}
            gradingDistributionHeader={gradingDistributionHeader}
          />
        </Col>
      </Row>
    </div>
  )
}

export default AnalysisListItem
