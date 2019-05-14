import React, { Component } from 'react'
import { Collapse } from 'reactstrap'

class CollapseExtraInfo extends Component {
  constructor (props) {
    super(props)
    this.toggleHeader = this.toggleHeader.bind(this)
    this.state = {collapseExtraInfo: this.props.isOpen}
  }
  toggleHeader () {
    this.setState(state => ({collapseExtraInfo: !state.collapseExtraInfo}))
  }
  render () {
    const label = this.props.label
    const courseRoundData = this.props.courseRoundData
    const translate = this.props.translate
    return (
      <div className='card collapsible programs-list white' >
        <span className='card-header program-rubrik' role='tab' tabIndex='0' onClick={this.toggleHeader}>
          <a className='collapse-header title' id={label} aria-expanded={this.state.collapseExtraInfo} load='false' data-toggle='collapse'>{this.props.header}</a>
        </span>
        <Collapse color='white' isOpen={this.state.collapseExtraInfo} toggler={label}>
          <div className='card-body col summary'>
            <h4>{translate.header_examination_comment}</h4>
            <p className='textBlock' dangerouslySetInnerHTML={{__html: courseRoundData.commentExam}}></p>
            <h4>{translate.header_programs}</h4>
            <p className='textBlock' dangerouslySetInnerHTML={{__html: courseRoundData.programmeCodes}}></p>
            <h4>{translate.header_rounds}</h4>
            <p className='textBlock' dangerouslySetInnerHTML={{__html: courseRoundData.analysisName}}></p>
            <h4>{translate.date_pdf_analys}</h4>
            <p className='textBlock' dangerouslySetInnerHTML={{__html: courseRoundData.pdfAnalysisDate}}></p>
            {/* TODO: THERE IS NO SUCH FUNCTIONALITY FOR FORSTA GÅNGEN YET*/}
            <p>{translate.date_fisrt_published}: {courseRoundData.publishedDate}</p>
            <p>{translate.date_last_change}:
                {/* TODO: THERE IS NO SUCH FUNCTIONALITY YET*/}
                <i>{translate.no_date_last_changed}</i>
            </p>
            <p>{translate.header_analysis_edit_comment}:
                {courseRoundData.commentChange === ''
                ? '  -  '
                : courseRoundData.commentChange
                }
            </p>
          </div>
        </Collapse>
      </div>
      )
  }
  }


export default CollapseExtraInfo
