import React, { useState } from 'react'
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap'
import i18n from '../../../../i18n'

const OnlyMobileVisiblePopup = ({ ariaLabel, ariaPressed, popUpHeader, id, onClick }) => {
  const mobilePopoverId = 'mobile-table-header' + popUpHeader + id
  return (
    <span
      className="mobile-header-popovers"
      key={'onlyForMobileView' + popUpHeader + id}
      role="dialog"
      aria-labelledby={mobilePopoverId}
    >
      <label id={mobilePopoverId} className="d-sm-block d-md-none">
        {popUpHeader}
      </label>{' '}
      <Button
        id={id}
        type="button"
        className="mobile btn-info-modal"
        onClick={onClick}
        aria-label={ariaLabel}
        aria-pressed={ariaPressed}
      >
        <span className="visually-hidden">{ariaLabel}</span>
      </Button>
    </span>
  )
}
function ControlledPopover(props) {
  const [popoverOpen, setPopoverOpen] = useState(false)

  function toggle() {
    setPopoverOpen(!popoverOpen)
  }

  const { cellId, header, popoverText, popType } = props
  const triggerId = `${popType}-popover-${cellId}`
  const dialogHeaderId = `${popType}-dialog-header-${cellId}`
  const dialogBodyId = `${popType}-dialog-header-${cellId}`
  const tableLang = i18n.isSwedish() ? 1 : 0
  const { aria_label_info_icon: ariaLabel, aria_label_close_icon: closeAria } = i18n.messages[tableLang].tableHeaders

  return (
    <span role="dialog" aria-labelledby={dialogHeaderId} aria-describedby={dialogBodyId}>
      <PopoverButton
        popType={popType}
        header={header}
        triggerId={triggerId}
        toggle={toggle}
        ariaLabel={ariaLabel}
        popoverOpen={popoverOpen}
      />
      <Popover
        isOpen={popoverOpen}
        placement={popType === 'mobile' ? 'left' : 'top'}
        target={triggerId}
        key={triggerId}
      >
        <PopoverHeaderWithCloseButton id={dialogHeaderId} toggle={toggle} closeAria={closeAria}>
          {header}
        </PopoverHeaderWithCloseButton>
        <PopoverBody id={dialogBodyId}>{popoverText}</PopoverBody>
      </Popover>
    </span>
  )
}

const PopoverButton = ({ popType, header, triggerId, toggle, ariaLabel, popoverOpen }) => {
  if (popType === 'mobile') {
    return (
      <OnlyMobileVisiblePopup
        popUpHeader={header}
        id={triggerId}
        onClick={toggle}
        ariaLabel={ariaLabel}
        ariaPressed={popoverOpen}
      />
    )
  }
  return (
    <Button
      id={triggerId}
      type="button"
      className="desktop btn-info-modal"
      onClick={toggle}
      aria-label={ariaLabel}
      aria-pressed={popoverOpen}
    >
      <span className="visually-hidden">{ariaLabel}</span>
    </Button>
  )
}

const PopoverHeaderWithCloseButton = ({ id: dialogHeaderId, children, toggle, closeAria }) => {
  return (
    <PopoverHeader id={dialogHeaderId}>
      <span>{children}</span>
      <button className="kth-icon-button close" onClick={toggle} aria-label={closeAria} />
    </PopoverHeader>
  )
}

export default ControlledPopover
