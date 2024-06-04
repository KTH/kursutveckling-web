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

const Table = ({ headings, rows, tableClasses }) => {
  return (
    <>
      <table className={tableClasses.join(' ')}>
        <thead>
          <tr>
            {headings.labels.map((label, index) => (
              <th key={index} scope="col" className={headings.classes ? headings.classes[index] : ''}>
                {label}
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
