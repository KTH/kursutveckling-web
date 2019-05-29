import React, { Component } from 'react'
import { Collapse } from 'reactstrap'

class CoursePlansCollapsibleList extends Component {
  constructor (props) {
    super(props)
    this.state = {collapse: false}
    this.toggleHeader = this.toggleHeader.bind(this)
  }

  toggleHeader () {
    console.log
    this.setState(state => ({collapse: !state.collapse}))
  }

  render () {
    return (
      <div className='card collapsible blue course-plans'>
        <span className='card-header' role='tab' tabIndex='0' onClick={this.toggleHeader}>
          <a id='kursplan-list' aria-expanded={this.state.collapse} load='false' data-toggle='collapse'>Samtliga kursplaner</a>
        </span>
        <Collapse isOpen={this.state.collapse} toggler='#kursplan-list'>
            <div>
                 {/* --- ALL SYLLABUS LINKS--- */}
              {/* <h3>{translation.courseLabels.header_syllabuses}</h3> */}
                {/* {courseData.syllabusSemesterList.length > 0
                ? courseData.syllabusSemesterList.map((semester, index) => {
                    return (
                    <span key={index}>
                        <a
                        href={`${SYLLABUS_URL}${routerStore.courseData.courseInfo.course_code}-${semester[0]}.pdf?lang=${language}`}
                        key={index}
                        id={semester}
                        target='_blank'
                        className='pdf-link'
                        >
                        {translation.courseLabels.label_syllabus_link}
                        ( {translation.courseInformation.course_short_semester[semester[0].toString().substring(4, 5)]}
                        {semester[0].toString().substring(0, 4)} -  &nbsp;
                        {translation.courseInformation.course_short_semester[semester[1].toString().substring(4, 5)]}
                        {semester[1].toString().substring(0, 4)} )
                        </a> <br />
                    </span>
                    )
                })
                : EMPTY[courseData.language]} */}

            </div>
        </Collapse>
      </div>
    )
  }
}

export default CoursePlansCollapsibleList
