import React, { Component } from 'react'
import Details from './Details'
import PdfLinksNav from './PdfLinksNav'
import TableWithCourseData from './TableWithCourseData'
import { inject, observer } from 'mobx-react'

@inject(['adminStore'])
@observer
class SectionForEachCourseOffering extends Component {
  constructor(props) {
    super(props)
    this.state = { }
  }

  render() {
    const { thisAnalysisObj, parentSectionId, tableLabels } = this.props
    const { koppsDataLang } = this.props.adminStore.courseKoppsData

    const { analysisName, _id: courseAnalysDataId } = thisAnalysisObj
    // const analysisLang = dataLang(analysisName)

    return (
      <section
        className="course-data-for-round"
        aria-describedby={parentSectionId}
      >
        <header className="course-data-title">
          <h3 className="mb-0">
              {analysisName}
          </h3>
        </header>
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

          <Details
            label={'moreData' + courseAnalysDataId}
            thisAnalysisObj={thisAnalysisObj}
            translate={tableLabels}
          />
      </section>
    )
  }
}
export default SectionForEachCourseOffering
