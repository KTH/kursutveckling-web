export interface KoppsCourseData {
  koppsDataLang: 'sv' | 'en'
  syllabusPeriods: SyllabusPeriods
}

export interface SyllabusPeriods extends Record<string, { endDate: string }> {}
