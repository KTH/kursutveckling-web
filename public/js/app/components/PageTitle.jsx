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
      <header className="pageTitle col">
        <span id="page-course-title" role="heading" aria-level="1">
          <span className="t1">{pageTitle}</span>
          <span className="t4">{courseCode && courseName}</span>         
        </span>
        <a className="right-link" href={adminPageLink} style={{fontSize: '16px', align: 'baseline'}}>
          {translate.course_admin_title}
        </a>
      </header>
    )
  }
}

export default PageTitle
