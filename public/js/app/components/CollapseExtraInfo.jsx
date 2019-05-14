import React, { Component } from 'react'
import { Collapse } from 'reactstrap'

class CollapseExtraInfo extends Component {
  constructor (props) {
    super(props)
    this.toggleHeader = this.toggleHeader.bind(this)
    this.state = {collapseExtraInfo: this.props.isOpen}
  }
  toggleHeader () {
    this.setState(state => ({collapseExtraInfo: !state.collapseExtraInfo}))
  }
  render () {
    const label = this.props.label
    return (
      <div className='card collapsible programs-list white' >
        <span className='card-header program-rubrik' role='tab' tabIndex='0' onClick={this.toggleHeader}>
          <a className='collapse-header title' id={label} aria-expanded={this.state.collapseExtraInfo} load='false' data-toggle='collapse'>{this.props.header}</a>
        </span>
        <Collapse color='white' isOpen={this.state.collapseExtraInfo} toggler={label}>
          <div className='card-body col summary'>
            <h4>Kommentar till examination</h4>
            <span className='textBlock' dangerouslySetInnerHTML={{__html: this.props.text}}></span>
            <h4>Obligatorisk inom program</h4>
            <span className='textBlock' dangerouslySetInnerHTML={{__html: this.props.text}}></span>
            <h4>Kurstillfällen som ingår</h4>
            <span className='textBlock' dangerouslySetInnerHTML={{__html: this.props.text}}></span>
            <h4>Datum för publicerad kursanalys</h4>
            <span className='textBlock' dangerouslySetInnerHTML={{__html: this.props.text}}></span>
            <p>Publicerad första gången: 2019-05-23</p>
            <p>Senaste ändrad: <i>ej ändrad efter publicering</i></p>
            <p>Kommentar tillgjorda ändringar: -</p>
          </div>
        </Collapse>
      </div>
      )
  }
  }


export default CollapseExtraInfo
