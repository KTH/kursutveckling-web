import React, { Component } from 'react'
import { Collapse, Table } from 'reactstrap'

const GrayTextBlock = ({header, text}) => {
  return (
        <Table responsive>
          <tbody>
            <tr>
              <td colSpan='6' dangerouslySetInnerHTML={{__html: text}}>
              </td>
            </tr>
          </tbody>
        </Table>
    )
}

class CollapseExtraInfo extends Component {
  constructor (props) {
    super(props)
    this.toggleHeader = this.toggleHeader.bind(this)
    this.state = {collapseProgram: this.props.isOpen}
  }
  toggleHeader () {
    this.setState(state => ({collapseProgram: !state.collapseProgram}))
  }
  render () {
    const label = this.props.label
    return (
        <div className='card collapsible programs-list white' >
          <span className='card-header program-rubrik' role='tab' tabIndex='0' onClick={this.toggleHeader}>
              <a className='collapse-header title' id={'programHeading' + label} aria-expanded={this.state.collapseProgram} load='false' data-toggle='collapse' href={'#collapsePrograms' + label} aria-controls={'collapsePrograms' + label}>{this.props.header}</a>
          </span>
          <Collapse color='white' isOpen={this.state.collapseProgram} toggler={'#programHeading' + label}>
            <div className='card-body col summary'>
              {this.props.grayTextBlock
              ? <GrayTextBlock text={this.props.text} />
              : <span className='textBlock' dangerouslySetInnerHTML={{__html: this.props.text}}></span>
              }
            </div>
          </Collapse>
        </div>
      )
  }
  }


export default CollapseExtraInfo
