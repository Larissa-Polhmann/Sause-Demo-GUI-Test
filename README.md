# Sauce Demo Testing with Cypress

Sample project to demonstrate tests written with [Cypress](https://cypress.io) running on GitHub Actions.

## Pre-requirements

To clone and run this project, you will need:

- [git](https://git-scm.com/downloads) (I've used version `2.44.0` while writing this doc)
- [Node.js](https://nodejs.org/en/) (I've used version `v20.11.1` while writing this doc)
- npm (I've used version `10.2.4` while writing this doc)

**Note:** When installing Node.js, npm is automatically installed. 🚀

## Installation

To install the dev dependencies, run `npm install` (or `npm i` for short.)

## Configuring the environment variables

Before running the tests, some environment variables need to be set up.

Make a copy of the [`cypress.env.example.json`](./cypress.env.example.json) file as `cypress.env.json`, and set the appropriate values for all the variables.

**Note:** The `cypress.env.json` file is not tracked by git since it's listed in the `.gitignore` file.

## Running the tests

In this project, you can run tests in interactive and headless modes, both on desktop.

### Headless mode

Run `npm test` (or `npm t` for short) to run all tests in headless mode using a desktop viewport.

### Interactive mode

Run `npm run cy:open` to open the __Cypress App__ to run tests in interactive mode using a desktop viewport.

### Cypress Cloud

You can access the automation reports at: (https://cloud.cypress.io/projects/5cspe3/runs)
![image](https://github.com/Larissa-Polhmann/Sause-Demo-GUI-Test/assets/69001930/c48e643e-9ef0-40a3-9cfe-bf46606d7b9e)
![image](https://github.com/Larissa-Polhmann/Sause-Demo-GUI-Test/assets/69001930/554ba916-0b9e-4781-958b-85f82feba676)


___

Made with ❤️ by Larissa Polhmann (www.linkedin.com/in/larissa-polhmann-peixer)
