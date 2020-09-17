import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import i18n from '../../../../i18n'

import CollapseSyllabusHistory from '../components/CollapseSyllabusHistory'
import PageTitle from '../components/PageTitle'
import ListYears from '../components/ListYears'
import AlertMsg from '../components/AlertMsg'
import { COURSE_INFO_URL } from '../util/constants'

const IntroText = ({ translate, userLang }) => {
  return (
    <span className="intro-text">
      <p lang={userLang}>{translate.info_text}</p>
    </span>
  )
}

@inject(['adminStore'])
@observer
class StudentViewCourseDev extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { courseKoppsData, analysisData } = this.props.adminStore
    const { courseCode, koppsDataLang: userLang, sortedSyllabusStart } = courseKoppsData
    const { pageTitles, tableHeaders } = i18n.messages[userLang === 'en' ? 0 : 1]
    
    return (
      <main
        className="kursinfo-main-page col"
        id="mainContent"
        key="kursinfo-container"
        lang={userLang}
        aria-labelledby="page-course-title"
        aria-describedby="intro-text"
      >
        {/* ---COURSE TITEL--- */}
        <PageTitle
          key="title"
          courseKoppsData={courseKoppsData}
          pageTitle={pageTitles.course_dev_title}
          translate={pageTitles}
        />
        <CollapseSyllabusHistory
          key="links-syllabus-history"
          courseCode={courseCode}
          lang={userLang}
          translate={pageTitles}
          sortedSyllabusStart={sortedSyllabusStart}
        />
        <AlertMsg props={this.props} userLang={userLang} translate={pageTitles} />
        <IntroText id="intro-text" key="intro-text" translate={pageTitles} userLang={userLang}/>
        <ListYears
          key="list-of-course-data-for-several-years"
          koppsData={courseKoppsData}
          allYearsAnalysisDataObj={analysisData}
          tableHeaders={tableHeaders}
          pageTitles={pageTitles}
          userLang={userLang}
        />
      </main>
    )
  }
}

export default StudentViewCourseDev
