import React, { Component } from 'react'
import { Collapse } from 'reactstrap'
import CollapseExtraInfo from './CollapseExtraInfo'
import SyllabusPmAnalysLinks from './SyllabusPmAnalysLinks'
import TableWithCourseData from './TableWithCourseData'
import { inject, observer} from 'mobx-react'

@inject(['adminStore']) @observer
class CourseDevelopmentForEachCourseRound extends Component {
  constructor (props) {
    super(props)
    this.toggleRound = this.toggleRound.bind(this)
    this.state = {collapse: true}
  }

  toggleRound () {
    this.setState(state => ({collapse: !state.collapse}))
  }

  render () {
    const { courseRoundObj, translate } = this.props
    const { koppsDataLang } = this.props.adminStore.courseKoppsData

    const courseAnalysDataId = courseRoundObj._id
    console.log('courseRoundData', courseRoundObj)

    return (
      <div className='card collapsible blue course-data-for-round'>
        <span className='course-data-title card-header' role='tab' tabIndex='0' onClick={this.toggleRound}>
          <a id={courseAnalysDataId} aria-expanded={this.state.collapse} load='false'>{translate.header_course_round}: {courseRoundObj.analysisName}</a>
        </span>
        {/*  */}
        <Collapse className='bordered-table' isOpen={this.state.collapse} toggler={'#' + courseAnalysDataId}>
          <SyllabusPmAnalysLinks translate={translate} 
            courseRoundObj={courseRoundObj} 
            storageUri={this.props.adminStore.browserConfig.storageUri} 
            lang={koppsDataLang}
          />
            
          <TableWithCourseData translate={translate.table_headers_with_popup} 
            courseRoundObj={courseRoundObj}
          />

          <CollapseExtraInfo translate={translate}
            courseRoundObj={courseRoundObj}
            label={courseAnalysDataId} 
          />
        </Collapse>
      </div>
      ) }
  }
export default CourseDevelopmentForEachCourseRound