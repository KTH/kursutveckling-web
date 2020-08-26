import React, { Component } from 'react'
import { Collapse } from 'reactstrap'
import CollapseExtraInfo from './CollapseExtraInfo'
import PdfLinks from './PdfLinks'
import TableWithCourseData from './TableWithCourseData'
import { inject, observer } from 'mobx-react'

@inject(['adminStore'])
@observer
class SectionForEachCourseOffering extends Component {
  constructor(props) {
    super(props)
    this.toggleRound = this.toggleRound.bind(this)
    this.state = { collapse: true }
  }

  toggleRound(e) {
    e.preventDefault()
    this.setState(state => ({ collapse: !state.collapse }))
  }

  render() {
    const { thisAnalysisObj, translate } = this.props
    const { koppsDataLang } = this.props.adminStore.courseKoppsData

    const { analysisName, _id: courseAnalysDataId } = thisAnalysisObj

    return (
      <div className="card collapsible blue course-data-for-round">
        <span className="course-data-title card-header" role="tab" onClick={this.toggleRound}>
          <h4 className="mb-0">
            <a
              href="#courseData"
              id={courseAnalysDataId}
              aria-expanded={this.state.collapse}
              load="false"
            >
              {translate.header_course_round}: {analysisName}
            </a>
          </h4>
        </span>
        {/*  */}
        <Collapse
          className="bordered-table"
          isOpen={this.state.collapse}
          toggler={'#' + courseAnalysDataId}
        >
          <PdfLinks
            translate={translate}
            thisAnalysisObj={thisAnalysisObj}
            storageUri={this.props.adminStore.browserConfig.storageUri}
            lang={koppsDataLang}
          />

          <TableWithCourseData
            translate={translate.table_headers_with_popup}
            thisAnalysisObj={thisAnalysisObj}
          />

          <CollapseExtraInfo
            translate={translate}
            thisAnalysisObj={thisAnalysisObj}
            label={courseAnalysDataId}
          />
        </Collapse>
      </div>
    )
  }
}
export default SectionForEachCourseOffering
