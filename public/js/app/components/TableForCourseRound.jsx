import React, { Component } from 'react'
import { Table, Collapse } from 'reactstrap'

import CollapseExtraInfo from './CollapseExtraInfo'
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
                <th>{translate.header_examination}</th>
                <th alt='Antal reg studenter'>{translate.header_registrated}</th>
                <th>{translate.header_examination}</th>
                <th alt='; i % av aktiva (totalt) vid första ex-tillfället Examinationsgrad'>{translate.header_examination_grade}</th>
                <th>{translate.header_course_changes_comment}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <p>{courseRoundData.responsibles}</p>
                </td>
                <td>
                  <p>{courseRoundData.examiners}</p>
                </td>
                <td>{courseRoundData.registeredStudents}</td>
                <td>
                  <p>{courseRoundData.examinationRounds}</p>
                </td>
                <td>
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
      </div>
      ) }
  }

export default TableForCourseRound
