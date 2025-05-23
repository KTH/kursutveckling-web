import React from 'react'
import { Row } from 'reactstrap'

import i18n from '../../../../i18n'

import ListYears from '../components/ListYears'
import PageTitle from '../components/PageTitle'
import { COURSE_INFO_URL } from '../util/constants'

import { useWebContext } from '../context/WebContext'

function linkToArchive(courseCode, language) {
  const languageParameter = language === 'en' ? '?l=en' : ''
  return `/kursutveckling/${courseCode ? courseCode + '/arkiv' : ''}${languageParameter}`
}

function StudentViewCourseDev() {
  const [context] = useWebContext()

  const { courseCode, courseData, analysisDataCanvas, analysisDataAdminWeb, userLang } = context
  const { pageTitles, messages } = i18n.messages[userLang === 'en' ? 0 : 1]
  const { archiveTitles } = messages
  const linkToAboutCourse = `${COURSE_INFO_URL}${courseCode}?l=${userLang}`
  const labelAboutCoursePage = `${pageTitles.about_course} ${courseCode}`
  const navLabel = `${userLang === 'en' ? 'Go to' : 'Gå till'} ${labelAboutCoursePage}`

  return (
    <Row>
      <main id="mainContent" className="col course-development-page">
        <nav className="navigation main" aria-label={navLabel}>
          <a href={linkToAboutCourse} className="kth-button back">
            {labelAboutCoursePage}
          </a>
        </nav>
        <PageTitle courseData={courseData} pageTitle={pageTitles.course_dev_title} />
        <div className="intro-text">
          <p>
            {pageTitles.info_text[0]}
            {pageTitles.info_text[1]}
            <a href={linkToArchive(courseCode, userLang)}>{archiveTitles.archive}.</a>
          </p>
          <p>{pageTitles.info_text[2]}</p>
        </div>

        <ListYears
          key="list-of-course-data-for-several-years"
          allYearsAnalysisDataObjCanvas={analysisDataCanvas}
          allYearsAnalysisDataObjAdminWeb={analysisDataAdminWeb}
        />
      </main>
    </Row>
  )
}

export default StudentViewCourseDev
