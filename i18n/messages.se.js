module.exports = {
  shortNames: [ 'sv', 'se' ],
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
    service_name: 'Kursutveckling-web',

    example_message_key: 'Här är en svensk översättning på en label',

    button_label_example: 'Klicka här för att skicka data till servern!',

    field_text_example: 'Data att skicka till API',

    field_label_get_example: 'Min datamodell(Svar från api anrop GET): ',
    field_label_post_example: 'Min datamodell(Svar från api anrop POST): ',

    lang_block_id: '1.272446',
    locale_text: 'Kursutvecklingsinformation på svenska',

    site_name: 'Kursutvecklingsinformation',
    host_name: 'KTH',
    page_student: 'STUDENT PÅ KURSUTVECKLING',
    page_teacher: 'LÄRARE PÅ KURSUTVECKLING',
    page_course_programme: 'KURS- OCH PROGRAMKATALOGEN'
  },
  tableHeaders: {
    header_main_edit: 'Ändra (behörighetsstyrning)',
    header_main_publish_new: 'Publicera ny kursanalys och kursdata (behörighetsstyrning)',
    header_course_round: 'Kursomgång',
    alt_header_main_publish_new: 'Gå till adminsida för att Publicera ny kursanalys och kursdata',
    alt_header_main_edit: 'Gå till adminsida för att andra den kursanalysen och kursdata edit this course analysis with course data',
    alt_link_syllabus: 'Till gällande Kursplan',
    alt_link_analysis: 'Till gällande Kursanalys',
    alt_link_pm: 'Till gällande Kurs-PM',
    table_headers_with_popup: {
      examiners: {header: 'Examinator', popoverText: 'Examinator för kurs vid gällande kursomgång. Examinatorer administreras i Kopps.'},
      examShortAndLongStrArr: {header: 'Examination', popoverText: 'Form av examination vid gällande kursomgång.'},
      alterationText: {header: 'Förändringar som har införts till den här kursomgången', popoverText: 'Summerade förändringar som har införts till den här kursomgången.'},
      examinationGrade: {header: 'Resultat', popoverText: 'Examinationsgrad är antal förstagångsregistrerade studenter som godkänts på hela kursomgången efter första examinationstillfället efter kursomgångensslut dividerat med antal förstagångsregistrerade på kursomgången. Examinationsgrad redovisas inte för respektive delmoment i examinationen. Examinationsgrad beräknas inte heller om efter efterföljande omtentor.'},
      responsibles: {header: 'Kursansvarig', popoverText: 'Samtliga kursansvariga för de kurstillfällen som ingår i kursomgången. Kursansvariga administreras i Kopps.'},
      registeredStudents: {header: 'Studenter', popoverText: 'Antal förstagångsregistrerade på de kurstillfällen som ingår i kursomgången. Studenter som antagits men som inte registrerats ska inte räknas in. Inte heller registrerade studenter som omregistrerats från ett annat kurstillfälle på samma kurs ska räknas in.'}
    },
    extra_kopps_info: {
      no_added: 'Ingen information tillagd',
      commentExam: {header: 'Kommentar till examination', popoverText: 'Kommentar till form av examination vid gällande kursomgång.'},
      programmeCodes: {header: 'Obligatorisk inom program', popoverText: ''},
      analysisName: {header: 'Kurstillfällen som ingår i kursomgång', popoverText: 'Alla kurstillfällen som ingick i kursomgången. Studenter är antagna till ett kurstillfälle. Programstudenter, betalande studenter och fristående studenter antas till olika kurstillfällen men kan utbildas i samma kursomgång. Kurstillfällen ska alltså grupperas ihop till en kursomgång. Kursomgången är ett praktiskt genomförande av en kurs. Kursomgången har en gemensam starttidpunkt, gemensam kurstakt och normalt gemensam undervisning för en studentgrupp. Schemat läggs per kursomgång, kurs-PM utformas per kursomgång och kursanalys genomförs per kursomgång.'}
    },
    extra_dates_and_comments: {
      no_added: 'Ingen information tillagd',
      header_publishing_dates: 'Datum för publicering',
      publishedDate: 'Publicerad första gången',
      changedAfterPublishedDate: 'Senaste ändrad',
      commentChange: 'Kommentar till gjorda ändringar',
      no_date_last_changed: 'ej ändrad efter publicering'
    },
    header_more_info: 'Mer information',
    link_syllabus: 'Kursplan',
    link_analysis: 'Kursanalys',
    link_pm: 'Kurs-PM',
    no_course_analys: 'Det finns inga publicerade kursanalyser och kursdata',
    no_pdf_document: 'inga är upphittade',
    course_short_semester: {
      1: 'VT ',
      2: 'HT '
    },
    page_lang: 'sv'
  },
  pageTitles: {
    about_course: 'Om kursen',
    alt_label_syllabus_link: 'Visa gällande kursplan för den period',
    course_dev_title: 'Kursens utveckling och historik',
    course_dev_title_alt: 'Till Kursens utveckling och historik vy',
    course_info_title: 'Kursinformation',
    course_info_title_alt: 'Till Kursinformation vy',
    course_admin_title: 'Administrera',
    course_admin_title_alt: 'Administrera "Om kursen"',
    header_syllabuses: 'Samtliga kursplaner',
    info_text: 'På denna sida publicerar kursansvariga kursdata och kursanalyser. Här kan presumtiva, nuvarande och tidigare studenter ta del av informationen till hjälp vid kursval eller för att följa upp sitt eget deltagande i kursvärderingar. Lärare, kursansvariga, examinatorer m.fl. kan använda sidan som ett stöd vid kursutveckling.',
    label_syllabus_link: 'Kursplan',
    no_course_syllabus: 'Inga kursplaner är upphittade',
    alertMessages: {
      kopps_api_down: 'Det går för närvarande inte att hämta information från KOPPS så viss information kommer att saknas. Eller kurskoden är felstavade',
      kutv: {
        save: 'Utkast för kursutveckling har sparats',
        s_msg: 'Du hittar det sparade utkastet under Kursanalys och kursdata/ Publicera ny',
        pub: 'Kursutveckling har publicerats',
        delete: 'Utkast för kursutveckling har raderats'
      },
      see_more: 'Se',
      term: 'Termin',
      course_round: 'Kursomgång'
    },
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
