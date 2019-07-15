import React, { Component } from 'react'
import { Collapse } from 'reactstrap'

const ExtraKoppsInfo = ({translate, courseRoundObj}) => {
  return (
    <span>
      {
        ['commentExam', 'programmeCodes', 'analysisName'].map((apiName, index) =>
          <span key={index}>
            <p><b>{translate[apiName].header}</b></p>
            <p className='textBlock' dangerouslySetInnerHTML={{__html: courseRoundObj[apiName]}}></p>
          </span>
        )
      }
      {/* <p><b>{translate.header_examination_comment}</b></p>
      <p className='textBlock' dangerouslySetInnerHTML={{__html: courseRoundObj.commentExam}}></p>
      <p><b>{translate.header_programs}</b></p>
      <p className='textBlock' dangerouslySetInnerHTML={{__html: courseRoundObj.programmeCodes}}></p>
      <p><b>{translate.header_rounds}</b></p>
      <p className='textBlock' dangerouslySetInnerHTML={{__html: courseRoundObj.analysisName}}></p> */}
    </span>
  )
}
const ExtraDatesAndComment = ({translate, courseRoundObj}) => {
  return (
    <span>
      <p><b>{translate.header_publishing_dates}</b></p>
      <p>{translate.date_first_published}:&nbsp;{courseRoundObj.publishedDate}</p>
      <p>{translate.changedAfterPublishedDate}:&nbsp;
      {courseRoundObj.changedAfterPublishedDate && courseRoundObj.changedAfterPublishedDate !== ''
        ? courseRoundObj.changedAfterPublishedDate
        : <i>{translate.no_date_last_changed}</i>
      }
      </p>
      <p>{translate.commentChange}:</p>
      <p>{courseRoundObj.commentChange === ''
          ? '  -  '
          : courseRoundObj.commentChange
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
    const { courseRoundObj, label, translate } = this.props
    return (
      <div className='card collapsible rubric-list white' >
        <span className='card-header info-rubric' role='tab' tabIndex='0' onClick={this.toggleHeader}>
          <a className='collapse-header title' id={label} aria-expanded={this.state.collapseExtraInfo} load='false' data-toggle='collapse'>{translate.header_more_info}</a>
        </span>
        <Collapse color='white' isOpen={this.state.collapseExtraInfo} toggler={label}>
          <div className='card-body col extra-info'>
            <ExtraKoppsInfo translate={translate.extra_kopps_info} courseRoundObj={courseRoundObj} />
            <ExtraDatesAndComment translate={translate.extra_dates_and_comments} courseRoundObj={courseRoundObj} />
          </div>
        </Collapse>
      </div>
      )
  }
  }

export default CollapseExtraInfo
