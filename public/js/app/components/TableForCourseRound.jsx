import React, { Component } from 'react'
import { Table, Collapse, UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap'

import CollapseExtraInfo from './CollapseExtraInfo'

const PopoverItem = ({header, textArr, id}) => {
  return (
    <UncontrolledPopover trigger='click' placement='left' target={id}>
      <PopoverHeader>{header}</PopoverHeader>
      <PopoverBody>
        {textArr.map((textStr) => {
          if (textStr.charAt(0) === ',') {
            return <p className='popOver'>{textStr.substr(1)}</p>
          }
          return <p className='popOver'>{textStr}</p>
        })}
      </PopoverBody>
    </UncontrolledPopover>
  )
}

// function getExamKort (examLong) {
//   console.log('examLong', examLong)
//   let toFetchTitle = examLong.split('-')
//   const HELLO = toFetchTitle.map(el => el.split(','))
//   console.log('toFetchTitletoFetchTitle', HELLO)
// }
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
    const popOverId = 'exam' + this.props.togglerId // Examination expandera
    // const kortExam = getExamKort(courseRoundData.examinationRounds)
    console.log('examLong', courseRoundData.examinationRounds)
    let separatedExams = courseRoundData.examinationRounds.split('\n ').map(row => row.trim())
    console.log('111111111 separatedExams', separatedExams)
    // const HELLO = separatedExams.map(row => row.trim().split(',').map(el => el.trim().split(',').map(el => el.trim().split(',')))
    const examAndScale = separatedExams.map(row => row.split('hp, Betygskala:').map(el => el.trim().split('-').map(el => el.trim().split(','))))
    examAndScale.map(exam => console.log('exam', exam))
    console.log('22222222222', examAndScale)
    const shortExamsString = examAndScale.map(exam =>
      `${exam[0][0].join('')} (${exam[0][1][1]},${exam[0][1][2]}) ${exam[1][0]}`)

    console.log('333333333', shortExamsString)

    return (
      <div className='card collapsible blue'>
        <span className='table-title card-header' role='tab' tabIndex='0' onClick={this.toggleRound}>
          <a id={this.props.togglerId} aria-expanded={this.state.collapse} load='false'>{translate.header_course_round}: {courseRoundData.analysisName}</a>
        </span>
        {/*  */}
        <Collapse isOpen={this.state.collapse} toggler={'#' + this.props.togglerId}>
          <span className='right-links' >
            <a href='#' className='pdf-link'>{translate.link_syllabus}: 2019-05-20</a>
            <a href='#' className='pdf-link'>{translate.link_pm}: 2019-05-20</a>
            <a href='#' className='pdf-link'>{translate.link_analysis}:
              {courseRoundData.pdfAnalysisDate}
            </a>
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
                  {shortExamsString.map((examStr) => {
                    return <p>{examStr}</p>
                  })}
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
            label={this.props.togglerId} translate={translate}
          />
        </Collapse>
        <PopoverItem header={translate.header_examination} textArr={separatedExams} id={popOverId} />
      </div>
      ) }
  }

export default TableForCourseRound
