import React from 'react'

const renderRow = (row) => {
  return (
    <tr key={row[0]}>
      {row.map((cell, index) => {
        return <td key={index}>{typeof cell === 'function' ? cell() : cell}</td>
      })}
    </tr>
  )
}

const Table = ({ headings, rows, tableClasses }) => {
  return (
    <>
      <table className={tableClasses.join(' ')}>
        <thead>
          <tr>
            {headings.map((h) => {
              return (
                <th key={h} scope="col">
                  {h}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>{rows.map((r) => renderRow(r))}</tbody>
      </table>
    </>
  )
}

export default Table
