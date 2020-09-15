import React, { Component } from 'react'
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

          <CollapseExtraInfo
            label={'moreData' + courseAnalysDataId}
            thisAnalysisObj={thisAnalysisObj}
            translate={tableLabels}
          />
      </section>
    )
  }
}
export default SectionForEachCourseOffering
