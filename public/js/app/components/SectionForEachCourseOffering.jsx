import React, { Component } from 'react'
import { Collapse } from 'reactstrap'
import CollapseExtraInfo from './CollapseExtraInfo'
import PdfLinksNav from './PdfLinksNav'
import TableWithCourseData from './TableWithCourseData'
import { inject, observer } from 'mobx-react'

// const dataLang = analysisName => {
//   const lastElementOfString = analysisName.split(',').pop()
//   //take the last one
//   const isEnglish =
//     lastElementOfString.includes('English') || lastElementOfString.includes('Swedish')

//   return isEnglish ? 'en' : 'sv'
// }

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
    const { thisAnalysisObj, parentSectionId, tableLabels } = this.props
    const { koppsDataLang } = this.props.adminStore.courseKoppsData

    const { analysisName, _id: courseAnalysDataId } = thisAnalysisObj
    // const analysisLang = dataLang(analysisName)

    return (
      <section
        className="card collapsible blue course-data-for-round"
        aria-describedby={parentSectionId}
      >
        <header className="course-data-title card-header" onClick={this.toggleRound}>
          <h4 className="mb-0">
            <a
              href="#courseData"
              id={courseAnalysDataId}
              aria-expanded={this.state.collapse}
              load="false"
            >
              {analysisName}
            </a>
          </h4>
        </header>
        {/*  */}
        <Collapse
          className="bordered-table"
          isOpen={this.state.collapse}
          toggler={'#' + courseAnalysDataId}
        >
          <PdfLinksNav
            lang={koppsDataLang}
            translate={tableLabels}
            thisAnalysisObj={thisAnalysisObj}
            storageUri={this.props.adminStore.browserConfig.storageUri}
          />

          <TableWithCourseData
            thisAnalysisObj={thisAnalysisObj}
            translate={tableLabels.table_headers_with_popup}
          />

          <CollapseExtraInfo
            label={'moreData' + courseAnalysDataId}
            thisAnalysisObj={thisAnalysisObj}
            translate={tableLabels}
          />
        </Collapse>
      </section>
    )
  }
}
export default SectionForEachCourseOffering
