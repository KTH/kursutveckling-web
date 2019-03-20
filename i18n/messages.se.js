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
  pageTitles: {
    mainPage: 'Kursutvecklingsinformation',
    alertMessages: {
      success: 'Ny version av kursutvecklingsinformation har publicerats på kursinformationssidan',
      over_text_limit: 'Texten får bara bestå av 1 500 tecken',
      over_html_limit: 'HTML texten får bara bestå av 10 000 tecken',
      api_error: 'Det gick inte att spara texten på grund av teknisk fel. Kopiera texten och försök igen senare',
      kopps_api_down: 'Det går för närvarande inte att hämta information från KOPPS så viss information kommer att saknas'
    }
  },
  sellingTextLabels: {
    label_course_dev_info: 'Du kan här analysera kursutveckling av kursen...',
    label_max_number_letters: 'Maximalt antal tecken är 1500.',
    label_left_number_letters: 'Antal tecken kvar att använda:',
    label_en: 'Engelsk text',
    label_sv: 'Svensk text',
    changed_by: 'Senast ändrad av:',
    graph: 'Grapher för kursutveckling',
    altLabel: {
      start_link_back: 'Till kursinformationssida',
      button_cancel: 'Avbryt och gå till admin startsida'
    }
  },
  courseRoundInformation: {
    round_teacher: 'Lärare',
    round_tutoring_language: 'Undervisningsspråk'
  }
}
