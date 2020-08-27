import React, { Component } from 'react'
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap'
import i18n from '../../../../i18n'

const OnlyMobileVisiblePopup = ({ ariaLabel, popUpHeader, id, onClick }) => {
  return (
    <span
      className="mobile-header-popovers"
      key={'onlyForMobileView' + popUpHeader + id}
      role="info icon button"
      aria-labelledby="mobile-table-header"
    >
      <label id="mobile-table-header">{popUpHeader}</label>{' '}
      <Button
        id={id}
        type="button"
        className="mobile btn-info-modal"
        onClick={onClick}
        aria-label={ariaLabel}
        role="info icon"
      />{' '}
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
    const { describesId, header, popoverText, popType, targetId } = this.props
    const { popoverOpen } = this.state
    const tableLang = i18n.isSwedish() ? 1 : 0
    const { aria_label_info_icon: ariaLabel, aria_label_close_icon: closeAria } = i18n.messages[
      tableLang
    ].tableHeaders

    return (
      <span role="popover" role="info icon button" aria-labelledby={targetId}>
        {(popType === 'mobile' && (
          <OnlyMobileVisiblePopup
            popUpHeader={header}
            id={targetId}
            onClick={this.toggle}
            ariaLabel={ariaLabel}
          />
        )) || (
          <Button
            id={targetId}
            type="button"
            className="desktop btn-info-modal"
            onClick={this.toggle}
            aria-label={ariaLabel}
          />
        )}
        <Popover
          isOpen={popoverOpen}
          placement={popType === 'mobile' ? 'left' : 'top'}
          target={targetId}
          key={targetId}
          onBlur={this.toggle}
        >
          <PopoverHeader>
            {header}{' '}
            <Button className="close" onClick={this.toggle} aria-label={closeAria}>
              &times;
            </Button>
          </PopoverHeader>
          <PopoverBody id={describesId}>{popoverText}</PopoverBody>
        </Popover>
      </span>
    )
  }
}

export default ControlledPopover
