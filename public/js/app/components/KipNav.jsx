import React from 'react'
import { Table } from 'reactstrap'
import SyllabusListInCollapse from './SyllabusListInCollapse'
import { KURSINFO_ADMIN_URL, COURSE_INFO_URL } from '../util/constants'

const KipLinkNav = ({ courseCode, translate, lang }) => {
  // courseCode, lang, startCards
  const kursOmLink = `${COURSE_INFO_URL}${courseCode}?l=${lang}`
  const kursAdmin = `${KURSINFO_ADMIN_URL}${courseCode}?l=${lang}`
  return (
    <nav className="navigation row">
      <Table className="kip-menu">
        <tbody>
          <tr>
            <td colSpan="2">
              <h4>{translate.about_course}</h4>
              <p>
                <a href={kursOmLink} aria-label={translate.aria_label_course_info_title}>
                  {translate.course_info_title}
                </a>
              </p>
              <p>
                <b>{translate.course_dev_title}</b>
              </p>
            </td>
            <td className="admin-link">
              <p>
                <a
                  href={kursAdmin}
                  className="link-to"
                  aria-label={translate.aria_label_course_admin_title}
                >
                  {translate.course_admin_title}
                </a>
              </p>
            </td>
          </tr>
        </tbody>
      </Table>
      <span className="right_intro col">
        <SyllabusListInCollapse translate={translate} lang={lang} />
      </span>
    </nav>
  )
}

export default KipLinkNav
