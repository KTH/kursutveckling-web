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
    const { pageTitles: label } = i18n.messages[lang === 'en' ? 0 : 1]
    const endDate = syllabusPeriods[startDate].endDate.toString()

    return (
      <p key={'listitem-syllabus-from-' + startDate} role="listitem">
        <a
          aria-label={label.aria_label_syllabus_link}
          href={`${SYLLABUS_URL}${courseCode}-${startDate}.pdf?lang=${lang}`}
          id={startDate}
          target="_blank"
          className="pdf-link"
        >
          {label.label_syllabus_link} {' ( '}
          {/* START SEMESTER FOR THIS COURSE SYLLABUS, f.e., Autumn 2009*/}
          {label.course_short_semester[startDate.substring(4, 5)]}
          {startDate.substring(0, 4)} - &nbsp;
          {/* LAST SEMESTER FOR THIS COURSE SYLLABUS f.e., Spring 2019*/}
          {label.course_short_semester[endDate.substring(4, 5)]}
          {endDate.substring(0, 4)} {' )'}
        </a>
      </p>
    )
  }
}

export default LinkToValidSyllabusPdf
