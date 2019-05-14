import React, { Component } from 'react'
import { Table, Collapse } from 'reactstrap'

import CollapseExtraInfo from './CollapseExtraInfo'

class TableForCourseRound extends Component {
  constructor (props) {
    super(props)
    this.toggleRound = this.toggleRound.bind(this)
      // this.toggle = this.toggle.bind(this)
    this.state = {collapse: true}
  }

  toggleRound () {
    this.setState(state => ({collapse: !state.collapse}))
  }

  render () {
    return (
        <div className='card collapsible white blue'>
          <span className='table-title card-header' role='tab' tabIndex='0' onClick={this.toggleRound}>
              <a id={this.props.togglerId} aria-expanded={this.state.collapse} load='false'>Kursomgång: {this.props.courseRound}</a>
          </span>
          {/*  */}
          <Collapse isOpen={this.state.collapse} toggler={'#' + this.props.togglerId}>
            <CollapseExtraInfo isOpen={false} header='Kurstillfällen som ingår' text='HT 2018 CMEDT1, HT 2018 CDEPR1 m.fl., HT 2018 CMATD1 m.fl.' label={this.props.togglerId} />
            <CollapseExtraInfo isOpen={false} header='Obligatorisk inom program' text='CDATE2, DCADF1, FSDF3' label={this.props.togglerId} />
            <span className='right-links' >
              <a href='#' >Kursplan: 2019-05-20</a>
              <a href='#'>Kurs-PM: 2019-05-20</a>
              <a href='#' >Kursanalys: 2019-05-25</a>
            </span>
            <Table responsive>
              <thead>
                  <tr>
                      <th>Kursansvarig, Examinator</th>
                      <th>Antal reg. studenter</th>
                      <th>Form av examination</th>
                      <th>Kommentar till examination</th>
                      <th alt='; i % av aktiva (totalt) vid första ex-tillfället'>Examinationsgrad</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td>
                          <p><b>Examinator</b></p>
                          <p>Elena Rakhimova</p>
                          <p><b>Kursansvarig</b></p>
                          <p>Jeanette Skog</p>
                      </td>
                      <td>72</td>
                      <td>
                          <p>Assignments (3hp) </p>
                          <p>Project (3HP) </p>
                      </td>
                      <td>
                          <p>It consists of several ABCD tests</p>
                      </td>
                      <td>
                          <p>84%</p>

                      </td>
                  </tr>
              </tbody>
            </Table>
            {/* <GrayTextBlock header="Förändringar som införs i årets kurs (exempel fr kursanalys)" text="<p>Mer mekanismmodellering och toleranssättning	</p><p>Mer materil och labs	</p><p>Mer mekanismmodellering och toleranssättning	</p><p>Mer materil och labs	</p>"/> */}
            {/* <GrayTextBlock header="Kommentar till ändringar" text="<p>Laddat upp kursanalys</p>"/> */}
            <CollapseExtraInfo isOpen grayTextBlock='true' header='Förändringar som införs i årets kurs (exempel fr kursanalys)' text='<p>Mer mekanismmodellering och toleranssättning	</p><p>Mer materil och labs	</p>' label={this.props.togglerId} />
            <CollapseExtraInfo isOpen grayTextBlock='true' header='Kommentar till ändringar' text='<p>Laddat upp kursanalys</p>' label={this.props.togglerId} />
            <p className='underlined'>Senaste ändring: 2019-05-25</p>
          </Collapse>
        </div>
      ) }
  }

export default TableForCourseRound
