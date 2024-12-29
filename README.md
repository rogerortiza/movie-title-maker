# MovieTitleMaker

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.6.

## Features

- Import movie data from JSON, CSV, and other file formats
- Preview and edit movie titles and related information
- Export movie data to JSON and text files
- Drag-and-drop file import functionality
- Responsive design for desktop and mobile devices

## Project Structure

- app: Contains the main application code
    - shared: Contains Angular components and services
- assets: Contains static assets such images and styles
- src/environmets: Contains environment configuration files

## Testing Instructions

For tesing purposes, please use only JSON files. Other file formats are not fully supported at
this time and may cause unexpected behavior. You can upload your own json files or use the files in
the dummy data folder from the project.

If you decide to use you own json files please follow the next json structure:

```json
[
    {
        "title": "Producer",
        "name": "Adam Smith"
    },
    {
        "title": "Producer of Work",
        "name": "Ramiro Palafox"
    },
    {
        "title": "Music Producer",
        "name": "Jose Samano"
    }
]

You can upload more than one file

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
