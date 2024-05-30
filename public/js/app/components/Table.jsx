import React from 'react'

const renderRow = (row, rowIndex) => {
  return (
    //TODO: unique ID for key
    <tr key={rowIndex}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{typeof cell === 'function' ? cell() : cell}</td>
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
            {headings.map((heading, index) => (
              <th key={index} scope="col" className="semester-column">
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
