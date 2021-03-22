import React from 'react'

const administrationLink = (courseCode, language) =>
  `/kursinfoadmin/kurser/kurs/${courseCode}?l=${language}`

const ArchivePageHeader = ({ translation, subHeadline, courseCode, language }) => {
  return (
    <header>
      <h1 id="page-heading" aria-labelledby="page-heading page-sub-heading">
        {translation.archive}
      </h1>
      <div id="page-sub-heading-wrapper">
        <p id="page-sub-heading" aria-hidden="true">
          {subHeadline}
        </p>
        <p id="page-sub-heading-admin-link" className="d-none d-sm-block">
          <a title={translation.administration} href={administrationLink(courseCode, language)}>
            {translation.administration}
          </a>
        </p>
      </div>
    </header>
  )
}

export default ArchivePageHeader
