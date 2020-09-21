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
      <p className="col" lang={userLang}>{translate.info_text}</p>
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
    
    const kursOmLink = `${COURSE_INFO_URL}${courseCode}?l=${userLang}`
    const labelAboutCoursePage = `${pageTitles.about_course} ${courseCode}`

    const navLabel = `${userLang === 'en' ? 'Go to' : 'Gå till'} ${labelAboutCoursePage}`

    return (
      <main
        className="kursinfo-main-page col"
        id="mainContent"
        key="kursinfo-container"
        lang={userLang}
        aria-labelledby="page-course-title"
        aria-describedby="intro-text"
      > 
        <nav className='navigation main' aria-label={navLabel} lang={userLang} style={{marginTop: '20px'}}>
          <a href={kursOmLink} className="link-back mt-15 mb-15">
            {labelAboutCoursePage}
          </a>
        </nav>
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
