import React, { Component } from 'react'
import { EMPTY } from '../util/constants'

class CourseTitle extends Component {

  render () {
    const title = this.props.courseKoppsData
    const { pageTitle } = this.props
    const { koppsDataLang } = title
    title.courseCredits = title.courseCredits !== EMPTY && title.courseCredits.toString().indexOf('.') < 0 ? title.courseCredits + '.0' : title.courseCredits
    return (
      <div id='course-title' className='courseTitle col'>
        <h1>{pageTitle}</h1>
        <h4><span property='aiiso:code'>{title.courseCode}</span>
          <span property='teach:courseTitle'> {title.courseTitle}</span>
          <span content={title.courseCredits} datatype='xsd:decimal' property='teach:ects'>
            &nbsp;{koppsDataLang === 'en'
              ? `${title.courseCredits} credits`
              : `${title.courseCredits.toString().replace('.', ',')} hp`}
          </span>
        </h4>
      </div>
    )
  }
}

export default CourseTitle
