import React from 'react'

const courseProgrammeLink = () => '/student/kurser/kurser-inom-program'

const aboutCourseLink = (courseCode) => `/student/kurser/kurs/${courseCode}`

const beforeChoosingCourseLink = (courseCode) => aboutCourseLink(courseCode)

const prepareCourseLink = (courseCode) => `/kurs-pm/${courseCode}`

const courseArchiveLink = (courseCode) => `/kursutveckling/${courseCode}/arkiv`

const courseDevelopmentLink = (courseCode) => `/kursutveckling/${courseCode}`

const ArchiveSideMenu = ({ translation, courseCode }) => {
  return (
    <nav
      id="mainMenu"
      aria-label={translation.sub_menu_aria_label}
      className="col navbar navbar-expand-lg navbar-light"
    >
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="nav">
          <li className="parentLink">
            <a href={courseProgrammeLink()}>{translation.course_programme}</a>
          </li>
        </ul>
        <ul className="nav nav-list expandable">
          <li className="nav-item ancestor">
            <a aria-current="page" className="nav-link active" href={aboutCourseLink(courseCode)}>
              {`${translation.about_course} ${courseCode}`}
            </a>
          </li>
          <li className="nav-item leaf">
            <a className="nav-link section active" href={beforeChoosingCourseLink(courseCode)}>
              {translation.before_choosing_course}
            </a>
          </li>
          <li className="nav-item node">
            <a className="nav-link" href={prepareCourseLink(courseCode)}>
              {translation.prepare_course}
            </a>
          </li>
          {/* <li className="nav-item leaf">
            <a className="nav-link" href="/">
              Slutföra ej avklarad kurs
            </a>
          </li> */}
          <li className="nav-item leaf">
            <a className="nav-link" href={courseDevelopmentLink(courseCode)}>
              {translation.course_development}
            </a>
          </li>
          <li className="nav-item leaf">
            <a className="nav-link active" href={courseArchiveLink(courseCode)}>
              {translation.archive}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default ArchiveSideMenu
