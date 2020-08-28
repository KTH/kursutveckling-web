import React, { Component } from 'react'
import { Collapse } from 'reactstrap'
import { formatISODate } from '../util/helpers'

const ExtraKoppsInfo = ({ translate, thisAnalysisObj }) => {
  const { _id: popOverId } = thisAnalysisObj
  const orderedTitles = ['commentExam', 'programmeCodes', 'analysisName']
  return (
    <span className="extra-kopps-info-from-kutv-api" aria-label={translate.aria_label_span}>
      {orderedTitles.map((infoTitle, index) => (
        <span key={index} className={infoTitle}>
          <p role="heading" aria-level="5" id={popOverId + index} key={'header-for-' + infoTitle}>
            <b>{translate[infoTitle].header}</b>
          </p>
          {thisAnalysisObj[infoTitle] === '' ? (
            <p className="textBlock">
              {' '}
              <i>{translate.no_added}</i>
            </p>
          ) : (
            <p
              className="textBlock"
              dangerouslySetInnerHTML={{ __html: thisAnalysisObj[infoTitle] }}
            />
          )}
        </span>
      ))}
    </span>
  )
}
const ExtraDatesAndComment = ({ translate, thisAnalysisObj }) => {
  const { changedAfterPublishedDate, commentChange, publishedDate } = thisAnalysisObj
  const { page_lang: pageLang, commentChange: labelAboutChanges } = translate
  return (
    <span>
      <p role="heading" aria-level="5">
        <b>{translate.header_publishing_dates}</b>
      </p>
      <p>
        <span role="heading" aria-level="6">
          {translate.publishedDate}:&nbsp;
        </span>
        {formatISODate(publishedDate, pageLang)}
      </p>
      {changedAfterPublishedDate && changedAfterPublishedDate !== '' ? (
        <span role="list">
          <p role="listitem">
            <span role="heading" aria-level="6">
              {translate.changedAfterPublishedDate}
              :&nbsp;
            </span>
            {formatISODate(changedAfterPublishedDate, pageLang)}
          </p>
          <article role="listitem">
            <p role="heading" aria-level="6">
              {labelAboutChanges}:
            </p>
            <p>{commentChange === '' ? <i>{translate.no_added}</i> : commentChange}</p>
          </article>
        </span>
      ) : (
        <p>
          <span role="heading" aria-level="6">
            {translate.changedAfterPublishedDate}
          </span>
          :&nbsp;<i>{translate.no_date_last_changed}</i>
        </p>
      )}
    </span>
  )
}

class CollapseExtraInfo extends Component {
  constructor(props) {
    super(props)
    this.toggleHeader = this.toggleHeader.bind(this)
    this.state = { collapseExtraInfo: this.props.isOpen }
  }

  toggleHeader(event) {
    event.preventDefault()
    this.setState(state => ({ collapseExtraInfo: !state.collapseExtraInfo }))
  }

  render() {
    const { thisAnalysisObj, label, translate } = this.props
    const { analysisName, _id: courseAnalysDataId } = thisAnalysisObj
    const ariaheaderDataName = `round-header-${courseAnalysDataId}`

    return (
      <div className="card collapsible rubric-list white" aria-labelledby={ariaheaderDataName}>
        <div className="card-header info-rubric" role="tab" onClick={this.toggleHeader}>
          <h4 className="mb-0">
            <a
              href="#more"
              className="collapse-header title"
              id={label}
              aria-expanded={this.state.collapseExtraInfo}
              load="false"
              data-toggle="collapse"
              aria-label={`${translate.aria_label_header_more_info} ${analysisName}`}
            >
              {translate.header_more_info}
            </a>
          </h4>
        </div>
        <Collapse color="white" isOpen={this.state.collapseExtraInfo} toggler={label}>
          <div className="card-body col extra-info">
            <ExtraKoppsInfo
              translate={translate.extra_kopps_info}
              thisAnalysisObj={thisAnalysisObj}
            />
            <ExtraDatesAndComment
              translate={translate.extra_dates_and_comments}
              thisAnalysisObj={thisAnalysisObj}
            />
          </div>
        </Collapse>
      </div>
    )
  }
}

export default CollapseExtraInfo
