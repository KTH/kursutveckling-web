import React, { Component } from 'react'
import { inject, observer} from 'mobx-react'
import i18n from '../../../../i18n'

import CourseTitle from '../components/CourseTitle'
import KipLinkNav from '../components/KipNav'
import CourseDevAllYears from '../components/CourseDevAllYears'

import { KUTV_ADMIN_URL } from '../util/constants'

const IntroText = ({translate, courseCode, lang}) => {
  return (
    <span className="intro-text">
      <p>{translate.info_text}</p>
      <p> {translate.info_admin_text}
        <a href={`${KUTV_ADMIN_URL}${courseCode}?l=${lang}&serv=kutv`}>{translate.link_to_course_dev}</a>
      </p>
    </span>
  )
}

@inject(['adminStore']) @observer
class StudentViewCourseDev extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  render () {
    const { courseKoppsData, analysisData } = this.props.adminStore
    const courseKoppsDataLang = courseKoppsData.lang
    const courseCode = courseKoppsData.course_code
    const { pageTitles, tableHeaders} = i18n.messages[courseKoppsDataLang === 'en' ? 0 : 1]

    return (
      <div key='kursinfo-container' className='kursinfo-main-page col' >
        {/* ---COURSE TITEL--- */}
        <CourseTitle key='title'
          courseKoppsData={courseKoppsData}
          pageTitle={pageTitles.course_dev_title}
          language={courseKoppsDataLang}
          />
        <KipLinkNav key='kip-navigation' courseCode={courseCode} lang={courseKoppsDataLang} translate={pageTitles} />
        <IntroText  key='intro-text' courseCode={courseCode} lang={courseKoppsDataLang} translate={pageTitles}/>
        <CourseDevAllYears key='list-of-course-data-for-several-years' koppsData={courseKoppsData} allYearsAnalysisDataObj={analysisData} translate={tableHeaders}/>
      </div>
    )
  }
}

export default StudentViewCourseDev
