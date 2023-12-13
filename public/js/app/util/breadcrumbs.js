import React from 'react'
import { Breadcrumbs } from '@kth/kth-reactstrap/dist/components/utbildningsinfo'
import { createRoot } from 'react-dom/client'

export function renderBreadcrumbsIntoKthHeader(courseCode, language) {
  const breadcrumbContainer = document.getElementById('breadcrumbs-header')
  if (breadcrumbContainer) {
    const root = createRoot(breadcrumbContainer)
    root.render(<Breadcrumbs include="aboutCourse" courseCode={courseCode} language={language} />)
  }
}
