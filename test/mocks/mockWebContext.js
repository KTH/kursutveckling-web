import mockedMiniMemosPdfAndWeb from '../mocks/mockMiniMemos'

const mockWebContext = (lang = 'en') => {
  const context = {
    userLang: lang,
    courseCode: 'EI1220',
    courseData: {
      courseCode: 'EI1220',
      courseTitle: lang === 'en' ? 'Algebra and Geometry' : 'Algebra och geometri',
      syllabusPeriods: {
        20082: { endDate: 20091 },
        20092: { endDate: 20101 },
        20102: { endDate: 20191 },
        20192: { endDate: '' }
      },
      courseDataLang: lang
    },
    browserConfig: {
      env: 'dev',
      hostUrl: 'https://localhost:3000',
      port: 3000,
      proxyPrefixPath: { uri: '/kursinfoadmin/kursutveckling' },
      storageUri: 'https://kursinfostoragestage/kursutveckling-blob-container/',
      memoStorageUri: 'https://kursinfostoragestage.blob.core.windows.net/memo-blob-container/',
      useSsl: false
    },
    ...mockedMiniMemosPdfAndWeb
  }

  return context
}

export default mockWebContext
