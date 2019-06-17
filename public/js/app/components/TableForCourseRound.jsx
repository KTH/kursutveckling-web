import React, { Component } from 'react'
import { Table, Collapse, UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap'
import CollapseExtraInfo from './CollapseExtraInfo'

function getShortAndLongStrForEachExam (examinationRoundsArr) {
  let shortAndLongExamStrArr = []
  if (examinationRoundsArr && examinationRoundsArr.length > 0) {
    shortAndLongExamStrArr = examinationRoundsArr.map(row => {
      let examInfoArr = row.trim().split(';')
      let shortStr = `${examInfoArr[0]} (${examInfoArr[2]}) ${examInfoArr[5]}` || ''
      let longStr = `${examInfoArr[0]} - ${examInfoArr[1]},  ${examInfoArr[2]} ${examInfoArr[3]}, ${examInfoArr[4]}: ${examInfoArr[5]}` || ''
      return [shortStr, longStr]
    })
  }
  return shortAndLongExamStrArr
}

const PopoverItem = ({header, shortAndLongExamStrArr, id}) => {
  return (
    <UncontrolledPopover trigger='click' placement='left-start' target={id}>
      <PopoverHeader>{header}</PopoverHeader>
      <PopoverBody>
        {shortAndLongExamStrArr.map((shortAndLongTextStr, index) => <p className='popOver' key={index}>{shortAndLongTextStr[1]}</p>)}
      </PopoverBody>
    </UncontrolledPopover>
  )
}

class TableForCourseRound extends Component {
  constructor (props) {
    super(props)
    this.toggleRound = this.toggleRound.bind(this)
    this.state = {collapse: true}
  }

  toggleRound () {
    this.setState(state => ({collapse: !state.collapse}))
  }

  render () {
    const courseRoundData = this.props.courseRoundObj
    const translate = this.props.translate
    const popOverId = 'exam' + this.props.courseAnalysDataId // Examination expandera
    const shortAndLongExamStrArr = getShortAndLongStrForEachExam(courseRoundData.examinationRounds)

    return (
      <div className='card collapsible blue table-for-round'>
        <span className='table-title card-header' role='tab' tabIndex='0' onClick={this.toggleRound}>
          <a id={this.props.courseAnalysDataId} aria-expanded={this.state.collapse} load='false'>{translate.header_course_round}: {courseRoundData.analysisName}</a>
        </span>
        {/*  */}
        <Collapse isOpen={this.state.collapse} toggler={'#' + this.props.courseAnalysDataId}>
          <span className='right-links' >
            <a href='#' className='pdf-link'>{translate.link_syllabus}: 2019-05-20</a>
            <a href='#' className='pdf-link'>{translate.link_pm}: 2019-05-20</a>
            <a href='#' className='pdf-link'>{translate.link_analysis}: {courseRoundData.pdfAnalysisDate}</a>
          </span>
          <Table responsive>
            <thead>
              <tr>
                <th>{translate.header_responsibles}</th>
                <th>{translate.header_examiners}</th>
                <th alt='Antal reg studenter'>{translate.header_registrated}</th>
                <th>{translate.header_examination}</th>
                <th alt='; i % av aktiva (totalt) vid första ex-tillfället Examinationsgrad'>{translate.header_examination_grade}</th>
                <th>{translate.header_course_changes_comment}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='teacher-cell'>
                  <p>{courseRoundData.responsibles}</p>
                </td>
                <td className='teacher-cell'>
                  <p>{courseRoundData.examiners}</p>
                </td>
                <td className='students-cell'>{courseRoundData.registeredStudents}</td>
                <td className='exam-cell' id={popOverId}>
                  {shortAndLongExamStrArr.map((shortAndLongTextStr, index) => {
                    return <p key={index}>{shortAndLongTextStr[0]}</p>
                  })}
                  <p><i>{translate.popover_more}</i></p>
                </td>
                <td className='result-cell'>
                  <p>{courseRoundData.examinationGrade} %</p>
                </td>
                <td>
                  <p>{courseRoundData.alterationText}</p>
                </td>
              </tr>
            </tbody>
          </Table>
          {/* <GrayTextBlock header="Förändringar som införs i årets kurs (exempel fr kursanalys)" text="<p>Mer mekanismmodellering och toleranssättning	</p><p>Mer materil och labs	</p><p>Mer mekanismmodellering och toleranssättning	</p><p>Mer materil och labs	</p>"/> */}
          {/* <GrayTextBlock header="Kommentar till ändringar" text="<p>Laddat upp kursanalys</p>"/> */}
          <CollapseExtraInfo header={translate.header_more_info} courseRoundData={courseRoundData}
            label={this.props.courseAnalysDataId} translate={translate}
          />
        </Collapse>
        <PopoverItem header={translate.header_examination} shortAndLongExamStrArr={shortAndLongExamStrArr} id={popOverId} />
      </div>
      ) }
  }

export default TableForCourseRound
