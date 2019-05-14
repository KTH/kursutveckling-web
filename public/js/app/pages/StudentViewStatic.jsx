import React, { Component } from 'react'
import { inject, observer} from 'mobx-react'
import { Collapse, Button, Alert, Card, CardText, CardBody,
  CardTitle, CardFooter, Table} from 'reactstrap'
import i18n from '../../../../i18n'

import CourseTitle from '../components/CourseTitle.jsx'

const GrayMiniMeny = () => {
  return (
    <span>
      <Table className="kip-menu">
        <tbody>
          <tr>
            <td colSpan="2"> 
            <h4>Om kursen</h4>
            <p>
              {/*<a href="http://localhost:3003/student/kurser/kurs/SF1626?l=sv">Kursinformation</a>*/}
              <a href="/student/kurser/kurs/SF1626?l=sv">Kursinformation</a>
            </p>
            <p>
              <b>Kursens utveckling och historik</b>
            </p>
            <p>
              <a href="/admin/kurser/kurs/SF1626?l=sv">Administrera --></a>   
            </p>
                              
            </td>
            <td colSpan="2" className="link-to"> 
                {/*<p><a href="http://localhost:3005/admin/kurser/kurs/SF1626?l=sv">Administrera --></a></p>     
 */}
            </td>
          </tr>
        </tbody>
      </Table>  
    </span>
  )
}


const GrayTextBlock = ({header, text}) => {
  return (
      <Table responsive>
        <tbody>
          <tr>
            <td colSpan="6" dangerouslySetInnerHTML={{__html: text}}>                    
            </td>
          </tr>
        </tbody>
      </Table>  
  )
}

class ProgramCollapse extends Component {
  constructor(props) {
    super(props)
    this.toggleHeader = this.toggleHeader.bind(this)
    this.state = {collapseProgram: this.props.isOpen}
  }
  toggleHeader() {
    this.setState(state => ({collapseProgram: !state.collapseProgram}))
  }
  render () {
    const label = this.props.label
    return (
      <div className='card collapsible programs-list white' >
        <span className='card-header program-rubrik' role='tab'  tabIndex='0' onClick={this.toggleHeader}>
            <a className='collapse-header title' id={'programHeading' + label} aria-expanded={this.state.collapseProgram} load='false' data-toggle='collapse' href={'#collapsePrograms' + label} aria-controls={'collapsePrograms' + label}>{this.props.header}</a>
        </span>
        <Collapse color="white" isOpen={this.state.collapseProgram} toggler={'#programHeading' + label}>
          <div className='card-body col summary'>
            {this.props.grayTextBlock ?
              <GrayTextBlock text={this.props.text}/>
            :
              <span className='textBlock' dangerouslySetInnerHTML={{__html: this.props.text}}></span> 
            }
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
      <div className='card collapsible white blue'>
        <span className='table-title card-header'  role="tab" tabIndex='0' onClick={this.toggleRound}>
            <a id={this.props.togglerId}  aria-expanded={this.state.collapse} load='false'>Kursomgång: {this.props.courseRound}</a> 
        </span>
        {/*  */}
        <Collapse isOpen={this.state.collapse} toggler={'#'+this.props.togglerId}>
          <ProgramCollapse isOpen={false} header="Kurstillfällen som ingår" text="HT 2018 CMEDT1, HT 2018 CDEPR1 m.fl., HT 2018 CMATD1 m.fl." label={this.props.togglerId}/>
          <ProgramCollapse isOpen={false} header="Obligatorisk inom program" text="CDATE2, DCADF1, FSDF3" label={this.props.togglerId}/>
          <span className="right-links" >
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
          <ProgramCollapse isOpen={true} grayTextBlock="true" header="Förändringar som införs i årets kurs (exempel fr kursanalys)" text="<p>Mer mekanismmodellering och toleranssättning	</p><p>Mer materil och labs	</p>" label={this.props.togglerId}/>
          <ProgramCollapse isOpen={true} grayTextBlock="true" header="Kommentar till ändringar" text="<p>Laddat upp kursanalys</p>" label={this.props.togglerId}/>
          <p className="underlined">Senaste ändring: 2019-05-25</p>
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
          <GrayMiniMeny />

        {this.state.errMsg ? <Alert color='info'><p>{this.state.errMsg}</p></Alert> : ''}

        <div className='tables-list col'>
          <h3>2019</h3>
          <p>Kursutveckling saknas</p>
          <h3>2018</h3>
          <TableForCourse courseRound="HT 2018 CMEDT1, HT 2018 CDEPR1 m.fl., HT 2018 CMATD1 m.fl." togglerId="toggler1"/>
          <TableForCourse courseRound="VT 2018" togglerId="toggler2"/>
          <h3>2017</h3>
          <TableForCourse courseRound="HT 2017" togglerId="toggler3"/>
          <TableForCourse courseRound="VT 2017" togglerId="toggler4"/>
        </div>
      </div>
    )
  }
}

export default StudentViewCourseDev
