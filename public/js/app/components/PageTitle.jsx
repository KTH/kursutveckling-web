import React, { Component } from 'react'
import { EMPTY, KURSINFO_ADMIN_URL } from '../util/constants'

class PageTitle extends Component {
  render() {
    const title = this.props.courseKoppsData
    const { pageTitle, translate } = this.props
    const { courseCode, courseCredits, courseTitle, koppsDataLang } = title
    const adminPageLink = `${KURSINFO_ADMIN_URL}${courseCode}?l=${koppsDataLang}`

    const credits =
      courseCredits !== EMPTY && courseCredits.toString().indexOf('.') < 0
        ? courseCredits + '.0'
        : courseCredits
    const creditUnit =
      koppsDataLang === 'en' ? `${credits} credits` : `${credits.toString().replace('.', ',')} hp`

    const courseName = `${courseCode} ${courseTitle} ${creditUnit}`
    return (
      <header id="course-title" className="pageTitle col">
        <h1 data-testid="main-heading">{pageTitle}</h1>
        <div data-testid="sub-heading">
          <span role="heading" aria-level="4">
            {courseCode && courseName}
          </span>
          <span>
            <a
              className="right-link"
              href={adminPageLink}
              aria-label={translate.aria_label_course_admin_title}
            >
              {translate.course_admin_title}
            </a>
          </span>
        </div>
      </header>
    )
  }
}

export default PageTitle
