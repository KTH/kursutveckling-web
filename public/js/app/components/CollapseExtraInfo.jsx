import React, { Component } from 'react'
import { Collapse } from 'reactstrap'

const ExtraKoppsInfo = ({translate, courseRoundData}) => {
  return (
    <span>
      <p><b>{translate.header_examination_comment}</b></p>
      <p className='textBlock' dangerouslySetInnerHTML={{__html: courseRoundData.commentExam}}></p>
      <p><b>{translate.header_programs}</b></p>
      <p className='textBlock' dangerouslySetInnerHTML={{__html: courseRoundData.programmeCodes}}></p>
      <p><b>{translate.header_rounds}</b></p>
      <p className='textBlock' dangerouslySetInnerHTML={{__html: courseRoundData.analysisName}}></p>
    </span>
  )
}
const ExtraDatesAndComment = ({translate, courseRoundData}) => {
  return (
    <span>
      <p><b>{translate.header_publishing_dates}</b></p>
      <p>{translate.date_first_published}:&nbsp;{courseRoundData.publishedDate}</p>
      <p>{translate.date_last_change}:&nbsp;
      {courseRoundData.changedAfterPublishedDate && courseRoundData.changedAfterPublishedDate !== ''
        ? courseRoundData.changedAfterPublishedDate
        : <i>{translate.no_date_last_changed}</i>
      }
      </p>
      <p>{translate.header_analysis_edit_comment}:</p>
      <p>{courseRoundData.commentChange === ''
          ? '  -  '
          : courseRoundData.commentChange
          }
      </p>
    </span>
  )
}
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
      <div className='card collapsible rubric-list white' >
        <span className='card-header info-rubric' role='tab' tabIndex='0' onClick={this.toggleHeader}>
          <a className='collapse-header title' id={label} aria-expanded={this.state.collapseExtraInfo} load='false' data-toggle='collapse'>{translate.header_more_info}</a>
        </span>
        <Collapse color='white' isOpen={this.state.collapseExtraInfo} toggler={label}>
          <div className='card-body col extra-info'>
            <ExtraKoppsInfo translate={translate} courseRoundData={courseRoundData} />
            <ExtraDatesAndComment translate={translate} courseRoundData={courseRoundData} />
          </div>
        </Collapse>
      </div>
      )
  }
  }

export default CollapseExtraInfo
