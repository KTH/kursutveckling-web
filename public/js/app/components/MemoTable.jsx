import React from 'react'

const row = (translation, courseCode, language, courseMemo) => {
  const { courseOffering, isPdf, memoName, memoVersions } = courseMemo
  return (
    <tr key={courseOffering}>
      <td>{courseOffering}</td>
      <td>
        <ul className="link-list">
          {memoName && <li key={memoName}>{memoName + ':'}</li>}
          {memoVersions.map((v) => (
            <li key={v.name}>
              <a
                aria-label={isPdf ? `PDF ${v.label}` : `${v.label}`}
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
        <table className="table archive-table">
          <thead>
            <tr>
              <th scope="col">{translation.label_course_offering}</th>
              <th scope="col">{translation.label_memo}</th>
            </tr>
          </thead>
          <tbody>
            {courseMemos.map((courseMemo) => row(translation, courseCode, language, courseMemo))}
          </tbody>
        </table>
      ) : (
        <p className="inline-information">{translation.no_memos}</p>
      )}
    </>
  )
}

export default MemoTable
