import React, { Component } from 'react'
import { inject, observer} from 'mobx-react'
import { Alert } from 'reactstrap'
import i18n from '../../../../i18n'

import CourseTitle from '../components/CourseTitle'
import KipLinkNav from '../components/KipNav'
import CourseDevAllYears from '../components/CourseDevList'

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
    const { analysisData } = this.props.adminStore
    const lang = courseAdminData.lang === 'en' ? 0 : 1
    const courseCode = courseAdminData.courseTitleData.course_code
    const { pageTitles, courseDevLabels, startCards} = i18n.messages[lang]

    return (
      <div key='kursinfo-container' className='kursinfo-main-page col' >
        {/* ---COURSE TITEL--- */}
        <CourseTitle key='title'
          courseTitleData={courseAdminData.courseTitleData}
          pageTitle={this.state.enteredEditMode ? pageTitles.mainPage : pageTitles.mainPage}
          language={courseAdminData.lang}
          />
        <KipLinkNav courseCode={courseCode} lang={courseAdminData.lang} trans={startCards} />

        {this.state.errMsg ? <Alert color='info'><p>{this.state.errMsg}</p></Alert> : ''}
        <CourseDevAllYears allYearsObj={analysisData}/>
{/* 
        <div className='tables-list col'>
          <h3>2019</h3>
          <p>Kursutveckling saknas</p>
          <h3>2018</h3>
          <TableForCourse courseRound="HT 2018 CMEDT1, HT 2018 CDEPR1 m.fl., HT 2018 CMATD1 m.fl." togglerId="toggler1"/>
          <TableForCourse courseRound="VT 2018" togglerId="toggler2"/>
          <h3>2017</h3>
          <TableForCourse courseRound="HT 2017" togglerId="toggler3"/>
          <TableForCourse courseRound="VT 2017" togglerId="toggler4"/>
        </div> */}
      </div>
    )
  }
}

export default StudentViewCourseDev
