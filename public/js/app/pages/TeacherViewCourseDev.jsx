import React, { Component } from 'react'
import { inject, observer} from 'mobx-react'
import { Button, Alert, Card, CardText, CardBody,
  CardTitle, CardFooter} from 'reactstrap'
import i18n from '../../../../i18n'

import CourseTitle from '../components/CourseTitle.jsx'

function GraphBlock ({text}) {
  return (
    <span className='textBlock' dangerouslySetInnerHTML={{__html: text}}>
    </span>
    )
}

function GraphCollapse ({header, text, label}) {
  return (
    <div className='courseInfoDevCollapse'>
      <div className='card collapsible'>
        <div className='card-header primary' role='tab' id={'headingWhite' + label} tabindex='0'>
          <h4 className='mb-0'>
            <a className='collapse-header' data-toggle='collapse' href={'#collapseWhite' + label} aria-expanded='false' aria-controls={'collapseWhite' + label}>{header}</a>
          </h4>
        </div>
        <div id={'collapseWhite' + label} className='collapse hide' role='tabpanel' aria-labelledby={'headingWhite' + label}>
          <div className='card-body  col'>
            <GraphBlock text={text} />
          </div>
        </div>
      </div>
    </div>
  )
}

@inject(['adminStore']) @observer
class TeacherViewCourseDev extends Component {
  constructor (props) {
    super(props)
    this.state = {
      lastChangedBy: this.props.adminStore.sellingTextAuthor,
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

  render () {
    const { courseAdminData } = this.props.adminStore
    const lang = courseAdminData.lang === 'en' ? 0 : 1
    const courseCode = courseAdminData.courseTitleData.course_code
    const { pageTitles, courseDevLabels } = i18n.messages[lang]

    return (
      <div key='kursinfo-container' className='kursinfo-main-page col' >
        {/* ---COURSE TITEL--- */}
        <CourseTitle key='title'
          courseTitleData={courseAdminData.courseTitleData}
          pageTitle={this.state.enteredEditMode ? pageTitles.mainPage : pageTitles.mainPage}
          language={courseAdminData.lang}
          />

        {this.state.errMsg ? <Alert color='info'><p>{this.state.errMsg}</p></Alert> : ''}

        {/* ---IF in edit mode or preview mode--- */}
        <div className='TextEditor--SellingInfo col'>
          {/* ---TEXT Editors for each language--- */}
          <p>{courseDevLabels.label_course_dev_info}</p>
          <span className='row_name'><h3>SF1624 VT 2019 </h3><p>Published: 2019-05-30 | Kursanalys: 2019-05-25 | Last changed: 2019-06-01</p></span>
          <span className='Editors--Area' key='editorsArea' role='tablist'>
            <span className='left' key='leftEditorForSwedish'>
              <Card className='KursInfo--Dev'>
                <CardBody>
                  <CardTitle>Snabbfakta</CardTitle>
                  <CardText>
                    <h4>Antal reg. studenter</h4>
                    <p>72</p>
                    <h4>Kursansvarig</h4>
                    <p>Ulf Sellgren</p>
                    <p>Ellen Bergseth</p>
                    <h4></h4>
                    <p></p>
                  </CardText>
                </CardBody>
                <CardFooter className='text-right'>
                  <Button color='primary'>Ladda ner kursanalys</Button>
                </CardFooter>
              </Card>
              </span>
              <span className='right' key='leftEditorForSwedish'>
              <Card >
                <CardBody>
                  <CardTitle>Examinationer</CardTitle>
                  <CardText>
                    <h4>Form av examination och när den utförs</h4>
                    <p>Assignments (3hp) 2016-06-07</p>
                    <p>Project (3HP) 2016-06-07</p>
                    <h4>Examinationsgrad; i % av aktiva (totalt) vid första ex-tillfället.</h4>
                    <p>84% (ÖVN1)</p>
                    <p>46% (ÖVN2)</p>
                  </CardText>
                </CardBody>
                <CardFooter className='text-right'>
                  <h4>Kommentar till examination</h4>
                  <p>Hasdjhasd asdiodhfad refakfjdv dvfgerjhqrjf</p>
                </CardFooter>
              </Card>
            </span>
            <span className='right' key='rightEditorForEnglish'>
              <Card className='KursInfo--Dev'>
                <CardBody>
                  <CardTitle>Förändringar som införs i årets kurs (exempel fr kursanalys)</CardTitle>
                  <CardText>
                    <p>Mer mekanismmodellering och toleranssättning	</p>
                    <p>Mer materil och labs	</p>
                  </CardText>
                </CardBody>
                <CardFooter className='text-right'>
                  <h4>Kommentar till anndrigar</h4>
                  <p>Hasdjhasd asdiodhfad refakfjdv dvfgerjhqrjf</p>
                </CardFooter>
              </Card>
            </span>
          </span>
          <span className='row_name'><h3>SF1624 HT 2018</h3> <p>Published: 2018-12-30 | Kursanalys: 2018-12-25 | Last changed: 2019-01-01</p></span>
          <span className='Editors--Area' key='editorsArea' role='tablist'>
            <span className='left' key='leftEditorForSwedish'>
              <Card className='KursInfo--Dev'>
                <CardBody>
                  {/* <CardTitle>Snabbfakta</CardTitle> */}
                  <CardText>
                    <h4>Antal reg. studenter</h4>
                    <p>72</p>
                    <h4>Kursansvarig</h4>
                    <p>Ulf Sellgren</p>
                    <p>Ellen Bergseth</p>
                    <h4></h4>
                    <p></p>
                  </CardText>
                </CardBody>
                <CardFooter className='text-right'>
                  <Button onClick={this.doStartSellingText} color='primary'>Ladda ner kursanalys</Button>
                </CardFooter>
              </Card>
              </span>
              <span className='right' key='leftEditorForSwedish'>
              <Card >
                <CardBody>
                  {/* <CardTitle>Examinationer</CardTitle> */}
                  <CardText>
                    <h4>Form av examination och när den utförs</h4>
                    <p>Assignments (3hp)</p>
                    <p>Project (3HP) </p>
                    <p>2016-06-07</p>
                    <h4>Examinationsgrad; i % av aktiva (totalt) vid första ex-tillfället.</h4>
                    <p>84%</p>
                  </CardText>
                </CardBody>
                <CardFooter className='text-right'>
                  <h4>Kommentar till examination</h4>
                  <p>Hasdjhasd asdiodhfad refakfjdv dvfgerjhqrjf</p>
                </CardFooter>
              </Card>
            </span>
            <span className='right' key='rightEditorForEnglish'>
              <Card className='KursInfo--Dev'>
                <CardBody>
                  <CardTitle>Förändringar som införs i årets kurs (exempel fr kursanalys)</CardTitle>
                  <CardText>
                    <p>Mer mekanismmodellering och toleranssättning	</p>
                    <p>Mer materil och labs	</p>
                    <p>Mer mekanismmodellering och toleranssättning	</p>
                    <p>Mer materil och labs	</p>
                  </CardText>
                </CardBody>
                <CardFooter className='text-right'>
                  <h4>Kommentar till anndrigar</h4>
                  <p>Hasdjhasd asdiodhfad refakfjdv dvfgerjhqrjf</p>
                </CardFooter>
              </Card>
            </span>
          </span>
          {/* PROVA TABELL VIEW */}
        </div>
      </div>
    )
  }
}

export default TeacherViewCourseDev
