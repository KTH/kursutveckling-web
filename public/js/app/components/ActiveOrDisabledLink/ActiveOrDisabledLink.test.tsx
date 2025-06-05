import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import ActiveOrDisabledLink from './index'

describe('ActiveOrDisabledLink', () => {
  it('renders an active link with the correct href and title', () => {
    const href = 'https://example.com'
    const linkTitle = 'Active Link'
    const isPdf = false

    render(<ActiveOrDisabledLink href={href} linkTitle={linkTitle} isPdf={isPdf} />)

    const linkElement = screen.getByText(linkTitle)

    expect(linkElement.tagName).toBe('A')
    expect(linkElement).toHaveAttribute('href', href)
    expect(linkElement).toHaveAttribute('title', linkTitle)
  })

  it('renders a disabled link as a span with italic text', () => {
    const linkTitle = 'Disabled Link'
    render(<ActiveOrDisabledLink linkTitle={linkTitle} disabled />)

    const italicElement = screen.getByText(linkTitle)
    expect(italicElement.tagName).toBe('I')

    const spanElement = italicElement.parentElement

    expect(spanElement.tagName).toBe('SPAN')
    expect(spanElement).toHaveClass('disabled-link')
  })

  describe('when PDF is true', () => {
    it('sets prefixed linkTitle as aria-label if no ariaLabel is given', () => {
      const href = '/file.pdf'
      const linkTitle = 'PDF File'
      render(<ActiveOrDisabledLink href={href} linkTitle={linkTitle} isPdf />)

      const linkElement = screen.getByText(linkTitle)
      expect(linkElement).toHaveAttribute('aria-label', `PDF ${linkTitle}`)
    })

    it('sets prefixed ariaLabel as aria-label', () => {
      const href = '/file.pdf'
      const linkTitle = 'PDF File'
      render(<ActiveOrDisabledLink href={href} linkTitle={linkTitle} isPdf />)

      const linkElement = screen.getByText(linkTitle)
      expect(linkElement).toHaveAttribute('aria-label', `PDF ${linkTitle}`)
    })

    it('sets target and rel attributes for PDF links', () => {
      const href = '/file.pdf'
      const linkTitle = 'PDF File'
      render(<ActiveOrDisabledLink href={href} linkTitle={linkTitle} isPdf />)

      const linkElement = screen.getByText(linkTitle)
      expect(linkElement).toHaveAttribute('target', '_blank')
      expect(linkElement).toHaveAttribute('rel', 'noreferrer')
    })

    it('applies "pdf-link" class for PDF links', () => {
      const href = '/file.pdf'
      const linkTitle = 'PDF File'
      render(<ActiveOrDisabledLink href={href} linkTitle={linkTitle} isPdf />)

      const linkElement = screen.getByText(linkTitle)
      expect(linkElement).toHaveClass('pdf-link')
    })

    it('combines custom class with "pdf-link" class', () => {
      const href = '/file.pdf'
      const linkTitle = 'PDF File'
      render(<ActiveOrDisabledLink href={href} linkTitle={linkTitle} isPdf />)

      const linkElement = screen.getByText(linkTitle)
      expect(linkElement).toHaveClass('pdf-link')
      expect(linkElement).toHaveClass('link')
    })
  })

  describe('when PDF is false', () => {
    it('does not set linkTitle as aria-label if no ariaLabel is given', () => {
      const href = '/file'
      const linkTitle = 'Regular File'
      render(<ActiveOrDisabledLink href={href} linkTitle={linkTitle} />)

      const linkElement = screen.getByText(linkTitle)
      expect(linkElement).not.toHaveAttribute('aria-label')
    })

    it('does set aria-label if ariaLabel is provided', () => {
      const href = '/file'
      const linkTitle = 'Regular File'
      const ariaLabel = 'Custom Label'
      render(<ActiveOrDisabledLink href={href} linkTitle={linkTitle} ariaLabel={ariaLabel} />)
      const linkElement = screen.getByText(linkTitle)
      expect(linkElement).toHaveAttribute('aria-label', ariaLabel)
    })

    it('does not set target and rel attributes', () => {
      const href = '/file'
      const linkTitle = 'Regular File'
      render(<ActiveOrDisabledLink href={href} linkTitle={linkTitle} />)

      const linkElement = screen.getByText(linkTitle)
      expect(linkElement).not.toHaveAttribute('target')
      expect(linkElement).not.toHaveAttribute('rel')
    })
  })

  it('renders with className "link" even if none is provided', () => {
    const href = '/default'
    const linkTitle = 'Default Class Link'
    render(<ActiveOrDisabledLink href={href} linkTitle={linkTitle} />)

    const linkElement = screen.getByText(linkTitle)
    expect(linkElement).toHaveClass('link')
  })
})
