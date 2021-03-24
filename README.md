# Important note to have App running normally
This small app uses Github's GraphQL API to query public GraphQL related repos and its issues. The GraphQL API requires authentication to be used unlike the REST API that used to have public capabilities. Since this app currently doesn't have an interface to authenticate to Github I am currently using a Personal Access Token generated in my personal account, hard-coding it in the graphql module to make the application be authenticated.
Github can recognize automatically a Personal Access Token hard-coded in an application and revoke access to that PAT so this uploaded version of the code requires a PAT hard-coded once it's cloned locally.

# GitHubRepos

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
