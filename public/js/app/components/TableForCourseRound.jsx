import React, { Component } from 'react'
import { Table, Collapse, UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap'
import CollapseExtraInfo from './CollapseExtraInfo'
import { inject, observer} from 'mobx-react'
import { SYLLABUS_URL } from '../util/constants'

const PopoverExamItem = ({header, shortAndLongExamStrArr, id}) => {
  return (
    <UncontrolledPopover trigger='click' placement='left-start' target={id}>
      <PopoverHeader>{header}</PopoverHeader>
      <PopoverBody>
        { shortAndLongExamStrArr.map((shortAndLongTextStr, index) => <p className='popOver' key={index}>{shortAndLongTextStr[1]}</p>) }
      </PopoverBody>
    </UncontrolledPopover>
  )
}

const ActiveOrDisavledLink = ({href, linkTitle, validFrom}) => { 
  let isDisabled
  href === '#' ? isDisabled = true : isDisabled = false
  return (
    <a href={href} className='pdf-link' key={linkTitle} target='_blank'>
      {linkTitle}: {validFrom}
    </a>
  )
}

const CourseSyllabusPmAnalysLinks = ({translate, courseRoundData, storageUri, koppsData}) => {
  const analysisLink = courseRoundData.analysisFileName !== '' ? storageUri + courseRoundData.analysisFileName : '#'
  const analysisPublishedDate = courseRoundData.pdfAnalysisDate
  const syllabusRawValidFrom = koppsData.course_term_with_course_syllabus[courseRoundData.semester] 
  const syllabusLink = syllabusRawValidFrom ? `${SYLLABUS_URL}${koppsData.course_code}-${syllabusRawValidFrom}` : '#'
  const syllabusValidFrom =  `${translate.course_short_semester[syllabusRawValidFrom.toString().substring(4, 5)]} ${syllabusRawValidFrom.toString().substring(0, 4)}`

  return (
    <span className='right-links' >
      <ActiveOrDisavledLink href={syllabusLink} linkTitle={translate.link_syllabus} validFrom={syllabusValidFrom} />
      <ActiveOrDisavledLink href='https://kth.box.com/s/i9xu34n5conqdoj7re81bmcto20wavib' linkTitle={translate.link_pm} validFrom='2019-05-20' />
      <ActiveOrDisavledLink href={analysisLink} linkTitle={translate.link_analysis} validFrom={analysisPublishedDate} />
    </span>
  )
}

@inject(['adminStore']) @observer
class TableForCourseRound extends Component {
  constructor (props) {
    super(props)
    this.toggleRound = this.toggleRound.bind(this)
    this.getShortAndLongStrForEachExam = this.getShortAndLongStrForEachExam.bind(this)
    this.state = {collapse: true}
  }

  toggleRound () {
    this.setState(state => ({collapse: !state.collapse}))
  }

  getShortAndLongStrForEachExam (examinationRoundsArr) {
    let shortAndLongExamStrArr = []
    if (examinationRoundsArr && examinationRoundsArr.length > 0) {
      shortAndLongExamStrArr = examinationRoundsArr.map(row => {
        let examInfoArr = row.trim().split(';')
        let shortStr = `${examInfoArr[0]} (${examInfoArr[2]}) ${examInfoArr[5]}` || ''
        let longStr = `${examInfoArr[0]} - ${examInfoArr[1]},  ${examInfoArr[2]} ${examInfoArr[3]}, ${examInfoArr[4]}: ${examInfoArr[5]}` || ''
        return [shortStr, longStr]
      })
    }
    return shortAndLongExamStrArr
  }

  render () {
    const courseRoundData = this.props.courseRoundObj
    console.log('courseRoundData', courseRoundData)
    const translate = this.props.translate
    const popOverId = 'exam' + this.props.courseAnalysDataId // Examination expandera
    //TODO: what to do if no analys or syllabus is available?
    const shortAndLongExamStrArr = this.getShortAndLongStrForEachExam(courseRoundData.examinationRounds)

    return (
      <div className='card collapsible blue table-for-round'>
        <span className='table-title card-header' role='tab' tabIndex='0' onClick={this.toggleRound}>
          <a id={this.props.courseAnalysDataId} aria-expanded={this.state.collapse} load='false'>{translate.header_course_round}: {courseRoundData.analysisName}</a>
        </span>
        {/*  */}
        <Collapse isOpen={this.state.collapse} toggler={'#' + this.props.courseAnalysDataId}>
          <CourseSyllabusPmAnalysLinks translate={translate} courseRoundData={courseRoundData} storageUri={this.props.adminStore.browserConfig.storageUri} koppsData={this.props.adminStore.courseKoppsData}/>
          <Table responsive>
            <thead>
              <tr>
                <th>{translate.header_responsibles}</th>
                <th>{translate.header_examiners}</th>
                <th alt='Antal reg studenter'>{translate.header_registrated}</th>
                <th>{translate.header_examination}</th>
                <th alt='; i % av aktiva (totalt) vid första ex-tillfället Examinationsgrad'>{translate.header_examination_grade}</th>
                <th>{translate.header_course_changes_comment}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='teacher-cell'>
                  <p>{courseRoundData.responsibles}</p>
                </td>
                <td className='teacher-cell'>
                  <p>{courseRoundData.examiners}</p>
                </td>
                <td className='students-cell'>{courseRoundData.registeredStudents}</td>
                <td className='exam-cell' id={popOverId}>
                  {shortAndLongExamStrArr.map((shortAndLongTextStr, index) => <p key={index}>{shortAndLongTextStr[0]}</p>)}
                  <p><i>{translate.popover_more}</i></p>
                </td>
                <td className='result-cell'>
                  <p>{courseRoundData.examinationGrade} %</p>
                </td>
                <td>
                  <p>{courseRoundData.alterationText}</p>
                </td>
              </tr>
            </tbody>
          </Table>
          <CollapseExtraInfo header={translate.header_more_info} courseRoundData={courseRoundData}
            label={this.props.courseAnalysDataId} translate={translate}
          />
        </Collapse>
        <PopoverExamItem header={translate.header_examination} shortAndLongExamStrArr={shortAndLongExamStrArr} id={popOverId} />
      </div>
      ) }
  }

export default TableForCourseRound
