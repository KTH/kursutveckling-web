import React, { Component } from 'react'
import { EMPTY } from '../util/constants'

class PageTitle extends Component {
  render() {
    const title = this.props.courseKoppsData
    const { pageTitle } = this.props
    const { koppsDataLang } = title
    title.courseCredits =
      title.courseCredits !== EMPTY && title.courseCredits.toString().indexOf('.') < 0
        ? title.courseCredits + '.0'
        : title.courseCredits
    return (
      <header id="course-title" className="pageTitle col">
        <h1>{pageTitle}</h1>
        <div role="heading" aria-level="1">
          <span property="aiiso:code">{title.courseCode}</span>
          <span property="teach:pageTitle"> {title.courseTitle}</span>
          <span content={title.courseCredits} datatype="xsd:decimal" property="teach:ects">
            &nbsp;
            {koppsDataLang === 'en'
              ? `${title.courseCredits} credits`
              : `${title.courseCredits.toString().replace('.', ',')} hp`}
          </span>
        </div>
      </header>
    )
  }
}

export default PageTitle
