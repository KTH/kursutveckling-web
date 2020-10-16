import React from 'react'

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
            <a href="/">{translation.course_programme}</a>
          </li>
        </ul>
        <ul className="nav nav-list expandable">
          <li className="nav-item leaf">
            <a aria-current="page" className="nav-link active" href="/">
              {`${translation.about_course} ${courseCode}`}
            </a>
          </li>
          <li className="nav-item leaf">
            <a className="nav-link section active" href="/">
              {translation.before_choosing_course}
            </a>
          </li>
          <li className="nav-item node">
            <a className="nav-link" href="/">
              {translation.prepare_course}
            </a>
          </li>
          {/* <li className="nav-item leaf">
            <a className="nav-link" href="/">
              Slutföra ej avklarad kurs
            </a>
          </li> */}
          <li className="nav-item node selected expanded">
            <a aria-current="page" className="nav-link active" href="/">
              {translation.course_history}
            </a>
            <ul id="leftmenu-div-1" className="nav nav-list">
              <li className="nav-item leaf">
                <a className="nav-link active" href="/">
                  {translation.archive}
                </a>
              </li>
              <li className="nav-item leaf">
                <a className="nav-link" href="/">
                  {translation.course_development}
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default ArchiveSideMenu
