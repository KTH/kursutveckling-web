import React, { Component } from 'react'
import { Collapse } from 'reactstrap'
import { formatISODate } from '../util/helpers'

const ExtraKoppsInfo = ({ analysisLang, translate, thisAnalysisObj }) => {
  const { _id: popOverId } = thisAnalysisObj
  const orderedTitles = ['commentExam', 'programmeCodes', 'analysisName']
  return (
    <span className="extra-kopps-info-from-kutv-api">
      {orderedTitles.map((infoTitle, index) => (
        <span key={index} className={infoTitle}>
          <p id={popOverId + index} key={'header-for-' + infoTitle}>
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
              lang={analysisLang}
              dangerouslySetInnerHTML={{ __html: thisAnalysisObj[infoTitle] }}
            />
          )}
        </span>
      ))}
    </span>
  )
}
const ExtraDatesAndComment = ({ analysisLang, translate, thisAnalysisObj }) => {
  const { changedAfterPublishedDate, commentChange, publishedDate } = thisAnalysisObj
  const { page_lang: pageLang, commentChange: labelAboutChanges } = translate
  return (
    <span>
      <p>
        <b>{translate.header_publishing_dates}</b>
      </p>
      <p>
        {translate.publishedDate}:&nbsp;
        {formatISODate(publishedDate, pageLang)}
      </p>
      {changedAfterPublishedDate && changedAfterPublishedDate !== '' ? (
        <span>
          <p>
            {translate.changedAfterPublishedDate}:&nbsp;
            {formatISODate(changedAfterPublishedDate, pageLang)}
          </p>
          <p>{labelAboutChanges}:</p>
          <p lang={commentChange === '' ? pageLang : analysisLang}>
            {commentChange === '' ? <i>{translate.no_added}</i> : commentChange}
          </p>
        </span>
      ) : (
        <p>
          {translate.changedAfterPublishedDate}:&nbsp;<i>{translate.no_date_last_changed}</i>
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
    const { analysisLang, thisAnalysisObj, label, translate } = this.props
    return (
      <div className="card collapsible rubric-list white">
        <div className="card-header info-rubric" role="tab" onClick={this.toggleHeader}>
          <h4 className="mb-0">
            <a
              href="#more"
              className="collapse-header title"
              id={label}
              aria-expanded={this.state.collapseExtraInfo}
              load="false"
              data-toggle="collapse"
              aria-label={`${translate.aria_label_header_more_info} ${
                thisAnalysisObj.analysisName
              }`}
            >
              {translate.header_more_info}
            </a>
          </h4>
        </div>
        <Collapse color="white" isOpen={this.state.collapseExtraInfo} toggler={label}>
          <div className="card-body col extra-info">
            <ExtraKoppsInfo
              analysisLang={analysisLang}
              translate={translate.extra_kopps_info}
              thisAnalysisObj={thisAnalysisObj}
            />
            <ExtraDatesAndComment
              analysisLang={analysisLang}
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
