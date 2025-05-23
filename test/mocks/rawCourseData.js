const mockRawLadokData = {
  en: {
    benamning: 'Algebra and Geometry',
    omfattning: {
      number: 7.5,
      formattedWithUnit: '7.5 credits'
    }
  },
  sv: {
    benamning: 'Algebra och geometri',
    omfattning: {
      number: 7.5,
      formattedWithUnit: '7,5 hp'
    }
  }
}

const mockLadokCourseSyllabuses = [{ kursplan: { giltigfrom: 'VT2022' } }, { kursplan: { giltigfrom: 'HT2022' } }]

module.exports = {
  mockRawLadokData,
  mockLadokCourseSyllabuses
}
