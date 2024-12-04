import React from 'react'
import { Row, Col } from 'reactstrap'
import { useWebContext } from '../../context/WebContext'
import LinksToCourseMemos from '../LinksToCourseMemos'
import LinkToCourseAnalysis from '../LinkToCourseAnalysis'
import LinkToValidSyllabusPdf from '../LinkToValidSyllabusPdf'
import AlterationTextBox from './AlterationTextBox'
import GridCell from './GridCell'
import ResultsSectionContent from './ResultsSectionContent'
import { RoundAnalysisCanvas, RoundAnalysisAdminWeb } from './types'
import { isCanvasAnalysis } from './utils'
import i18n from '../../../../../i18n'

interface AnalysisListItemProps {
  analysis: RoundAnalysisCanvas | RoundAnalysisAdminWeb
}

const AnalysisListItem: React.FC<AnalysisListItemProps> = ({ analysis }) => {
  const [{ userLang }] = useWebContext()
  const {
    _id,
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

  const RenderDetails = () => (
    <>
      <Row className="mb-4">
        <GridCell
          cellId={`${_id}-responsibles`}
          header={responsiblesHeader.header}
          content={responsibles || <i>{noAdded}</i>}
        />
        <GridCell cellId={`${_id}-examiners`} header={examinersHeader.header} content={examiners || <i>{noAdded}</i>} />
        <GridCell
          cellId={`${_id}-registeredStudents`}
          header={registeredStudentsHeader.header}
          content={registeredStudents || <i>{noAdded}</i>}
          popoverText={registeredStudentsHeader.popoverText}
        />
      </Row>
      <Row className="mb-4">
        <GridCell
          cellId={`${_id}-syllabus`}
          header={syllabusHeader.header}
          content={<LinkToValidSyllabusPdf semester={semester} />}
        />
        <GridCell
          cellId={`${_id}-courseMemo`}
          header={courseMemoHeader.header}
          content={<LinksToCourseMemos semester={semester} applicationCodes={applicationCodes} />}
        />
        <GridCell
          cellId={`${_id}-programmeCodes`}
          header={programmeCodesHeader.header}
          content={programmeCodes || <i>{noAdded}</i>}
        />
      </Row>
    </>
  )

  const RenderNonCanvasDetails = () => {
    if (isCanvasAnalysis(analysis)) return null

    return (
      <>
        <Row className="mb-4">
          <GridCell
            cellId={`${_id}-courseAnalysis`}
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
            cellId={`${_id}-alterationText`}
            header={alterationTextHeader.adminWeb.header}
            content={alterationText || alterationTextHeader.adminWeb.noChanges}
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
    )
  }

  return (
    <div className="analysis-list-item">
      <h3 className="analysis-name">{analysisName}</h3>
      <AlterationTextBox
        header={alterationTextHeader.header}
        htmlContent={isCanvasAnalysis(analysis) ? alterationText : alterationTextHeader.noChanges}
      />
      <Row>
        <Col md="9">
          <RenderDetails />
          <RenderNonCanvasDetails />
        </Col>
        <Col md="3">
          <GridCell
            cellId={`${_id}-result`}
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

export default AnalysisListItem
