const mockRawKoppsData = {
  en: {
    course: {
      title: 'Algebra and Geometry',
      courseCode: 'SF1624',
      departmentCode: 'SF',
      department: {
        name: 'SCI/Mathematics',
        code: 'SF'
      },
      credits: 7.5,
      creditUnitLabel: 'Credits',
      creditUnitAbbr: 'hp'
    },
    publicSyllabusVersions: [
      {
        validFromTerm: {
          term: 20192
        }
      },
      {
        validFromTerm: {
          term: 20102
        }
      },
      {
        validFromTerm: {
          term: 20092
        }
      },
      {
        validFromTerm: {
          term: 20082
        }
      }
    ]
  },
  sv: {
    course: {
      title: 'Algebra och geometri',
      courseCode: 'SF1624',
      departmentCode: 'SF',
      department: {
        name: 'SCI/Matematik',
        code: 'SF'
      },
      credits: 7.5,
      creditUnitLabel: 'Högskolepoäng',
      creditUnitAbbr: 'hp'
    },
    publicSyllabusVersions: [
      {
        validFromTerm: {
          term: 20192
        }
      },
      {
        validFromTerm: {
          term: 20102
        }
      },
      {
        validFromTerm: {
          term: 20092
        }
      },
      {
        validFromTerm: {
          term: 20082
        }
      }
    ]
  }
}
const mockRawLadokData = {
  en: {
    benamning: 'Algebra and Geometry',
    omfattning: '7.5'
  },
  sv: {
    benamning: 'Algebra och geometri',
    omfattning: '7.5'
  }
}

module.exports = {
  mockRawKoppsData,
  mockRawLadokData
}
