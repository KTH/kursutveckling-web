import React from 'react'
import { KURSINFO_ADMIN_URL } from '../util/constants'
import i18n from '../../../../i18n'

function PageTitle({ courseData, pageTitle, language }) {
  const { courseCode, courseTitle, courseFormattedCredits, courseDataLang } = courseData
  const adminPageLinkHref = `${KURSINFO_ADMIN_URL}${courseCode}?l=${courseDataLang}`
  const adminPageLinkTitle = i18n.message('admin_link_title', courseDataLang)
  const subHeading = `${courseCode} ${courseTitle} ${courseFormattedCredits}`

  return (
    <header role="presentation" className="col">
      <h1 id="page-heading" aria-labelledby="page-heading page-sub-heading">
        {pageTitle}
      </h1>
      <div id="page-sub-heading-wrapper">
        <p id="page-sub-heading">{subHeading}</p>
        <p id="page-sub-heading-admin-link" className="d-none d-sm-block">
          <a href={adminPageLinkHref}>{adminPageLinkTitle}</a>
        </p>
      </div>
    </header>
  )
}

export default PageTitle
