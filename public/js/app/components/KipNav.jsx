import React from 'react'
import {Table} from 'reactstrap'
import CoursePlansCollapsibleList from './CollapsibleList'

const KipLinkNav = ({courseCode, translate, lang}) => { // courseCode, lang, startCards
  const kursOmLink = `/student/kurser/kurs/${courseCode}?l=${lang}`
  const kursAdmin = `/kursinfoadmin/kurser/kurs/${courseCode}?l=${lang}`
  return (
    <span className='navigation row'>
      <Table className='kip-menu'>
        <tbody>
          <tr>
            <td colSpan='2'>
              <h4>{translate.about_course}</h4>
              <p>
                {/* <a href={`/admin/kurser/kurs/edit/${courseCode}?l=${lang}`} alt={startCards.sellingText_btn} className='btn btn-primary'>{startCards.sellingText_btn}</a> */}
                <a href={kursOmLink} alt='Tillbaka till Kursinformation vy'>{translate.course_info_title}</a>
              </p>
              <p>
                <b>{translate.course_dev_title}</b>
              </p>
            </td>
            <td className='admin-link'>
              <p>
                <a href={kursAdmin} className='link-to' alt='Tillbaka till Kursens utveckling och historik vy'>{translate.course_admin_title}</a>
              </p>
            </td>
          </tr>
        </tbody>
      </Table>
      <span className='right_intro col'>
        <CoursePlansCollapsibleList />
      </span>
    </span>
    )
}

export default KipLinkNav
