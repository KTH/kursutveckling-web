import {Table} from 'reactstrap'
import React from 'react'


const KipLinkNav = ({courseCode, trans, lang}) => { // courseCode, lang, startCards
  const kursOmLink = `/student/kurser/kurs/${courseCode}?l=${lang}`
  const kursAdmin = `/admin/kurser/kurs/${courseCode}?l=${lang}`
  return (
    <span>
      <Table className='kip-menu'>
        <tbody>
          <tr>
            <td colSpan='2'>
              <h4>Om kursen</h4>
              <p>
                {/* <a href={`/admin/kurser/kurs/edit/${courseCode}?l=${lang}`} alt={startCards.sellingText_btn} className='btn btn-primary'>{startCards.sellingText_btn}</a> */}
                <a href={kursOmLink} alt='Tillbaka till Kursinformation vy'>Kursinformation</a>
              </p>
              <p>
                <b>Kursens utveckling och historik</b>
              </p>
              <p>
                <a href={kursAdmin} className='link-to' alt='Tillbaka till Kursens utveckling och historik vy'>Administrera</a>
              </p>
            </td>
          </tr>
        </tbody>
      </Table>
    </span>
    )
}

export default KipLinkNav
