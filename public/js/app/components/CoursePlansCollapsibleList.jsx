import React, { Component } from 'react'
import { Collapse } from 'reactstrap'
import { SYLLABUS_URL} from '../util/constants'
import { inject, observer} from 'mobx-react'


@inject(['adminStore']) @observer
class CoursePlansCollapsibleList extends Component {
  constructor (props) {
    super(props)
    this.state = {collapse: false}
    this.toggleHeader = this.toggleHeader.bind(this)
  }

  toggleHeader () {
    this.setState(state => ({collapse: !state.collapse}))
  }

  render () {
    const translate = this.props.translate
    const lang = this.props.lang
    const syllabusSemesterList = this.props.adminStore.courseKoppsData.courseTitleData.course_plans
    const courseCode = this.props.adminStore.courseKoppsData.courseTitleData.course_code
    console.log("syllabusSemesterList", syllabusSemesterList)
    return (
      <div className='card collapsible blue course-plans'>
        <span className='card-header' role='tab' tabIndex='0' onClick={this.toggleHeader}>
          <a id='kursplan-list' aria-expanded={this.state.collapse} load='false' data-toggle='collapse'>{translate.header_syllabuses}</a>
        </span>
        <Collapse isOpen={this.state.collapse} toggler='#kursplan-list'>
            <div>
              {/* --- ALL SYLLABUS LINKS--- */}
              {syllabusSemesterList.length > 0
                ? syllabusSemesterList.map((tillSemester, index, semesterArr) => {
                    if (semesterArr[index+1]) {
                      const fromSemester = semesterArr[index+1]
                      return (
                        <p key={index}>
                          <a
                          href={`${SYLLABUS_URL}${courseCode}-${fromSemester}.pdf?lang=${lang}`}
                          key={index}
                          id={fromSemester}
                          target='_blank'
                          className='pdf-link'
                          >
                          {translate.label_syllabus_link}
                          ( {translate.course_short_semester[fromSemester.toString().substring(4, 5)]}
                          {fromSemester.toString().substring(0, 4)} -  &nbsp;
                          {translate.course_short_semester[tillSemester.toString().substring(4, 5)]}
                          {tillSemester.toString().substring(0, 4)} )
                          </a>
                        </p>
                      )
                    }
                })
                : translate.no_course_syllabus}
            </div>
        </Collapse>
      </div>
    )
  }
}

export default CoursePlansCollapsibleList
