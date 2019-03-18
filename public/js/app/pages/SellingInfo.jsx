import { Component } from 'inferno'
import { inject, observer } from 'inferno-mobx'
import i18n from '../../../../i18n'

import CourseTitle from '../components/CourseTitle.jsx'
import Button from 'inferno-bootstrap/lib/Button'
import Alert from 'inferno-bootstrap/lib/Alert'
import {Link} from 'inferno-router'
import Row from 'inferno-bootstrap/dist/Row'
import Col from 'inferno-bootstrap/dist/Col'

function TextBlock ({text}) {
  return (
    <span className='textBlock' dangerouslySetInnerHTML={{__html: text}}>
    </span>
    )
}

function KoppsText ({header, text, label}) {
  return (
    <div className='courseIntroTextCollapse'>
      <div className='card collapsible'>
        <div className='card-header primary' role='tab' id={'headingWhite' + label} tabindex='0'>
          <h4 className='mb-0'>
            <a className='collapse-header' data-toggle='collapse' href={'#collapseWhite' + label} aria-expanded='false' aria-controls={'collapseWhite' + label}>{header}</a>
          </h4>
        </div>
        <div id={'collapseWhite' + label} className='collapse hide' role='tabpanel' aria-labelledby={'headingWhite' + label}>
          <div className='card-body  col'>
            <TextBlock text={text} />
          </div>
        </div>
      </div>
    </div>
  )
}

@inject(['adminStore']) @observer
class SellingInfo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      sellingText_sv: this.props.adminStore.sellingText.sv,
      sellingText_en: this.props.adminStore.sellingText.en,
      sellingTextAuthor: this.props.adminStore.sellingTextAuthor,
      leftTextSign_sv: undefined,
      leftTextSign_en: undefined,
      enteredEditMode: true,
      hasDoneSubmit: false,
      isError: false,
      errMsg: ''
    }
    this.doChangeText = this.doChangeText.bind(this)
    this.doPreview = this.doPreview.bind(this)
  }

  doChangeText (event) {
    event.preventDefault()
    this.setState({
      hasDoneSubmit: false,
      enteredEditMode: true,
      isError: false
    })
  }

  doPreview (event) {
    event.preventDefault()
    this.setState({
      enteredEditMode: false,
      isError: false
    })
  }

  render ({adminStore}) {
    const courseAdminData = adminStore['courseAdminData']
    const lang = courseAdminData.lang === 'en' ? 0 : 1
    const courseCode = courseAdminData.courseTitleData.course_code
    const translation = i18n.messages[lang]
    const pageTitles = translation.pageTitles
    const sellingTextLabels = translation.sellingTextLabels

    return (
      <div key='kursinfo-container' className='kursinfo-main-page col' >
        {/* ---COURSE TITEL--- */}
        <CourseTitle key='title'
          courseTitleData={courseAdminData.courseTitleData}
          pageTitle={this.state.enteredEditMode ? pageTitles.editSelling : pageTitles.previewSelling}
          language={courseAdminData.lang}
          />

        {this.state.errMsg ? <Alert color='info'><p>{this.state.errMsg}</p></Alert> : ''}

        {/* ---IF in edit mode or preview mode--- */}
        {this.state.enteredEditMode ? (
          <div className='TextEditor--SellingInfo col'>
            {/* ---TEXT Editors for each language--- */}
            <p>{sellingTextLabels.label_selling_info}</p>
            <span class='Editors--Area' key='editorsArea' role='tablist'>
              <span className='left' key='leftEditorForSwedish'>
                <h3 className='text-center'>{sellingTextLabels.label_sv}</h3>
                <KoppsText header={sellingTextLabels.label_kopps_text_sv} text={courseAdminData.koppsCourseDesc['sv']} label='sv' />
                <p>{sellingTextLabels.label_max_number_letters}</p>
                <p>{sellingTextLabels.label_left_number_letters}<span className='badge badge-warning badge-pill'>{this.state.leftTextSign_sv}</span></p>
                <textarea name='editorSV' id='editorSV' className='editor'>{this.state.sellingText_sv}</textarea>
              </span>
              <span className='right' key='rightEditorForEnglish'>
                <h3 className='text-center'>{sellingTextLabels.label_en}</h3>
                <KoppsText header={sellingTextLabels.label_kopps_text_en} text={courseAdminData.koppsCourseDesc['en']} label='en' />
                <p>{sellingTextLabels.label_max_number_letters}</p>
                <p>{sellingTextLabels.label_left_number_letters}<span className='badge badge-warning badge-pill'>{this.state.leftTextSign_en}</span></p>
                <textarea name='editorEN' id='editorEN' className='editor'>{this.state.sellingText_en}</textarea>
              </span>
            </span>
            <p>{sellingTextLabels.changed_by} {this.state.sellingTextAuthor}</p>
            <span className='button_group' key='controlButtons'>
              <Link to={`/kursutveckling/${courseCode}?l=${courseAdminData.lang}`} className='btn btn-secondary' alt={sellingTextLabels.altLabel.button_cancel}>
                {sellingTextLabels.sellingTextButtons.button_cancel}
              </Link>
              <Button onClick={this.doPreview} color='primary' alt={sellingTextLabels.altLabel.button_preview} disabled={this.state.isError}>{sellingTextLabels.sellingTextButtons.button_preview}</Button>
            </span>
          </div>
        ) : (
          <Row id='pageContainer' key='pageContainer'>
          </Row>
        )}
      </div>
    )
  }
}

export default SellingInfo
