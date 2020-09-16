import React, { Component } from 'react'
import { Collapse } from 'reactstrap'
import { formatISODate } from '../util/helpers'

const ExtraKoppsInfo = ({ translate, thisAnalysisObj }) => {
  const { _id: popOverId } = thisAnalysisObj
  const orderedTitles = ['commentExam', 'programmeCodes', 'analysisName']
  return (
    <span className="extra-kopps-info-from-kutv-api">
      {orderedTitles.map((infoTitle, index) => (
        <span key={index} className={infoTitle}>
          <p role="heading" aria-level="4" id={popOverId + index} key={'header-for-' + infoTitle}>
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
      <p role="heading" aria-level="4">
        <b>{translate.header_publishing_dates}</b>
      </p>
      <p>
        <span role="heading" aria-level="5">
          {translate.publishedDate}:&nbsp;
        </span>
        {formatISODate(publishedDate, pageLang)}
      </p>
      {changedAfterPublishedDate && changedAfterPublishedDate !== '' ? (
        <span>
          <p>
            <span role="heading" aria-level="5">
              {translate.changedAfterPublishedDate}
              :&nbsp;
            </span>
            {formatISODate(changedAfterPublishedDate, pageLang)}
          </p>
          <article>
            <p role="heading" aria-level="5">
              {labelAboutChanges}:
            </p>
            <p>{commentChange === '' ? <i>{translate.no_added}</i> : commentChange}</p>
          </article>
        </span>
      ) : (
        <p>
          <span role="heading" aria-level="5">
            {translate.changedAfterPublishedDate}
          </span>
          :&nbsp;<i>{translate.no_date_last_changed}</i>
        </p>
      )}
    </span>
  )
}
const Details = ({ thisAnalysisObj, label, translate }) => {
  const { analysisName } = thisAnalysisObj
  const  {aria_header_more_info,  header_more_info} = translate
  return (
    <details className="extra-info">
      <summary className="white" aria-label={`${aria_header_more_info} ${analysisName}`}>{header_more_info}</summary>
      <div>
        <ExtraKoppsInfo
          translate={translate.extra_kopps_info}
          thisAnalysisObj={thisAnalysisObj}
        />
        <ExtraDatesAndComment
          translate={translate.extra_dates_and_comments}
          thisAnalysisObj={thisAnalysisObj}
        />
      </div>
    </details>
  )
}


export default Details
