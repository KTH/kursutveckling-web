import React from 'react'

const renderRow = (row, rowIndex) => {
  return (
    <tr key={rowIndex}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  )
}

const getHeadingClass = (nrOfColumns, columnIndex) => {
  const settings = nrOfColumns === 3 ? 'heading' : nrOfColumns === 2 && columnIndex === 0 ? 'heading' : ''
  return settings
}

const Table = ({ headings, rows, tableClasses }) => {
  return (
    <>
      <table className={tableClasses.join(' ')}>
        <thead>
          <tr>
            {headings.map((heading, index) => (
              <th key={index} scope="col" className={getHeadingClass(headings.length, index)}>
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{rows.map((row, index) => renderRow(row, index))}</tbody>
      </table>
    </>
  )
}

export default Table
