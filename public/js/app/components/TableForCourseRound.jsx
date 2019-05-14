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
          <a id={this.props.togglerId} aria-expanded={this.state.collapse} load='false'>Kursomgång: {courseRoundData.analysisName}</a>
        </span>
        {/*  */}
        <Collapse isOpen={this.state.collapse} toggler={'#' + this.props.togglerId}>
          <span className='right-links' >
            <a href='#' >Kursplan: 2019-05-20</a>
            <a href='#'>Kurs-PM: 2019-05-20</a>
            <a href='#' >Kursanalys: {courseRoundData.pdfAnalysisDate}</a>
          </span>
          <Table responsive>
            <thead>
              <tr>
                <th>Kursansvarig</th>
                <th>Examinator</th>
                <th alt='Antal reg studenter'>Studenter</th>
                <th>Form av examination</th>
                <th alt='; i % av aktiva (totalt) vid första ex-tillfället Examinationsgrad'>Resultat</th>
                <th>Förändringar som införts i kursomgång</th>
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
                  <p>{courseRoundData.examinationGrade}</p>
                </td>
                <td>
                  <p>{courseRoundData.alterationText}</p>
                </td>
              </tr>
            </tbody>
          </Table>
          {/* <GrayTextBlock header="Förändringar som införs i årets kurs (exempel fr kursanalys)" text="<p>Mer mekanismmodellering och toleranssättning	</p><p>Mer materil och labs	</p><p>Mer mekanismmodellering och toleranssättning	</p><p>Mer materil och labs	</p>"/> */}
          {/* <GrayTextBlock header="Kommentar till ändringar" text="<p>Laddat upp kursanalys</p>"/> */}
          <CollapseExtraInfo header='Mer infromation' courseRoundData={courseRoundData}
            label={this.props.togglerId} translate={translate}
          />
        </Collapse>
      </div>
      ) }
  }

export default TableForCourseRound
