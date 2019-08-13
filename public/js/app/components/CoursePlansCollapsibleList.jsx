import '@babel/polyfill'
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
    const { lang, translate } = this.props
    const { courseCode, syllabusSemesterList } = this.props.adminStore.courseKoppsData
    return (
      <div className='card collapsible blue course-plans'>
        <span className='card-header' role='tab' tabIndex='0' onClick={this.toggleHeader}>
          <a id='kursplan-list' aria-expanded={this.state.collapse} load='false' data-toggle='collapse'>{translate.header_syllabuses}</a>
        </span>
        <Collapse isOpen={this.state.collapse} toggler='#kursplan-list'>
            <div className='kursplan-bordered-list'>
              {/* --- ALL SYLLABUS LINKS--- */}
              {syllabusSemesterList.length > 0
                ? syllabusSemesterList.map((tillSemester, index, semesterArr) => {
                    if (semesterArr[index+1]) {
                      const startSemester = semesterArr[index+1]
                      let lastTerm = tillSemester.toString().substring(4, 5)
                      if ( lastTerm === '2' ) tillSemester -= 1
                      else if (lastTerm === '1' ) tillSemester -= 9 
                      return (
                        <p key={index}>
                          <a alt={translate.alt_label_syllabus_link}
                          href={`${SYLLABUS_URL}${courseCode}-${startSemester}.pdf?lang=${lang}`}
                          key={index} id={startSemester} target='_blank'
                          className='pdf-link'> 
                            {translate.label_syllabus_link} {' ( '}
                            {/* START SEMESTER FOR THIS COURSE SYLLABUS, f.e., Autumn 2009*/}
                            {translate.course_short_semester[startSemester.toString().substring(4, 5)]}
                            {startSemester.toString().substring(0, 4)} -  &nbsp;
                            {/* LAST SEMESTER FOR THIS COURSE SYLLABUS f.e., Spring 2019*/}
                            {translate.course_short_semester[tillSemester.toString().substring(4, 5)]}
                            {tillSemester.toString().substring(0, 4)} {' )'}
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
