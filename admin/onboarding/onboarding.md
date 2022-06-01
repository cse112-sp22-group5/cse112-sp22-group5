## Productoro
Productoro is a new Pomodoro Timer application. Using the Pomodoro technique, Productoro breaks down work in to intervals called pomos as a means to enhances user time management and increase user productivity and focus. [Here is the link to our app!](https://nidhigiridhar.github.io/cse110-w21-group35/source/productoro.html)

## Purpose
People are always striving to increase their productivity levels. Therefore, maximizing the amount of work completed within a time frame is the major problem. However, another part of the problem is that a lack of focus leads to lack of productivity. People become distracted and tired while working for a long period without breaks. Thus, Productoro intends to address these related issues regarding productivity and focus together.

## How to use?
To use Productoro, follow these steps:
1. Press **Start** to begin your pomodoro timer. Your first pomo will begin and the timer will begin counting down from 25 minutes.
2. After 25 minutes, the timer will stop and transition into your short, five minute break. You must click **Start** to begin the five minute break. At the end of the break, the timer will transition back into showing a countdown from 25 minutes.
3. The pomos and breaks will continue to automatically transition with a long break occurring after every fourth pomo. During a pomo, **Reset** can be pressed to restart the current pomo. **Start** must be pressed again to begin the countdown on the timer. 

Users can also customize the length of their time limits and their keyboard shortcuts and notifications preferences using the settings button in the top left corner of the screen.

## Build status
Last update: March 18, 2021  
Productoro deploys sucessfully and passes all Babel-Jest and Cypress tests. The W3 Validator and Lighthouse testing has been run.  
Code coverage on Babel-Jest tests is not 100%.

## Repository Organization
All Javascript, CSS and Jest files are located in the [source directory](../../source).

<pre>
+-- source/  
|         +-- timer.js  
|         +-- breakReminder.js
|         +-- help.js
|         +-- notifications.js
|         +-- progress-bar.js
|         +-- color-change.js
|         +-- productoro.html
|         +-- styles.css
|         +-- __tests__/
|                      +-- timer.test.js
|                      +-- help.test.js
|                      +-- notifications.test.js
|                      +-- notifications.showNotif.test.js
|                      +-- progressBar.test.js
|                      +-- colorChange.test.js
|         +-- img/
|                +-- dream-team-logo.png
|                +-- settings-icon.png
|                +-- tomato.png
</pre>

All Cypress tests can be found at [<code>./cypress/integration/Productoro-Tests/UI-test.js</code>](../../cypress/integration/Productoro-Tests/UI-tests.js).

## Tech/framework used
Productoro is developed using Javascript, HTML, and CSS. Babel-Jest and Cypress frameworks are used for testing. EsLint and JSDoc were used as a part of the pipeline.

## Pre-Development Procedures
#### Brainstorming 
Brainstorming ideas was an integral part of our process. During our brainstorming sessions, we talked about potential users and what kind of features they would want to see. We also talked about what kind of features our team itself would like in our app. We also did some research by looking at exsiting pomodoro apps (web and mobile) to get an idea about potential features and themes. The brainstorming documents can be found at [<code>./specs/brainstorm</code>](../../specs/brainstorm).

#### User Stories
After brainstorming different kinds of users, we narrowed down our target audience and developed user profiles for them. This helped us gauge what kind of features we would need to incorporate. Our target users are students, software engineers, teachers, and office workers. For instace, a student would like a non-distracting UI, a software engineering that always uses their keyboard would like keyboard control of the app, a teacher would like to customize time limits according to their class schedule and an office worker would like something that is easy to use. This helped us add features like keyboard shortcuts, customizable time limits, and instructions on how to use productoro to cater to our target audience. Detailed user stories can be found at [<code>./specs/users</code>](../../specs/users).

#### System Diagrams 
We then created systems diagrams to map out the architecture of our app using the C4 model. The first is the context diagram that shows the big picture of who and what our app interacts with (users). Then we have the container diagram which shows how our app fits in with its environment. Finally we have the detailed Component diagram that shows the different components of our app and how they interact with each other. We also created an event model diagram that walks you through the flow of the app from the time a user logs and until they close the app. All these can be found at [<code>./specs/system-diagrams</code>](../../specs/system-diagrams).

#### Interface Diagrams 
We also had an elaborate process to design the interface (UI) of our app. We started out by creating fat-marker sketches, progressed onto slightly more detailed wireframes and then finally created the high-fidelity diagrams that showcase what different features our app look like. These can be found at [<code>./specs/interface</code>](../../specs/interface).
    

## Sprint Procedures
A sprint planning meeting is held at the beginning of each sprint. The tasks for that week are split up into gitHub issues and assigned different labels and sizes. Team Members are then allowed to pick what task they want to work on and the issues are then organized into a scrum board. The scrum consists of columns backlog, to do, in progress, verify (pull request), done. The issues are moved to their respective columns as progress is made. An example scrum board can be found at the projects tab.

At the beginning of each sprint a sprint-specific branch (i.e. sprint3) and feature-specific branches (i.e. customTimeLimits) should be created. Throughout the sprint, all team members should work on the feature-specific branch corresponding to their assigned issue. Throughout the sprint, multiple pull requests should be made from the feature-specific branches to the sprint-specific branch. The final pull request from a feature-specific branch to a sprint-specific branch should close the issue(s) related to the feature.

At the end of each sprint, a pull request should be made from the sprint-specific branch to the master branch.

The primary team leader is responsible for reviewing all pull requests, resolving merge conflicts (or delegating resolution to other team members), and approving the pull requests.

ADRs should be updated as the team decides on design changes. Each change should be well-documented in an ADR markdown document titled located in [<code>./specs/adr</code>](../../specs/adr).

## Pipeline Procedures

### Installation
1. Clone the cse110-w21-group35
 repository onto your local machine using <pre>$ git clone `https://github.com/nidhigiridhar/cse110-w21-group35.git`</pre>
2. Checkout the feature-specific branch you will be working on for the duration of the sprint using <pre>$ git checkout [name-of-feature-branch]</pre>

### Committing 
Team members should commit their local changes to the feature-specific branch often using the following commands, in order:
<pre>$ git add .
$ git commit -m "commit message"
$ git push</pre>

### Code style
The Dream Team uses a standard coding style, and a guide to Dream Team specific styling standards can be found [here](../../admin/style-guide.md).

### Documentation
All Javascript files should be well documented using [JSDoc](https://jsdoc.app/) standards.

Using a [GitHub Action](../../.github/workflows/documentation.yml), all documentation should be generated and updated each time a sprint specific branch is merged with the master branch. The documentation for Productoro is hosted on [this repository](https://github.com/sywong888/cse110-w21-group35-docs/tree/gh-pages) (on the gh-pages branch) and deployed to [this page](https://sywong888.github.io/cse110-w21-group35-docs/).

### Tests
Babel-Jest tests should be run through a [GitHub Action](../../.github/workflows/jest.yml) and locally. Note, ES6 Javascript is used for this project.

Use the following terminal commands to run Babel-Jest:
<pre>$ npm install --save-dev babel-jest  
$ npm install @babel/preset-env --save-dev
$ npm test test-file-name
</pre>

Code coverage reports for Babel-Jest tests should be generated frequently using the command:
<pre>$ npm test --coverage</pre>
The code coverage report can be viewed [here](https://nidhigiridhar.github.io/cse110-w21-group35/coverage/index.html).

Cypress tests should be run through a [GitHub Action](../../.github/workflows/cypress.yml) and locally.

Use the following terminal command to open the Cypress test suite:  
<pre>$ ./node_modules/.bin/cypress open
</pre>
After Cypress loads, <code>UI-tests.js</code> in <code>./cypress/integration/Productoro-Tests</code> should be run.

At the end of the every sprint, [Lighthouse](https://developers.google.com/web/tools/lighthouse) should be run on the deployed page.

### Code Quality
ESLint should be run through a [GitHub Action](../../.github/workflows/lint.yml) and locally to ensure a consistent quality among all Javascript files.

Use the following terminal commands to run ESLint:
<pre>$ npm install eslint --save-dev
$ eslint ./source/name-of-file</pre>

At the end of every sprint, the [W3 validator](https://validator.w3.org) should also be run to check the html.

### Deployment
We will deploy the application from GitHub Pages. At the beginning of each sprint, the primary leader should change the repository settings so that the page deploys from the sprint-specific branch. This is allow the Cypress tester to test the most up-to-date code. At the end of each sprint, the page should deploy from the master branch, and the final product should deploy from the master branch, too.

## Credits
Productoro was created for UCSD's CSE 110 Software Engineering course taught by Professor Powell. Members of the Dream Team include Samuel Burkholder, Zachary Chan, Jasmine Chen, Nidhi Giridhar, Alejandro Malanche, Alejandro Marquez, Ian Rebmann, and Sydney Wong. The Dream Team was mentored by TA Chad Hayen.
