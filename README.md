kursutveckling-web
========
## Course development and history web
## Kursens utveckling och historik web

**React** app using **mobx** and **parcel-js**.

This page displays course analysis and course data published by course responsibles sorted by years. Prospective, current and previous students can use the information for selecting courses or follow up on previous course evaluations. Teachers, course responsibles, examiners etc. can use the page as a tool for course development.

Displays:
- Meny with navigation links for course information related pages (*kursinfo-web, kursinfo-admin-web*)
- Dropdown list with all previous course syllabuses
- Tables with course data and course analyses, as well as this course round syllabuss (and course-pm)
- Navigation links per table to edit it in administrate tool **kursutveckling-admin-web**

Application is fetching data from **KOPPS-API** for:
1. Course title
2. For a list of course syllabusses for all available years in kopps

Application is fetching data from **Kursutveckling api** to show:
1. All data contained in table for course analyses and data

Application is showing course syllabuses via **kursplan-api**

Web pages is public for everyone. 

**All connected projects can be found here:**
- [https://github.com/KTH/kursutveckling-admin-web](https://github.com/KTH/kursutveckling-admin-web)
- [https://github.com/KTH/kursutveckling-api](https://github.com/KTH/kursutveckling-api)
- [https://github.com/KTH/kursplan-api](https://github.com/KTH/kursplan-api)

**Related projects**
- [https://github.com/KTH/kursinfo-admin-web](https://github.com/KTH/kursinfo-admin-web)
- [https://github.com/KTH/kursinfo-api](https://github.com/KTH/kursinfo-api)
- [https://github.com/KTH/kursinfo-web](https://github.com/KTH/kursinfo-web)


###Where do you keep you secrets?
Secrets during local development are ALWAYS stored in a `.env`-file in the root of your project. This file should be in .gitignore. It needs to contain at least ldap connection URI and password in order for authentication to work properly:

```
API_URI=[https://api-r.referens.sys.kth.se/api/kursutveckling]
API_KEY=[password the same as in api itself]
KOPPS_URI=[https://api-r.referens.sys.kth.se/api/kopps/v2/]
SESSION_SECRET=[session secret]
SESSION_KEY=kutv.sid
REDIS_URI=[redis azure connection string]
```

If you want to add authorization:
```
LDAP_BASE=[OU=UG,DC=ref,DC=ug,DC=kth,DC=se]
LDAP_URI=ldaps://[usertname]@ldap.ref.ug.kth.se
LDAP_PASSWORD=[password]
```

**IE 11 Support**

In order to support _Internet Explorer 11_, older versions of `MobX` and `query-string` are used.

From `MobX` project page:

> MobX 4 runs on any ES5 browser and will be actively maintained. The MobX 4 and 5 api's are the same and semantically can achieve the same, but MobX 4 has some limitations.


From `query-string` project page:


> This module targets Node.js 6 or later and the latest version of Chrome, Firefox, and Safari. If you want support for older browsers, or, if your project is using create-react-app v1, use version 5
