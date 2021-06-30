import React from 'react'
import { Alert } from 'reactstrap'

const AlertMsg = ({ props = {}, translate = {}, userLang = 'en' }) => {
  const { location } = props
  const params = location
    ? location.search
        .substring(1)
        .split('&')
        .map((param) => param.split('='))
        .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {})
    : {}

  const { event: doneAction, name: courseRoundName, serv: serviceAbbr, term } = params
  if (serviceAbbr !== 'kutv') return null
  if (doneAction !== 'save' && doneAction !== 'pub' && doneAction !== 'delete') return null

  const { alertMessages, course_short_semester: courseShortSemester } = translate

  return (
    <Alert color="success" aria-live="polite">
      <h4 lang={userLang}>{alertMessages.kutv[doneAction]}</h4>
      {term && (
        <p lang={userLang}>
          {`${alertMessages.term}: ${
            courseShortSemester[term.toString().substring(4, 5)]
          } ${term.toString().substring(0, 4)}`}
        </p>
      )}
      {courseRoundName && (
        <p>{`${alertMessages.course_round}: ${decodeURIComponent(courseRoundName)}`}</p>
      )}
      {doneAction === 'save' && <p>{alertMessages.kutv.s_msg}</p>}
    </Alert>
  )
}

export default AlertMsg
