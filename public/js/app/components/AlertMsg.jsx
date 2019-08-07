import React from 'react'
import { Alert } from 'reactstrap'
import { KTH_SE_URL, COURSE_UTVECKLING } from '../util/constants'

const AlertMsg = ({props, courseCode, translate, lang}) => {
  const params = props.location.search.substring(1).split('&')
        .map(param => param.split('='))
        .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {})
  console.log('this.propsdsdasda', props.location)

  return (
    params.serv === 'kutv' && params.term && params.name
        ? params.event === 'save' || params.event === 'pub' || params.event === 'delete'
            ? <Alert color='success' aria-live='polite'>
              <h4>{translate.alertMessages['kutv'][params.event]}</h4>
              <p>{translate.alertMessages.term}: {translate.course_short_semester[params.term.toString().substring(4, 5)]}
                {params.term.toString().substring(0, 4)}
              </p>
              <p>{translate.alertMessages.course_round}: {decodeURIComponent(params.name)}</p>
              {params.event === 'save'
                ? <p>{translate.alertMessages.kutv.s_msg}</p>
                : ''
              }
            </Alert>
            : ''
        : ''
    )
}

export default AlertMsg
