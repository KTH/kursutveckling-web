import React, { Component } from 'react'
import { EMPTY } from '../util/constants'
import { Alert } from 'reactstrap'
import i18n from '../../../../i18n'

class CourseTitle extends Component {

  render () {
    const title = this.props.courseKoppsData
    const pageTitle = this.props.pageTitle
    const { koppsLangIndex, koppsDataLang } = title
    title.courseCredits = title.apiError ? '' : title.courseCredits !== EMPTY && title.courseCredits.toString().indexOf('.') < 0 ? title.courseCredits + '.0' : title.courseCredits
    return (
      <div id='course-title' className='courseTitle col'>
        <h1>{pageTitle}</h1>
        {title.apiError
          ? <h4><span property='aiiso:code'>{title.courseCode}</span>
            <span property='teach:courseTitle'>
              <Alert color='info' aria-live='polite'>
                {i18n.messages[koppsLangIndex].pageTitles.alertMessages.kopps_api_down}
              </Alert>
            </span>
          </h4>
          : <h4><span property='aiiso:code'>{title.courseCode}</span>
            <span property='teach:courseTitle'> {title.courseTitle}</span>
            <span content={title.courseCredits} datatype='xsd:decimal' property='teach:ects'>
              &nbsp;{koppsDataLang === 'en' ? title.courseCredits : title.courseCredits.toString().replace('.', ',')}&nbsp;{koppsDataLang === 'en' ? 'credits' : 'hp'}
            </span>
          </h4>
        }
      </div>
    )
  }
}

export default CourseTitle
