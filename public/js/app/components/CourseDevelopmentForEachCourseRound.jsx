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
    const courseRoundData = this.props.courseRoundObj
    console.log('courseRoundData', courseRoundData)
    const { translate, courseAnalysDataId } = this.props
    const popOverId = 'exam' + courseAnalysDataId // Examination expandera

    return (
      <div className='card collapsible blue table-for-round'>
        <span className='table-title card-header' role='tab' tabIndex='0' onClick={this.toggleRound}>
          <a id={courseAnalysDataId} aria-expanded={this.state.collapse} load='false'>{translate.header_course_round}: {courseRoundData.analysisName}</a>
        </span>
        {/*  */}
        <Collapse className='bordered-table' isOpen={this.state.collapse} toggler={'#' + courseAnalysDataId}>
          <SyllabusPmAnalysLinks translate={translate} 
            courseRoundData={courseRoundData} 
            storageUri={this.props.adminStore.browserConfig.storageUri} 
            koppsData={this.props.adminStore.courseKoppsData}
          />
            
          <TableWithCourseData translate={translate} 
            courseRoundData={courseRoundData}
            popOverId={popOverId}
          />

          <CollapseExtraInfo translate={translate}
            courseRoundData={courseRoundData}
            label={courseAnalysDataId} 
          />
        </Collapse>
      </div>
      ) }
  }
export default CourseDevelopmentForEachCourseRound