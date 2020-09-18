import React, { Component } from 'react'
import { Collapse } from 'reactstrap'
import { SYLLABUS_URL } from '../util/constants'
import { inject, observer } from 'mobx-react'
import i18n from '../../../../i18n'

@inject(['adminStore'])
@observer
class LinkToValidSyllabusPdf extends Component {
  constructor(props) {
    super(props)
    this.state = { startDate: this.props.startDate, lang: this.props.lang }
  }

  render() {
    const { lang, startDate } = this.state
    const { courseCode, syllabusPeriods } = this.props.adminStore.courseKoppsData
    const { course_short_semester, label_syllabus_link } = i18n.messages[lang === 'en' ? 0 : 1].pageTitles
    const endDate = syllabusPeriods[startDate].endDate.toString()
    const startTermName = `${course_short_semester[startDate.substring(4, 5)]}${startDate.substring(0, 4)}`
    const endTermName = `${course_short_semester[endDate.substring(4, 5)] || ''}${endDate.substring(0, 4)}`
    const coursePlanLabel = `${label_syllabus_link} ${courseCode} ( ${startTermName} - ${endTermName} )`

    return (
      <p key={'link-syllabus-from-' + startDate}>
        <a
          aria-label={`PDF ${coursePlanLabel}`}
          href={`${SYLLABUS_URL}${courseCode}-${startDate}.pdf?lang=${lang}`}
          target="_blank"
          className="pdf-link"
        > 
          {coursePlanLabel}
        </a>
      </p>
    )
  }
}

export default LinkToValidSyllabusPdf
