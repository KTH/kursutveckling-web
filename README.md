# Welcome to kursutveckling-web 👋

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg?cacheSeconds=2592000)
![Prerequisite](https://img.shields.io/badge/node-18-blue.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#)

## Course development and history web

## Kursens utveckling och historik web

**React** app using **mobx** and **parcel-js**.

This page displays course analysis and course data published by course coordinators sorted by years. Prospective, current and previous students can use the information for selecting courses or follow up on previous course evaluations. Teachers, course coordinators, examiners etc. can use the page as a tool for course development.

Displays:

- Meny with navigation links for course information related pages (_kursinfo-web, kursinfo-admin-web_)
- Dropdown list with all previous course syllabuses
- Tables with course data and course analyses, as well as this course round syllabuss (and course-pm)
- Navigation links per table to edit it in administrate tool **kursutveckling-admin-web**

The two types of course analyses, Canvas analyses and Admin Web Tool analyses, differ in their origins and data sources:

- Admin Web Tool analyses, from the discontinued `kursutveckling-admin-web` tool, include the field `examinationGrade` for describing course round results. The field `alterationText` refers to changes implemented before the **current** course round. The latest analysis of this kind will be published in March 2025.
- Canvas-based analyses data is fetched and compiled in the integration `kursutveckling-integration-api`, including the field `gradingDistribution` for describing course round results. The field `alterationText` here refers to changes planned before the **next** course round.

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

### Secrets for Development

Secrets during local development are stored in a gitignored `.env` file (`env.in` can be used as template for your `.env` file). More details about environment variable setup and secrets can be found in [confluence](https://confluence.sys.kth.se/confluence/x/OYKBDQ).

### Install

First time you might need to use options `--ignore-scripts` because of npm resolutions:

```sh
npm install --ignore-scripts
```

or

```sh
npm install

```

You might need to install as well:

```sh
npm install cross-env
npm install concurrently
```

### Usage

Start the service on [http://localhost:3000/kursutveckling/:courseCode](http://localhost:3000/kursutveckling/:courseCode).

```sh
npm run start-dev
```

### Debug in Visual Studio Code

It's possible to use debugging options available in Visual Studio Code
Add a file `launch.json` to `.vscode` directory :

- _Microsoft_

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug kursutveckling-web",
      "program": "${workspaceFolder}\\app.js",
      "envFile": "${workspaceFolder}\\.env",
      "env": {
        "NODE_ENV": "development"
      }
    }
  ]
}
```

- _Mac, Unix and so on_

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug kursutveckling-web",
      "program": "${workspaceFolder}/app.js",
      "envFile": "${workspaceFolder}/.env",
      "env": {
        "NODE_ENV": "development"
      }
    }
  ]
}
```
