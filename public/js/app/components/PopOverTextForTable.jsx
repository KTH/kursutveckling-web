import React, { Component } from 'react'
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap'

const OnlyMobileVisiblePopup = ({ popUpHeader, id, onClick }) => {
  return (
    <span className="mobile-header-popovers" key={'onlyForMobileView' + popUpHeader + id}>
      <label>{popUpHeader}</label>{' '}
      <Button id={id} type="button" className="mobile btn-info-modal" onClick={onClick} />{' '}
    </span>
  )
}
class ControlledPopover extends Component {
  constructor(props) {
    super(props)
    this.state = { popoverOpen: false }
    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState(state => ({ popoverOpen: !state.popoverOpen }))
  }

  render() {
    const { header, popoverText, popType, targetId } = this.props
    const { popoverOpen } = this.state
    return (
      <span>
        {(popType === 'mobile' && (
          <OnlyMobileVisiblePopup popUpHeader={header} id={targetId} onClick={this.toggle} />
        )) || (
          <Button
            id={targetId}
            type="button"
            className="desktop btn-info-modal"
            onClick={this.toggle}
            aria-label="Mer information om"
            aria-describedby
          />
        )}
        <Popover
          isOpen={popoverOpen}
          trigger="legacy"
          placement="top"
          target={targetId}
          key={targetId}
          onBlur={this.toggle}
        >
          <PopoverHeader>
            {header}{' '}
            <Button className="close" onClick={this.toggle} aria-label="Close">
              &times;
            </Button>
          </PopoverHeader>
          <PopoverBody>{popoverText}</PopoverBody>
        </Popover>
      </span>
    )
  }
}

export default ControlledPopover
