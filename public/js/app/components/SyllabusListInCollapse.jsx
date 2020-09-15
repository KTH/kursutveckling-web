import React, { Component } from 'react'
import { Collapse } from 'reactstrap'
import { SYLLABUS_URL } from '../util/constants'
import { inject, observer } from 'mobx-react'
import LinkToValidSyllabusPdf from '../components/LinkToValidSyllabus'

@inject(['adminStore'])
@observer
class SyllabusListInCollapse extends Component {
  constructor(props) {
    super(props)
    this.state = { collapse: false }
    this.toggleHeader = this.toggleHeader.bind(this)
  }

  toggleHeader(e) {
    e.preventDefault()
    this.setState(state => ({ collapse: !state.collapse }))
  }

  render() {
    const { lang, translate } = this.props
    const { courseCode, sortedSyllabusStart } = this.props.adminStore.courseKoppsData

    return (
      <div
        className="card collapsible blue course-syllabuses"
        aria-labelledby="syllabuses-list"
        aria-describedby="describe-syllabuses-list"
      >
        <span className="card-header" role="tab" onClick={this.toggleHeader}>
          <h4 className="mb-0">
            <a
              aria-describedby="describe-syllabuses-list"
              href="#plan"
              id="syllabuses-list"
              aria-expanded={this.state.collapse}
              load="false"
              data-toggle="collapse"
            >
              {translate.header_syllabuses}
            </a>
          </h4>
          <span id="describe-syllabuses-list" className="sr-only">
            {translate.aria_label_header_syllabuses}
          </span>
        </span>
        <Collapse isOpen={this.state.collapse} toggler="#syllabuses-list">
          <div className="collapse-bordered-list">
            {/* --- ALL SYLLABUS LINKS--- */}
            {sortedSyllabusStart.length > 0
              ? sortedSyllabusStart.map((tillSemester, index, semesterArr) => {
                  if (semesterArr[index + 1]) {
                    const startDate = semesterArr[index + 1].toString()
                    return (
                      <LinkToValidSyllabusPdf startDate={startDate} lang={lang} key={startDate} />
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

export default SyllabusListInCollapse
