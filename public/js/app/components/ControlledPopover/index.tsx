import React, { useState, useEffect, useRef } from 'react'
import { Button, Popover, PopoverBody, PopoverHeader } from 'reactstrap'
import i18n from '../../../../../i18n'
import { useWebContext } from '../../context/WebContext'

const ControlledPopover: React.FC<{ id: string; header: string; popoverText: string }> = ({
  id,
  header,
  popoverText
}) => {
  const [popoverOpen, setPopoverOpen] = useState(false)
  const popoverRef = useRef<HTMLDivElement | null>(null)

  const togglePopover = () => setPopoverOpen((prev) => !prev)

  const [{ userLang }] = useWebContext()
  const { close_button_label: closeButtonLabel, aria_label_info_icon: ariaLabel } =
    i18n.messages[userLang === 'en' ? 0 : 1]?.analysisHeaders

  const triggerId = `popover-${id}`

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (!popoverRef.current?.contains(target) && !document.getElementById(triggerId)?.contains(target)) {
        setPopoverOpen(false);
      }
    };
  
    if (popoverOpen) document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [popoverOpen, triggerId]);

  return (
    <>
      <Button
        id={triggerId}
        className="btn-info-modal"
        onClick={togglePopover}
        aria-label={ariaLabel}
      />
      <Popover
        placement="left"
        isOpen={popoverOpen}
        target={triggerId}
        innerRef={popoverRef}
      >
        <PopoverHeader>
          {header}
          <Button className="kth-icon-button close" onClick={togglePopover} />
        </PopoverHeader>
        <PopoverBody>{popoverText}</PopoverBody>
        <div className="popover-footer">
          <Button className="kth-button secondary" onClick={togglePopover}>
            {closeButtonLabel}
          </Button>
        </div>
      </Popover>
    </>
  )
}

export default ControlledPopover
