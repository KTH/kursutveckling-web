import React from 'react'
import { getDateFormat } from '../util/helpers'

const ExtraKoppsInfo = ({ translate, thisAnalysisObj }) => {
  const [finishedServerSideRendering, setFinishedServerSideRendering] = React.useState(false) // to make sure csv can use blob href and work properly

  const orderedTitles = ['analysisName', 'programmeCodes']

  React.useEffect(() => {
    let isMounted = true
    if (isMounted) setFinishedServerSideRendering(true)
    return () => (isMounted = false)
  }, [])

  return (
    <span className="extra-kopps-info-from-kutv-api">
      {orderedTitles.map((infoTitle) => (
        <span key={'details-' + infoTitle} className={infoTitle}>
          <h4 key={'header-for-' + infoTitle}>{translate[infoTitle].header}</h4>
          {thisAnalysisObj[infoTitle] === '' ? (
            <p className="textBlock">
              {' '}
              <i>{translate.no_added}</i>
            </p>
          ) : (
            finishedServerSideRendering && (
              <p
                className="textBlock"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: thisAnalysisObj[infoTitle] }}
              />
            )
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
      <h4>{translate.publishedDate}</h4>
      <p className="textBlock">{getDateFormat(publishedDate, pageLang)}</p>

      {changedAfterPublishedDate && changedAfterPublishedDate !== '' ? (
        <>
          <h4>{translate.changedAfterPublishedDate}</h4>
          <p className="textBlock">{getDateFormat(changedAfterPublishedDate, pageLang)}</p>
          <h4>{labelAboutChanges}</h4>
          <p className="textBlock">{commentChange === '' ? <i>{translate.no_added}</i> : commentChange}</p>
        </>
      ) : (
        <>
          <h4>{translate.changedAfterPublishedDate}</h4>
          <p className="textBlock">
            <i>{translate.no_date_last_changed}</i>
          </p>
        </>
      )}
    </span>
  )
}
const Details = ({ thisAnalysisObj, translate }) => {
  const { analysisName } = thisAnalysisObj
  const { header_more_info: headerMoreInfo } = translate
  return (
    <details className="extra-info">
      <summary className="white" aria-label={`${headerMoreInfo}: ${analysisName}`}>
        {headerMoreInfo}
      </summary>
      <div>
        <ExtraKoppsInfo translate={translate.extra_kopps_info} thisAnalysisObj={thisAnalysisObj} />
        <ExtraDatesAndComment translate={translate.extra_dates_and_comments} thisAnalysisObj={thisAnalysisObj} />
      </div>
    </details>
  )
}

export default Details
