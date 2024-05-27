import React from 'react'
import { seasonStr } from '../util/helpers'

const row = (translation, courseCode, language, courseMemo) => {
  const { semester, courseOffering, isPdf, memoName, memoVersionsAndUrls } = courseMemo
  console.log('COURSE MEMO: ', courseMemo)
  return (
    <tr key={courseOffering}>
      <td>{seasonStr(translation.course_short_semester, semester)}</td>
      <td>{courseOffering}</td>
      <td>
        <ul className="link-list">
          {memoName && <li key={memoName}>{memoName + ':'}</li>}
          {memoVersionsAndUrls.map((v) => (
            <li key={v.name}>
              {/* eslint-disable-next-line react/jsx-no-target-blank*/}
              <a
                aria-label={`${isPdf ? 'PDF ' : ''}${v.ariaLabel}`}
                href={v.url}
                target={isPdf ? '_blank' : null}
                rel={isPdf ? 'noreferrer' : null}
                className={isPdf ? 'pdf-link' : null}
              >
                {v.name}
              </a>
              {v.latest ? ` (${translation.label_latest_version})` : ''}
            </li>
          ))}
        </ul>
      </td>
    </tr>
  )
}

const MemoTable = ({ translation, courseCode, language, courseMemos = [] }) => {
  return (
    <>
      <h2>{translation.label_memos}</h2>
      {courseMemos.length ? (
        <table className="table archive-table syllabus-table">
          <thead>
            <tr>
              <th scope="col">{translation.label_semesters}</th>
              <th scope="col">{translation.label_course_offering}</th>
              <th scope="col">{translation.label_memo}</th>
            </tr>
          </thead>
          <tbody>{courseMemos.map((courseMemo) => row(translation, courseCode, language, courseMemo))}</tbody>
        </table>
      ) : (
        <p className="inline-information">{translation.no_memos}</p>
      )}
    </>
  )
}

export default MemoTable
