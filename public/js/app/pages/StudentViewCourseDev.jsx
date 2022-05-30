import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Breadcrumbs } from '@kth/kth-reactstrap/dist/components/utbildningsinfo'

import i18n from '../../../../i18n'

import PageTitle from '../components/PageTitle'
import ListYears from '../components/ListYears'
import { COURSE_INFO_URL, REGULATED_URL_SV, REGULATED_URL_EN } from '../util/constants'

import { useWebContext } from '../context/WebContext'

const IntroText = ({ translate, phrase, userLang }) => (
  <span className="intro-text">
    <p className="col" lang={userLang}>
      {translate.info_text[phrase]}
    </p>
  </span>
)
function renderBreadcrumbsIntoKthHeader(courseCode, language) {
  const breadcrumbContainer = document.getElementById('breadcrumbs-header')
  if (breadcrumbContainer)
    ReactDOM.render(
      <Breadcrumbs include="aboutCourse" courseCode={courseCode} language={language} />,
      breadcrumbContainer
    )
}

function StudentViewCourseDev() {
  const [context] = useWebContext()

  const { courseCode, courseKoppsData, analysisData, userLang } = context
  const { pageTitles, tableHeaders } = i18n.messages[userLang === 'en' ? 0 : 1]
  const linkToAboutCourse = `${COURSE_INFO_URL}${courseCode}?l=${userLang}`
  const regulatedLink = userLang === 'en' ? REGULATED_URL_EN : REGULATED_URL_SV
  const labelAboutCoursePage = `${pageTitles.about_course} ${courseCode}`
  const labelAboutRegulatedLlink = pageTitles.regulated_link
  const navLabel = `${userLang === 'en' ? 'Go to' : 'Gå till'} ${labelAboutCoursePage}`

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      renderBreadcrumbsIntoKthHeader(courseCode, userLang)
    }
    return () => (isMounted = false)
  }, [])

  return (
    <main
      className="kursinfo-main-page col"
      id="mainContent"
      key="kursinfo-container"
      lang={userLang}
      aria-labelledby="page-course-title"
      aria-describedby="intro-text"
    >
      <nav className="navigation main" aria-label={navLabel} lang={userLang}>
        <a href={linkToAboutCourse} className="link-back mt-15 mb-15">
          {labelAboutCoursePage}
        </a>
      </nav>
      <PageTitle
        key="title"
        courseKoppsData={courseKoppsData}
        pageTitle={pageTitles.course_dev_title}
        translate={pageTitles}
      />
      <span className="intro-text">
        <p className="col" lang={userLang}>
          {pageTitles.info_text[1]}
          <a href={regulatedLink} className="link mt-15 mb-15">
            {labelAboutRegulatedLlink}
          </a>
          {pageTitles.info_text[2]}
        </p>
      </span>
      <IntroText id="intro-text-0" key="intro-text-0" translate={pageTitles} phrase="0" userLang={userLang} />
      <IntroText id="intro-text-1" key="intro-text-3" translate={pageTitles} phrase="3" userLang={userLang} />
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

export default StudentViewCourseDev
