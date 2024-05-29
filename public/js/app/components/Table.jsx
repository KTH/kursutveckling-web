import React from 'react'

const renderRow = (row) => {
  return (
    //TODO: unique ID for key
    <tr key={row.semester}>
      {row.map((cell, index) => (
        <td key={index}>{typeof cell === 'function' ? cell() : cell}</td>
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
            {headings.map((heading) => (
              <th key={heading} scope="col">
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{rows.map((row) => renderRow(row))}</tbody>
      </table>
    </>
  )
}

export default Table
