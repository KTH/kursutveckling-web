import React from 'react'
import { EMPTY, KURSINFO_ADMIN_URL } from '../util/constants'

function PageTitle({ courseKoppsData: titleData, pageTitle, translate }) {
  const { courseCode, courseCredits, courseTitle, koppsDataLang } = titleData
  const adminPageLink = `${KURSINFO_ADMIN_URL}${courseCode}?l=${koppsDataLang}`

  const credits =
    courseCredits !== EMPTY && courseCredits.toString().indexOf('.') < 0 ? courseCredits + '.0' : courseCredits
  const creditUnit = koppsDataLang === 'en' ? `${credits} credits` : `${credits.toString().replace('.', ',')} hp`

  const courseName = `${courseCode} ${courseTitle} ${creditUnit}`
  return (
    <header role="presentation" className="col">
      <h1 id="page-heading" aria-labelledby="page-heading page-sub-heading">
        {pageTitle}
      </h1>
      <div id="page-sub-heading-wrapper">
        <p id="page-sub-heading" aria-hidden="true">
          {courseCode && courseName}
        </p>
        <p id="page-sub-heading-admin-link" className="d-none d-sm-block">
          <a title={translate.course_admin_title} href={adminPageLink}>
            {translate.course_admin_title}
          </a>
        </p>
      </div>
    </header>
  )
}

export default PageTitle
