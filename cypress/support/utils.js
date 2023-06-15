export const isMobile = () => Cypress.config('viewportWidth') < Cypress.env('mobileViewportWidthBreakpoint')
