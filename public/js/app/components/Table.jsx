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

const Table = ({ headings, rows, tableClasses, columnClass = '' }) => {
  return (
    <>
      <table className={tableClasses.join(' ')}>
        <thead>
          <tr>
            {headings.map((heading, index) => (
              <th key={index} scope="col" className={columnClass}>
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
