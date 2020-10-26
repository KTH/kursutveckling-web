import React from 'react'

const row = (translation, courseCode, language, memo) => {
  const offeringLabel = (
    <>
      {`${
        translation.course_short_semester[memo.semester.substring(4, 5)]
      } ${memo.semester.substring(0, 4)}${memo.ladokRoundIds.reduce(
        (label, id) => `${label}-${id}`,
        ''
      )}`}
    </>
  )
  const memoLabel = `${memo.memoName || memo.courseMemoFileName} `
  return (
    <tr
      key={`memo-${memo.semester}${memo.ladokRoundIds.reduce((label, id) => `${label}-${id}`, '')}`}
    >
      <td>{offeringLabel}</td>
      <td>
        <a
          aria-label={memo.isPdf ? `PDF ${memoLabel}` : `${memoLabel}`}
          href={
            memo.isPdf
              ? `https://kursinfostoragestage.blob.core.windows.net/memo-blob-container/${memo.courseMemoFileName}`
              : `/kurs-pm/${courseCode}/${memo.memoEndPoint}`
          }
          target={memo.isPdf ? '_blank' : null}
          rel={memo.isPdf ? 'noreferrer' : null}
          className={memo.isPdf ? 'pdf-post-link' : null}
        >
          {memoLabel}
        </a>
      </td>
    </tr>
  )
}

const MemoTable = ({ translation, courseCode, language, memoData = {} }) => {
  const semesters = Object.keys(memoData) || []
  semesters.sort().reverse()
  return (
    <>
      <h2>{translation.label_memos}</h2>
      <table className="table archive-table">
        <thead>
          <tr>
            <th scope="col">{translation.label_course_offering}</th>
            <th scope="col">{translation.label_memo}</th>
          </tr>
        </thead>
        <tbody>
          {semesters.map((semester) => {
            const memosForSemester = memoData[semester]
            return memosForSemester.map((memo) => row(translation, courseCode, language, memo))
          })}
        </tbody>
      </table>
    </>
  )
}

export default MemoTable
