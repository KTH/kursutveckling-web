import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import i18n from '../../../../i18n'

import PageTitle from '../components/PageTitle'
import KipLinkNav from '../components/KipNav'
import ListYears from '../components/ListYears'
import AlertMsg from '../components/AlertMsg'

const IntroText = ({ translate }) => {
  return (
    <span className="intro-text">
      <p>{translate.info_text}</p>
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
    const { courseCode, koppsDataLang } = courseKoppsData
    const { pageTitles, tableHeaders } = i18n.messages[koppsDataLang === 'en' ? 0 : 1]

    return (
      <main
        id="mainContent"
        key="kursinfo-container"
        className="kursinfo-main-page col"
        aria-labelledby="course-title"
        aria-describedby="intro-text"
      >
        {/* ---COURSE TITEL--- */}
        <PageTitle
          key="title"
          courseKoppsData={courseKoppsData}
          pageTitle={pageTitles.course_dev_title}
        />
        <KipLinkNav
          key="kip-navigation"
          courseCode={courseCode}
          lang={koppsDataLang}
          translate={pageTitles}
        />
        <AlertMsg props={this.props} lang={koppsDataLang} translate={pageTitles} />
        <IntroText id="intro-text" key="intro-text" translate={pageTitles} />
        <ListYears
          key="list-of-course-data-for-several-years"
          koppsData={courseKoppsData}
          allYearsAnalysisDataObj={analysisData}
          tableHeaders={tableHeaders}
          pageTitles={pageTitles}
        />
      </main>
    )
  }
}

export default StudentViewCourseDev
