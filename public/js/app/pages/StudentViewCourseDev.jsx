import React, { Component } from 'react'
import { inject, observer} from 'mobx-react'
import { Alert } from 'reactstrap'
import i18n from '../../../../i18n'

import CourseTitle from '../components/CourseTitle'
import KipLinkNav from '../components/KipNav'
import CourseDevAllYears from '../components/CourseDevList'

import { KUTV_ADMIN_URL } from '../util/constants'

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
    const courseCode = courseKoppsData.course_code
    const { pageTitles, tableHeaders} = i18n.messages[lang]

    return (
      <div key='kursinfo-container' className='kursinfo-main-page col' >
        {/* ---COURSE TITEL--- */}
        <CourseTitle key='title'
          courseKoppsData={courseKoppsData}
          pageTitle={this.state.enteredEditMode ? pageTitles.course_dev_title : pageTitles.course_dev_title}
          language={courseKoppsData.lang}
          />
        <KipLinkNav courseCode={courseCode} lang={courseKoppsData.lang} translate={pageTitles} />

        <span className="intro-text">
          <p>{pageTitles.info_text}</p>
          <p> {pageTitles.info_admin_text}
            <a href={`${KUTV_ADMIN_URL}${courseCode}?l=${courseKoppsData.lang}&serv=kutv`}>{pageTitles.link_to_course_dev}</a>
          </p>
        </span>

        {this.state.errMsg ? <Alert color='info'><p>{this.state.errMsg}</p></Alert> : ''}
        <CourseDevAllYears courseCode={courseCode} koppsData={courseKoppsData} allYearsObj={analysisData} translate={tableHeaders}/>
      </div>
    )
  }
}

export default StudentViewCourseDev
