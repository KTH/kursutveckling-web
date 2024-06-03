import React from 'react'
import { seasonStr } from '../util/helpers'
import Table from './Table'

const createRow = (translation, courseCode, language, courseMemo) => {
  const { semester, courseOffering, isPdf, memoName, memoVersionsAndUrls } = courseMemo
  return [
    seasonStr(translation.course_short_semester, semester),
    courseOffering,
    <ul className="link-list" style={{ padding: '0px' }}>
      {memoName && <li key={memoName}>{memoName + ':'}</li>}
      {memoVersionsAndUrls.map((memoEntry, index) => (
        <li key={index}>
          <a
            aria-label={`${isPdf ? 'PDF ' : ''}${memoEntry.ariaLabel}`}
            href={memoEntry.url}
            target={isPdf ? '_blank' : null}
            rel={isPdf ? 'noreferrer' : null}
            className={isPdf ? 'pdf-link' : null}
          >
            {memoEntry.name}
          </a>
          {memoEntry.latest ? ` (${translation.label_latest_version})` : ''}
        </li>
      ))}
    </ul>
  ]
}

const MemoTable = ({ translation, courseCode, language, courseMemos = [] }) => {
  const memoDataRows = courseMemos.map((courseMemo) => createRow(translation, courseCode, language, courseMemo))
  return (
    <>
      <h2>{translation.label_memos}</h2>
      {courseMemos.length ? (
        <Table
          headings={[translation.label_semester, translation.label_course_offering, translation.label_memo]}
          rows={memoDataRows}
          tableClasses={['table', 'archive-table']}
        />
      ) : (
        <p className="inline-information">{translation.no_memos}</p>
      )}
    </>
  )
}

export default MemoTable
