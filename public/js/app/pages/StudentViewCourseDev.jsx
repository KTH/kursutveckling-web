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

  const { courseCode, courseKoppsData, analysisDataCanvas, analysisDataAdminWeb, userLang } = context
  const { pageTitles, tableHeaders, messages } = i18n.messages[userLang === 'en' ? 0 : 1]
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
        <PageTitle
          key="title"
          courseKoppsData={courseKoppsData}
          pageTitle={pageTitles.course_dev_title}
          translate={pageTitles}
        />
        <div className="intro-text">
          <p>
            {pageTitles.info_text[1]}
            {pageTitles.info_text[2]}
            <a href={linkToArchive(courseCode, userLang)}>{archiveTitles.archive}.</a>
          </p>
          <p>{pageTitles.info_text[0]}</p>
          <p>{pageTitles.info_text[3]}</p>
        </div>

        <ListYears
          key="list-of-course-data-for-several-years"
          koppsData={courseKoppsData}
          allYearsAnalysisDataObjCanvas={analysisDataCanvas}
          allYearsAnalysisDataObjAdminWeb={analysisDataAdminWeb}
          tableHeaders={tableHeaders}
          pageTitles={pageTitles}
          userLang={userLang}
        />
      </main>
    </Row>
  )
}

export default StudentViewCourseDev
