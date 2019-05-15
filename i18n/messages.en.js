module.exports = {
  shortNames: [ 'en' ],
  longNameSe: 'Engelska',
  longNameEn: 'English',
  messages: {
    /**
     * General stuff
     */
    date_format_short: '%d-%b-%Y',

    /**
     * Error messages
     */

    error_not_found: 'Sorry, we can\'t find your requested page',
    error_generic: 'Something went wrong on the server, please try again later.',

    /**
     * Message keys
     */
    service_name: 'course development web',

    example_message_key: 'This is an english translation of a label',

    button_label_example: 'Click me to send data to server!',

    field_text_example: 'Data to be sent to API',

    field_label_get_example: 'My modelData(Response from api call GET): ',
    field_label_post_example: 'My modelData(Response from api call POST): ',

    lang_block_id: '1.77273',
    locale_text: 'Course development information in English',

    site_name: 'Course development information',
    host_name: 'KTH',
    page_student: 'STUDENT AT KTH COURSE DEVELOPMENT INFORMATION',
    page_teacher: 'TEACHER AT KTH COURSE DEVELOPMENT INFORMATION',
    page_course_programme: 'COURSE AND PROGRAMME DIRECTORY'
  },
  tableHeaders: {
    date_fisrt_published: 'Published first time',
    date_last_change: 'Last changed',
    date_pdf_analys: 'Date for the published course analys',
    header_course_round: 'Course round',
    header_programs: 'Obligatory for a list of programs',
    header_rounds: 'Course rounds which are included in...',
    header_examiners: 'Examinator',
    header_examination: 'Form of examination',
    header_examination_comment: 'Comments to examination',
    header_examination_grade: 'Result',
    header_responsibles: 'Course responsible',
    header_registrated: 'Students',
    header_course_changes_comment: 'Changes introduced ...',
    header_analysis_edit_comment: 'Comments to done changes',
    header_more_info: 'More information',
    link_syllabus: 'Course plan',
    link_analysis: 'Course analys',
    link_pm: 'Course-PM',
    no_date_last_changed: 'no changes since first publishing',
    no_course_analys: 'Course analys has not been filled in yet'
  },
  pageTitles: {
    course_dev_title: 'Course development and history',
    course_info_title: 'Course information',
    course_admin_title: 'Administrate',
    about_course: 'About course',
    info_text: 'På denna ... ....',
    info_admin_text: 'Ansvariga .......',
    link_to_course_dev: ' publish course data and course analys.',
    alertMessages: {
      success: 'New version of course development has been published.',
      over_text_limit: 'The text can consist of no more than 1 500 chars',
      over_html_limit: 'HTML texten should be less than 10 000 chars',
      api_error: 'Failed to save text due to technical issues. Copy text and try again later',
      kopps_api_down: 'Failed to get data from KOPPS for now therefore some information is missing'
    }
  },
  courseDevLabels: {
    label_course_dev_info: 'You can look at the development of course...',
    label_max_number_letters: 'The maximum amount of signs is 1500.',
    label_left_number_letters: 'Left to use:',
    label_en: 'English text',
    label_sv: 'Swedish text',
    changed_by: 'Last changed by user with kthId:',
    graph: 'Graphs for course development',
    altLabel: {
      start_link_back: 'To course information page',
      button_cancel: 'Cancel and go back to admin start page'
    }
  },
  courseRoundInformation: {
    round_teacher: 'Teacher',
    round_tutoring_language: 'Language of instruction'
  }
}
