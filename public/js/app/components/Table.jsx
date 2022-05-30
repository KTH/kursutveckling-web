import React from 'react'

const renderRow = (row) => (
  <tr key={row[0]}>
    {row.map((cell, index) => (
      <td key={index}>{typeof cell === 'function' ? cell() : cell}</td>
    ))}
  </tr>
)

const Table = ({ headings, rows, tableClasses }) => (
  <>
    <table className={tableClasses.join(' ')}>
      <thead>
        <tr>
          {headings.map((h) => (
            <th key={h} scope="col">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{rows.map((r) => renderRow(r))}</tbody>
    </table>
  </>
)

export default Table
