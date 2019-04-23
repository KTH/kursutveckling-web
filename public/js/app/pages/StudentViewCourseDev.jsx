import React, { Component } from 'react'
import { inject, observer} from 'mobx-react'
import { Collapse, Button, Alert, Card, CardText, CardBody,
  CardTitle, CardFooter, Table} from 'reactstrap'
import i18n from '../../../../i18n'

import CourseTitle from '../components/CourseTitle.jsx'

const GrayTextBlock = ({header, text}) => {
  return (
    <span>
      <h4>{header}</h4>
      <Table responsive>
        <tbody>
          <tr>
            <td colSpan="6" dangerouslySetInnerHTML={{__html: text}}>                    
            </td>
          </tr>
        </tbody>
      </Table>  
    </span>
  )
}

class ProgramCollapse extends Component {
  constructor(props) {
    super(props)
    this.toggleHeader = this.toggleHeader.bind(this)
    this.state = {collapseProgram: false}
  }
  toggleHeader() {
    this.setState(state => ({collapseProgram: !state.collapseProgram}))
  }
  render () {
    const label = this.props.label
    return (
        <div className='card collapsible programs-list white' >
          <span className='card-header' role='tab'  tabIndex='0' onClick={this.toggleHeader}>
              <a className='collapse-header' id={'programHeading' + label} data-toggle='collapse' href={'#collapsePrograms' + label} aria-controls={'collapsePrograms' + label}>{this.props.header}</a>
          </span>
          <Collapse isOpen={this.state.collapseProgram} toggler={'#programHeading' + label}>
            <div className='card-body  col'>
              <span className='textBlock' dangerouslySetInnerHTML={{__html: this.props.text}}></span> 
            </div>
          </Collapse>
        </div>
    )
  }
}
class TableForCourse extends Component {
  constructor(props) {
    super(props)
    this.toggleRound = this.toggleRound.bind(this)
    // this.toggle = this.toggle.bind(this)
    this.state = {collapse: true}
  }

  toggleRound() {
    this.setState(state => ({collapse: !state.collapse}))
  }

  render () {    
    return(
      <div className='card collapsible blue'>
        <span className='table-title card-header'  role="tab" tabIndex='0' onClick={this.toggleRound}>
            <a id={this.props.togglerId}  aria-expanded={this.state.collapse}>Kursomgång: {this.props.courseRound}</a> 
        </span>
        {/*  */}
        <Collapse isOpen={this.state.collapse} toggler={'#'+this.props.togglerId}>
          <ProgramCollapse header="Obligatorisk inom program" text="CDATE2, DCADF1 FSDF3" label={this.props.togglerId}/>
          <span className="right-links" >
            <a href='#' >KursPM: 2019-05-20</a> <a href='#' >Kursanalys: 2019-05-25</a>
          </span>
          <Table responsive>
            <thead>
                <tr>
                    <th>Kursansvarig, Examinator</th>
                    <th>Antal reg. studenter</th>
                    <th>Form av examination och när den utförs</th>
                    <th>Kommentar till examination</th>
                    <th alt='; i % av aktiva (totalt) vid första ex-tillfället'>Examinationsgrad</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td> 
                        <p><b>Examinator</b></p>                  
                        <p>Ulf Sellgren</p>
                        <p><b>Kursansvarig</b></p>                  
                        <p>Ellen Bergseth</p>
                    </td>
                    <td>72</td>
                    <td>
                        <p>Assignments (3hp) </p><p> 2016-06-07</p>
                        <p>Project (3HP) </p><p> 2016-06-07</p>
                    </td>
                    <td> 
                        <p>It consists of several ABCD tests</p>
                    </td>
                    <td>
                        <p>84% (ÖVN1)</p>
                        <p>46% (ÖVN2)</p>
                    </td>
                </tr>
            </tbody>
          </Table> 
          <GrayTextBlock header="Förändringar som införs i årets kurs (exempel fr kursanalys)" text="<p>Mer mekanismmodellering och toleranssättning	</p><p>Mer materil och labs	</p><p>Mer mekanismmodellering och toleranssättning	</p><p>Mer materil och labs	</p>"/>
          <GrayTextBlock header="Kommentar till ändringar" text="<p>Laddat upp kursanalys</p>"/>
          <p className="underlined">Senaste ändring: 2019-05-25 20:54</p>
        </Collapse>
      </div>          
    )}
}
@inject(['adminStore']) @observer
class StudentViewCourseDev extends Component {
  constructor (props) {
    super(props)
    this.state = {
      errMsg: ''
    }
  }

  render () {
    const { courseAdminData } = this.props.adminStore
    const lang = courseAdminData.lang === 'en' ? 0 : 1
    const courseCode = courseAdminData.courseTitleData.course_code
    const { pageTitles, courseDevLabels } = i18n.messages[lang]

    return (
      <div key='kursinfo-container' className='kursinfo-main-page col' >
        {/* ---COURSE TITEL--- */}
        <CourseTitle key='title'
          courseTitleData={courseAdminData.courseTitleData}
          pageTitle={this.state.enteredEditMode ? pageTitles.mainPage : pageTitles.mainPage}
          language={courseAdminData.lang}
          />

        {this.state.errMsg ? <Alert color='info'><p>{this.state.errMsg}</p></Alert> : ''}

        {/* ---IF in edit mode or preview mode--- */}
        <div className='tables-list col'>
          <h3>2018</h3>
          <TableForCourse courseRound="HT 2018" togglerId="toggler1"/>
          <TableForCourse courseRound="VT 2018" togglerId="toggler2"/>
        </div>
      </div>
    )
  }
}

export default StudentViewCourseDev
