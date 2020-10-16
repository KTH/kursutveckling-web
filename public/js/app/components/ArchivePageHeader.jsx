import React from 'react'

const ArchivePageHeader = ({ translation, subHeadline }) => {
  return (
    <header>
      <h1 id="page-heading" aria-labelledby="page-heading page-sub-heading">
        {translation.archive}
      </h1>
      <div>
        <p id="page-sub-heading" aria-hidden="true">
          {subHeadline}
        </p>
      </div>
    </header>
  )
}

export default ArchivePageHeader
