import React from 'react'
import { Col, Row } from 'reactstrap'
import HtmlWrapper from '../HtmlWrapper'
import { RoundAnalysisAdminWeb, RoundAnalysisCanvas } from './types'
import LinkToValidSyllabusPdf from '../LinkToValidSyllabusPdf'
import LinksToCourseMemos from '../LinksToCourseMemos'
import { useWebContext } from '../../context/WebContext'
import i18n from '../../../../../i18n'
import LinkToCourseAnalysis from '../LinkToCourseAnalysis'

const isCanvasAnalysis = (analysis: RoundAnalysisCanvas | RoundAnalysisAdminWeb): analysis is RoundAnalysisCanvas => {
  return (analysis as RoundAnalysisCanvas).analysisType === 'canvas'
}

const AlterationTextBox: React.FC<{ header: string; htmlContent: string }> = ({ header, htmlContent }) => (
  <div className="info-box">
    <h4>{header}</h4>
    <HtmlWrapper id="alteration-text" html={htmlContent} />
  </div>
)

const GridCell: React.FC<{ header: string; content: React.ReactNode; popoverText?: string; md?: string }> = ({
  header,
  content,
  popoverText,
  md = '4'
}) => (
  <Col md={md} className="grid-cell">
    <span className="cell-header">{header}</span>
    <span className="cell-content">{content}</span>
  </Col>
)

const ResultsSectionContent: React.FC<{
  subHeader: string
  analysis: RoundAnalysisCanvas | RoundAnalysisAdminWeb
}> = ({ subHeader, analysis }): React.ReactNode => {
  if (isCanvasAnalysis(analysis)) {
    const { registeredStudents, totalReportedResults, gradingDistribution } = analysis
    const resultsPercentage = registeredStudents ? Math.round((totalReportedResults / registeredStudents) * 100) : 0
    return (
      <>
        <Col className="grid-cell horizontal mb-4">
          <Col md="3">
            <span className="cell-header">{subHeader}</span>
          </Col>
          <Col md="9">
            <span>{`${totalReportedResults} (${resultsPercentage}%)`}</span>
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
      </>
    )
  } else {
    const { examinationGrade } = analysis
    return (
      <Col className="grid-cell horizontal mb-2">
        <Col md="3">
          <span className="cell-header">{subHeader}</span>
        </Col>
        <Col md="9">
          <span>{examinationGrade}</span>
        </Col>
      </Col>
    )
  }
}

const AnalysisListItem: React.FC<{ analysis: RoundAnalysisCanvas | RoundAnalysisAdminWeb }> = ({ analysis }) => {
  const [{ userLang }] = useWebContext()
  const {
    analysisName,
    alterationText,
    responsibles,
    examiners,
    registeredStudents,
    programmeCodes,
    semester,
    applicationCodes
  } = analysis

  const {
    responsibles: responsiblesHeader,
    examiners: examinersHeader,
    registeredStudents: registeredStudentsHeader,
    syllabus: syllabusHeader,
    courseMemo: courseMemoHeader,
    programmeCodes: programmeCodesHeader,
    courseAnalysis: courseAnalysisHeader,
    alterationText: alterationTextHeader,
    result: resultHeader,
    noAdded,
    infoManuallyEdited
  } = i18n.messages[userLang === 'en' ? 0 : 1].tableHeaders

  return (
    <div className="round-analysis">
      <h4 className="analysis-name">{analysisName}</h4>
      <AlterationTextBox
        header={alterationTextHeader.header}
        htmlContent={isCanvasAnalysis(analysis) ? alterationText : alterationTextHeader.noChanges}
      />
      <Row>
        <Col md="9">
          <Row className="mb-4">
            <GridCell header={responsiblesHeader.header} content={responsibles || <i>{noAdded}</i>} />
            <GridCell header={examinersHeader.header} content={examiners || <i>{noAdded}</i>} />
            <GridCell
              header={registeredStudentsHeader.header}
              content={registeredStudents || <i>{noAdded}</i>}
              popoverText={registeredStudentsHeader.popoverText}
            />
          </Row>
          <Row className="mb-4">
            <GridCell header={syllabusHeader.header} content={<LinkToValidSyllabusPdf semester={semester} />} />
            <GridCell
              header={courseMemoHeader.header}
              content={<LinksToCourseMemos semester={semester} applicationCodes={applicationCodes} />}
            />
            <GridCell header={programmeCodesHeader.header} content={programmeCodes || <i>{noAdded}</i>} />
          </Row>
          {!isCanvasAnalysis(analysis) && (
            <>
              <Row className="mb-4">
                <GridCell
                  header={courseAnalysisHeader.header}
                  content={
                    <LinkToCourseAnalysis
                      analysisName={analysisName}
                      analysisFileName={analysis.analysisFileName}
                      pdfAnalysisDate={analysis.pdfAnalysisDate}
                    />
                  }
                />
                <GridCell
                  header={alterationTextHeader.adminWeb.header}
                  content={alterationText || <i>{noAdded}</i>}
                  md="8"
                />
              </Row>
              {(!analysis.registeredStudentsFromLadok || !analysis.examinationGradeFromLadok) && (
                <div className="inline-flex" lang={userLang}>
                  <p className="icon-asterisk-black" />
                  <p>{infoManuallyEdited}</p>
                </div>
              )}
            </>
          )}
        </Col>
        <Col md="3">
          <GridCell
            header={resultHeader.header}
            content={<ResultsSectionContent subHeader={resultHeader.total} analysis={analysis} />}
            popoverText={resultHeader.popoverText}
            md="12"
          />
        </Col>
      </Row>
    </div>
  )
}

const AnalysisList: React.FC<{ analyses: RoundAnalysisCanvas[] | RoundAnalysisAdminWeb[] }> = ({ analyses }) => {
  return analyses?.map((analysis) => {
    const { id } = analysis
    return <AnalysisListItem key={id} analysis={analysis} />
  })
}

export default AnalysisList
