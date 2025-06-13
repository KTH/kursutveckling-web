import React from 'react'
import { seasonStr } from '../util/helpers'
import Table from './Table'
import ActiveOrDisabledLink from './ActiveOrDisabledLink'

const createRow = (translation, courseMemo) => {
  const { semester, courseOffering, isPdf, memoName, memoVersionsAndUrls } = courseMemo
  return [
    seasonStr(translation.course_short_semester, semester),
    courseOffering,
    <ul className="link-list" style={{ padding: '0px' }}>
      {memoName && <li key={memoName}>{memoName + ':'}</li>}
      {memoVersionsAndUrls.map((memoEntry, index) => (
        <li key={index}>
          <ActiveOrDisabledLink
            linkTitle={memoEntry.name}
            isPdf={isPdf}
            href={memoEntry.url}
            ariaLabel={memoEntry.ariaLabel}
          />
          {memoEntry.latest ? ` (${translation.label_latest_version})` : ''}
        </li>
      ))}
    </ul>
  ]
}

const MemoTable = ({ translation, courseMemos = [] }) => {
  const memoDataRows = courseMemos.map((courseMemo) => createRow(translation, courseMemo))
  const headings = {
    labels: [translation.label_semester, translation.label_course_offering, translation.label_memo],
    classes: ['semester', 'heading', 'heading']
  }
  return (
    <>
      <h2>{translation.label_memos}</h2>
      {courseMemos.length ? (
        <Table headings={headings} rows={memoDataRows} tableClasses={['table', 'archive-table']} />
      ) : (
        <p className="inline-information">{translation.no_memos}</p>
      )}
    </>
  )
}

export default MemoTable
