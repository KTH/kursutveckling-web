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
    const { courseKoppsData } = this.props.adminStore
    const { analysisData } = this.props.adminStore
    const lang = courseKoppsData.lang === 'en' ? 0 : 1
    const courseCode = courseKoppsData.courseTitleData.course_code
    const { pageTitles, tableHeaders} = i18n.messages[lang]

    return (
      <div key='kursinfo-container' className='kursinfo-main-page col' >
        {/* ---COURSE TITEL--- */}
        <CourseTitle key='title'
          courseTitleData={courseKoppsData.courseTitleData}
          pageTitle={this.state.enteredEditMode ? pageTitles.course_dev_title : pageTitles.course_dev_title}
          language={courseKoppsData.lang}
          />
        <KipLinkNav courseCode={courseCode} lang={courseKoppsData.lang} translate={pageTitles} />

        <span >
          <p className="intro-text">{pageTitles.info_text}</p>
          <p className="intro-text"> {pageTitles.info_admin_text}
            <a href={`/admin/kursutveckling/${courseCode}?l=${lang}`}>{pageTitles.link_to_course_dev}</a>
          </p>
        </span>

        {this.state.errMsg ? <Alert color='info'><p>{this.state.errMsg}</p></Alert> : ''}
        <CourseDevAllYears allYearsObj={analysisData} translate={tableHeaders}/>
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
