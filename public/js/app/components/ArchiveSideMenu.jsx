import React from 'react'

import { MainMenu } from '../components-shared/MainMenu'

const courseProgrammeLink = () => '/student/kurser/kurser-inom-program'

const aboutCourseLink = (courseCode) => `/student/kurser/kurs/${courseCode}`

const beforeChoosingCourseLink = (courseCode) => aboutCourseLink(courseCode)

const prepareCourseLink = (courseCode) => `/kurs-pm/${courseCode}`

const courseArchiveLink = (courseCode) => `/kursutveckling/${courseCode}/arkiv`

const courseDevelopmentLink = (courseCode) => `/kursutveckling/${courseCode}`

const ArchiveSideMenu = ({ translation, courseCode }) => {
  const title = `${translation.about_course} ${courseCode}`
  const ancestorItem = {
    label: translation.course_programme,
    href: courseProgrammeLink()
  }
  return (
    <MainMenu title={title} ancestorItem={ancestorItem}>
      <ul>
        <li>
          <a href={beforeChoosingCourseLink(courseCode)}>{translation.before_choosing_course}</a>
        </li>
        <li>
          <a href={prepareCourseLink(courseCode)} className="expandable">
            {translation.prepare_course}
          </a>
        </li>
        <li>
          <a href={courseDevelopmentLink(courseCode)}>{translation.course_development}</a>
        </li>
        <li>
          <a aria-current="page" href={courseArchiveLink(courseCode)}>
            {translation.archive}
          </a>
        </li>
      </ul>
    </MainMenu>
  )
}

export default ArchiveSideMenu
