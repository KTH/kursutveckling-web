import React, { Component } from 'react'
import { inject, observer} from 'mobx-react'
import i18n from '../../../../i18n'

import CourseTitle from '../components/CourseTitle'
import KipLinkNav from '../components/KipNav'
import CourseDevAllYears from '../components/CourseDevAllYears'

const IntroText = ({translate}) => {
  return (
    <span className="intro-text">
      <p>{translate.info_text}</p>
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
    const { courseCode, koppsDataLang } = courseKoppsData
    const { pageTitles, tableHeaders} = i18n.messages[koppsDataLang === 'en' ? 0 : 1]

    return (
      <div key='kursinfo-container' className='kursinfo-main-page col' >
        {/* ---COURSE TITEL--- */}
        <CourseTitle key='title'
          courseKoppsData={courseKoppsData}
          pageTitle={pageTitles.course_dev_title}
          />
        <KipLinkNav key='kip-navigation' courseCode={courseCode} lang={koppsDataLang} translate={pageTitles} />
        <IntroText  key='intro-text' translate={pageTitles}/>
        <CourseDevAllYears key='list-of-course-data-for-several-years' koppsData={courseKoppsData} allYearsAnalysisDataObj={analysisData} translate={tableHeaders}/>
      </div>
    )
  }
}

export default StudentViewCourseDev
