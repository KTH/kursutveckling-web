module.exports = {
  shortNames: ['sv', 'se'],
  longNameSe: 'Svenska',
  longNameEn: 'Swedish',
  messages: {
    /**
     * General stuff
     */
    date_format_short: '%Y-%m-%d',

    /**
     * Error messages
     */

    error_not_found: 'Tyvärr kunde vi inte hitta sidan du söker',
    error_generic: 'Något gick fel på servern, var god försök igen senare',

    /**
     * Message keys
     */
    service_name: 'Kursens utveckling och historik web',
    title: 'Kursens utveckling och historik',
    description:
      'På denna sida publicerar kursansvariga kursdata och kursanalyser. Här kan presumtiva, nuvarande och tidigare studenter ta del av informationen till hjälp vid kursval eller för att följa upp sitt eget deltagande i kursvärderingar. Lärare, kursansvariga, examinatorer m.fl. kan använda sidan som ett stöd vid kursutveckling.',

    example_message_key: 'Här är en svensk översättning på en label',
    button_label_example: 'Klicka här för att skicka data till servern!',
    field_text_example: 'Data att skicka till API',

    field_label_get_example: 'Min datamodell(Svar från api anrop GET): ',
    field_label_post_example: 'Min datamodell(Svar från api anrop POST): ',

    lang_block_id: '1.272446',
    locale_text: 'Denna sida på svenska',

    site_name: 'Kursutvecklingsinformation',
    skip_to_main_content: 'Hoppa till huvudinnehållet',
    host_name: 'KTH',
    page_about_course: 'Om kursen',
    page_course_programme: 'Kurs- och programkatalogen',
    page_student: 'Student på KTH',

    archiveTitles: {
      archive: 'Arkiv',
      about_course: 'Om kursen',
      sub_menu_aria_label: 'Undermeny',
      course_programme: 'Kurs- och programkatalogen',
      before_choosing_course: 'Inför kursval',
      prepare_course: 'Förbereda och gå kurs',
      course_development: 'Kursens utveckling',
      administration: 'Administrera Om kursen',
      label_syllabus: 'Kursplan',
      label_syllabuses: 'Kursplaner',
      label_semesters: 'Terminer',
      course_short_semester: {
        1: 'VT',
        2: 'HT'
      },
      ongoing_label: 'tillsvidare',
      label_memos: 'Kurs-PM',
      label_course_offering: 'Kursomgång',
      label_memo: 'Kurs-PM',
      label_version: 'Ver',
      label_latest_version: 'senaste versionen',
      no_syllabuses: 'Denna kurs saknar godkänd kursplan.',
      no_memos: 'Denna kurs har inga publicerade kurs-PM.',
      no_analyses: 'Denna kurs har inga publicerade kursanalyser.',
      label_analyses: 'Kursanalyser',
      label_analysis: 'Kursanalys',
      analysis_table_heading1: 'Kursomgång',
      analysis_table_heading2: 'Kursanalys'
    }
  },
  tableHeaders: {
    info_manually_edited: 'Kursdata har registrerats manuellt',
    header_main_publish_new: 'Publicera ny kursanalys och kursdata (för kursansvarig)',
    aria_label_close_icon: 'Stäng',
    aria_label_info_icon: 'Mer information',
    table_headers_with_popup: {
      examiners: {
        header: 'Examinator',
        popoverText: 'Examinator för kurs vid gällande kursomgång. Examinatorer administreras i Kopps.'
      },
      examRounds: {
        header: 'Examination',
        popoverText:
          'Form av examination vid gällande kursomgång enligt format: examinationsmodul, högskolepoäng, betygsskala. Se detaljer om Examination på sidan Inför kursval.'
      },
      alterationText: {
        header: 'Förändringar som har införts till den här kursomgången',
        popoverText:
          'Summerade förändringar som har införts till den här kursomgången. Syftet med att publicera förändringar som infördes till kursen innan kursomgångens start är att visa på hur kursen förbättras och utvecklas över tid. Kursomgångarnas alla dokumenterade förändringar visar på vilka utvecklingssteg kursen har genomgått.'
      },
      examinationGrade: {
        header: 'Resultat',
        popoverText:
          'Examinationsgrad är antal förstagångsregistrerade studenter som godkänts på hela kursomgången efter första examinationstillfället efter kursomgångensslut dividerat med antal förstagångsregistrerade på kursomgången. Examinationsgrad redovisas inte för respektive delmoment i examinationen. Examinationsgrad beräknas inte heller om efter efterföljande omtentor.'
      },
      responsibles: {
        header: 'Kursansvarig',
        popoverText:
          'Samtliga kursansvariga för de kurstillfällen som ingår i kursomgången. Kursansvariga administreras i Kopps.'
      },
      registeredStudents: {
        header: 'Studenter',
        popoverText:
          'Antal förstagångsregistrerade på de kurstillfällen som ingår i kursomgången. Studenter som antagits men som inte registrerats ska inte räknas in. Inte heller registrerade studenter som omregistrerats från ett annat kurstillfälle på samma kurs ska räknas in.'
      }
    },
    extra_kopps_info: {
      no_added: 'Ingen information tillagd',
      commentExam: {
        header: 'Kommentar till examination',
        popoverText: 'Kommentar till form av examination vid gällande kursomgång.'
      },
      programmeCodes: { header: 'Obligatorisk inom program', popoverText: '' },
      analysisName: {
        header: 'Kursanalysen gäller för följande kursomgångar',
        popoverText:
          'Alla kurstillfällen som ingick i kursomgången. Studenter är antagna till ett kurstillfälle. Programstudenter, betalande studenter och fristående studenter antas till olika kurstillfällen men kan utbildas i samma kursomgång. Kurstillfällen ska alltså grupperas ihop till en kursomgång. Kursomgången är ett praktiskt genomförande av en kurs. Kursomgången har en gemensam starttidpunkt, gemensam kurstakt och normalt gemensam undervisning för en studentgrupp. Schemat läggs per kursomgång, kurs-PM utformas per kursomgång och kursanalys genomförs per kursomgång.'
      }
    },
    extra_dates_and_comments: {
      no_added: 'Ingen information tillagd',
      publishedDate: 'Publicerad första gången',
      changedAfterPublishedDate: 'Senaste ändrad',
      commentChange: 'Kommentar till gjorda ändringar',
      no_date_last_changed: 'ej ändrad efter publicering',
      page_lang: 'sv'
    },
    header_more_info: 'Ytterligare data om kursanalysen',
    link_analysis: { label_analysis: 'Kursanalys', no_added_doc: 'Ingen kursanalys tillagd' },
    link_memo: { label_memo: 'Kurs-PM', no_added_doc: 'Inget kurs-PM tillagt' },
    no_course_analys: 'När kursanalysen är publicerad visas kursdata, kurs-PM och kursplan.',
    no_pdf_document: 'inga är upphittade',
    course_short_semester: {
      1: 'VT ',
      2: 'HT '
    }
  },
  pageTitles: {
    about_course: 'Om kursen',
    course_admin_title: 'Administrera Om kursen',
    course_dev_title: 'Kursens utveckling',
    course_info_title: 'Kursinformation',
    regulated_link: '”Riktlinje om kursvärdering och kursanalys”. ',
    info_text: {
      0: '',
      1: 'På denna sida ska kursansvarig eller examinator publicera kursanalyser med kursdata för en kursomgång. Detta regleras av ',
      2: 'När kursanalysen är publicerad visas kursdata, kurs-PM och kursplan.',
      3: 'Presumtiva, nuvarande, och tidigare studenter kan ta del av informationen som hjälp vid kursval, eller för att följa upp sitt eget deltagande. Lärare, kursansvariga, examinatorer m.fl. kan använda sidan som ett stöd vid kursutveckling.'
    },
    label_syllabus_link: 'Kursplan',
    course_short_semester: {
      1: 'VT ',
      2: 'HT '
    },
    altLabel: {
      start_link_back: 'Till kursinformationssida',
      button_cancel: 'Avbryt och gå till admin startsida'
    }
  }
}
