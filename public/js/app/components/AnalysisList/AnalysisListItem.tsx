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
    responsibles: responsiblesHeaderObj,
    examiners: examinersHeaderObj,
    registeredStudents: registeredStudentsHeaderObj,
    syllabusLink: syllabusHeaderObj,
    memoLink: memoLinkHeaderObj,
    programmeCodes: programmeCodesHeaderObj,
    analysisLink: analysisLinkHeaderObj,
    alterationText: alterationTextHeaderObj,
    result: resultHeaderObj,
    no_added,
    info_manually_edited
  } = i18n.messages[userLang === 'en' ? 0 : 1].analysisHeaders

  const RenderDetails = () => (
    <>
      <Row className="mb-4">
        <GridCell
          id={`${_id}-responsibles`}
          header={responsiblesHeaderObj.header}
          content={responsibles || <i>{no_added}</i>}
        />
        <GridCell id={`${_id}-examiners`} header={examinersHeaderObj.header} content={examiners || <i>{no_added}</i>} />
        <GridCell
          id={`${_id}-registeredStudents`}
          header={registeredStudentsHeaderObj.header}
          content={registeredStudents || <i>{no_added}</i>}
          popoverText={registeredStudentsHeaderObj.popover_text}
        />
      </Row>
      <Row className="mb-4">
        <GridCell
          id={`${_id}-syllabusLink`}
          header={syllabusHeaderObj.header}
          content={<LinkToValidSyllabusPdf semester={semester} />}
        />
        <GridCell
          id={`${_id}-memoLink`}
          header={memoLinkHeaderObj.header}
          content={<LinksToCourseMemos semester={semester} applicationCodes={applicationCodes} />}
        />
        <GridCell
          id={`${_id}-programmeCodes`}
          header={programmeCodesHeaderObj.header}
          content={programmeCodes || <i>{no_added}</i>}
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
            id={`${_id}-analysisLink`}
            header={analysisLinkHeaderObj.header}
            content={
              <LinkToCourseAnalysis
                analysisName={analysisName}
                analysisFileName={analysis.analysisFileName}
                pdfAnalysisDate={analysis.pdfAnalysisDate}
              />
            }
          />
          <GridCell
            id={`${_id}-alterationText`}
            header={alterationTextHeaderObj.adminWeb.header}
            content={alterationText || alterationTextHeaderObj.adminWeb.no_changes}
            md="8"
          />
        </Row>
        {(!analysis.registeredStudentsFromLadok || !analysis.examinationGradeFromLadok) && (
          <div className="inline-flex" lang={userLang}>
            <p className="icon-asterisk-black" />
            <p>{info_manually_edited}</p>
          </div>
        )}
      </>
    )
  }

  return (
    <div className="analysis-list-item">
      <h3 className="analysis-name">{analysisName}</h3>
      <AlterationTextBox
        header={alterationTextHeaderObj.header}
        htmlContent={isCanvasAnalysis(analysis) ? alterationText : alterationTextHeaderObj.no_changes}
      />
      <Row>
        <Col md="9">
          <RenderDetails />
          <RenderNonCanvasDetails />
        </Col>
        <Col md="3">
          <GridCell
            id={`${_id}-result`}
            header={resultHeaderObj.header}
            content={<ResultsSectionContent subHeader={resultHeaderObj.total} analysis={analysis} />}
            popoverText={resultHeaderObj.popover_text}
            md="12"
          />
        </Col>
      </Row>
    </div>
  )
}

export default AnalysisListItem
