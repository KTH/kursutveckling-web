module.exports = {
  shortNames: ['en'],
  longNameSe: 'Engelska',
  longNameEn: 'English',
  messages: {
    /**
     * General stuff
     */
    date_format_short: '%d-%b-%Y',
    language_link_lang_sv: 'Svenska',
    menu_panel_search: 'Search',
    menu_panel_close: 'Close',
    menu_panel_menu: 'Menu',

    /**
     * Error messages
     */

    error_not_found: "Sorry, we can't find your requested page",
    error_generic: 'Something went wrong on the server, please try again later.',

    /**
     * Message keys
     */
    service_name: 'Course development and history web',
    title: 'Course development and history',
    description:
      'On this page course analysis and course data are published by course coordinators. Prospective, current and previous students can use the information for selecting courses or follow up on previous course evaluations. Teachers, course coordinators, examiners etc. can use the page as a tool for course development.',

    example_message_key: 'This is an english translation of a label',
    button_label_example: 'Click me to send data to server!',
    field_text_example: 'Data to be sent to API',

    field_label_get_example: 'My modelData(Response from api call GET): ',
    field_label_post_example: 'My modelData(Response from api call POST): ',

    lang_block_id: '1.77273',
    locale_text: 'This page in English',

    site_name: 'Course development information',
    skip_to_main_content: 'Skip to main content',
    host_name: 'KTH',
    page_about_course: 'About course',
    page_course_programme: 'Course and programme directory',
    page_student: 'Student at KTH',

    archiveTitles: {
      archive: 'Archive',
      about_course: 'About course',
      sub_menu_aria_label: 'Sub menu',
      course_programme: 'Course and programme directory',
      before_choosing_course: 'Before course selection',
      prepare_course: 'Prepare and take course',
      course_development: 'Course development',
      administration: 'Administer About course',
      label_syllabus: 'Course Syllabus',
      label_syllabuses: 'Course Syllabuses',
      label_semester: 'Semester',
      course_short_semester: {
        1: 'Spring',
        2: 'Autumn'
      },
      ongoing_label: 'ongoing',
      label_memos: 'Course Memos',
      label_course_offering: 'Course Offering',
      label_memo: 'Course Memo',
      label_version: 'Ver',
      label_latest_version: 'latest version',
      no_syllabuses: 'This course doesn´t have an approved course syllabus.',
      no_memos: 'This course has no published course memos.',
      no_analyses: 'This course has no published Course Analyses.',
      label_course_analyses: 'Course Analyses',
      label_course_analysis: 'Course Analysis',
      analysis_in_canvas: 'See course analysis in Canvas.'
    }
  },
  analysisHeaders: {
    info_manually_edited: 'Course data has been registered manually',

    close_button_label: 'Close',
    aria_label_info_icon: 'More information',

    examiners: {
      header: 'Examiners',
      popover_text:
        'The examiners of the course at the time for the course offering. Examiners are administrated in Kopps.'
    },
    alterationText: {
      header: 'Changes planned for the next course offering',
      no_changes: 'No changes planned.',
      adminWeb: {
        header: 'Changes introduced for this course offering',
        no_changes: 'No changes were made.'
      }
    },
    result: {
      header: 'Results on course',
      total: 'Total',
      popover_text:
        'Graduation rate is defined as the number of passed first registration students on the whole course divided by the number of registered student (as defined above) after the first ordinary examination after the end date of the course offering. Graduation rate is not calculated for each examination session in the course examination set. Neither is it recalculated after each following re-examination.'
    },
    responsibles: {
      header: 'Coordinator'
    },
    registeredStudents: {
      header: 'Students',
      popover_text:
        'Number of registered students are defined as the number of first registration students on all the administrative course instances that are included in the course offering. Admitted students that have not been registered shall not be counted. Neither shall registered students that have been re-registered from a previous administrative course instance counted. Number of registered students is calculated based on information fetched from Ladok.'
    },
    programmeCodes: { header: 'Compulsory within programme' },
    analysisName: {
      header: 'The course analysis applies to following course offerings',
      popover_text:
        'All the administrative course instances that was included in the course offering. Students are admitted to an administrative course instance. Degree program students and non-programme students are admitted to different administrative course instances but may be educated in the same course offering. A course offering is thereby the practical realisation of the course with a common start date, common pace, common timetable etc. for all students. Several administrative course instances are grouped to one course offering'
    },

    no_course_analysis:
      'When the course analysis has been published, the course data, course memo and course syllabus are displayed.',
    no_added: 'No information inserted',

    syllabusLink: { header: 'Course syllabus', no_added_doc: 'No course syllabus added' },
    analysisLink: { header: 'Course analysis', no_added_doc: 'No course analysis added' },
    memoLink: { header: 'Course memo', no_added_doc: 'No course memo added' },

    courseShortSemester: {
      1: 'Spring',
      2: 'Autumn'
    }
  },
  pageTitles: {
    about_course: 'About course',
    course_admin_title: 'Administer About course', //Administrate
    course_dev_title: 'Course development',
    course_info_title: 'Course information',
    regulated_link: '“Guidelines on course evaluation and course analysis”. ',
    info_text: {
      0: 'On this page, you can see how the course has developed over time. For each course offering, course data is displayed (number of registered students and course results, along with planned changes for the next session). ',
      1: 'All course syllabuses and course memos are shown on the page ',
      2: 'The information can help prospective, current, and former students with course selection, or to follow up on their own participation. Teachers, course coordinators, examiners, program directors, and others can use the page as a resource for course development.'
    },
    label_syllabus_link: 'Course syllabus',
    course_short_semester: {
      1: 'Spring ',
      2: 'Autumn '
    },
    altLabel: {
      start_link_back: 'To course information page',
      button_cancel: 'Cancel and go back to admin start page'
    }
  },
  breadCrumbs: {
    student: 'Student web',
    studies: 'Studies',
    directory: 'Course and programme directory'
  }
}
