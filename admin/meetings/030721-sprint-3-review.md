# CSE 110 W20 Team 35 Meeting Minutes

## Meeting Objective: Sprint 3 Review

**Date: Sunday 3/7/2021**  
**Start Time: Zoom 2:30 pm PT**  
**End Time: 3 pm PT**  
**Attendees (Name, Role):**

1. Sydney Wong
2. Nidhi Giridhar
3. Alejandro Marquez
4. Jasmine Chen
5. Alejandro Malanche
6. Zachary Chan
7. Samuel Burkholder
8. Ian Rebmann

**Absent (Name, Role)**:

## Agenda:

1.  Recap what is completed so far
2.  Recap what is being moved to sprint 3 and backlog
3.  Everyone reviews their accomplishments and feelings regarding sprint 3
4.  Plan for Sprint 4

## Completed Tasks (from previous meeting):

## Pending Business (from previous meeting):

## Notes, Decisions, Issues:

- completed so far
  - non-static instructions (help modal)
  - keyboard shortcuts
  - fixed timer delay issue from sprint 2
  - integrated notifications
  - break reminders
  - changing background colors
  - progress bar
  - customizable time limits
  - toggle feature for notifications and keystrokes
- backlog or next sprint
  - more testing
  - continuation of code quality/documentation
  - UI changes to progress bar
  - fix timer toggle
- individual reviews
  - Ian
    - implmented the html, css and javascript for the progress bar
    - implemented the html, css and javascript for the background color changes
    - implemented the html and javascript for the break reminders
    - research for the responsive design (to be done in the final sprint)
    - [progress bar](sprint-3-images/pbar.PNG)
    - [break reminders](sprint-3-images/bremindSS.PNG)
  - Alejandro Marquez
    - Implemented all of the Cypress UI tests as seen in [Test Cases](sprint-3-images/test-cases.gif) and will continue test creation by implementating tests which will span real pomo cycle durations.
    - Faced problems with JUnit testing and needed to do research on es6 but finally got JUnit tests working.
    - Assited in the completion of the html and css for the [Settings Modal](sprint-3-images/settings-modal.png) which encompases the [Custom Time limits Feature](sprint-3-images/custom-time.png) which I also helped implement.
    - I helped implement Custom Limits such that users can now choose from a list of time intervals, but if any break duration is longer than the pomo duration than they recieve an [Error Message](sprint-3-images/error-message.png).
    - [Test Cases Code](sprint-3-images/cypress-test-cases-code.gif)
    - [Settings Button Code](sprint-3-images/settings-button-code.png)
    - [Custom Time Limits Sanity Check Code](sprint-3-images/custom-time-limits-check-code.png)
  - Jasmine
    - implmented the html, css and javascript for the progress bar
    - implemented the html, css and javascript for the background and timer display border color changes
    - implemented the html and javascript for the break reminders
    - completed multiple progress bar mocks for the team to look at
    - [Color change - Work state](sprint-3-images/color-pomo.png)
    - [Color change - Short break state](sprint-3-images/color-short.png)
    - [Color change - Long break state](sprint-3-images/color-long.png)
    - [Progress bar](sprint-3-images/progress-bar.png)
  - Alejandro Malanche
    - correct issues with slow timer and the initial delay when start button was clicked
    - worked on [html](sprint-3-images/custom-time-limits-html.png) and [javascript](sprint-3-images/custom-time-limits-js.png) for custom time limits
    - added an [eventlistener](sprint-3-images/html-eventlisteners.png) for the form for the custom time limits that changes the html upon changing the value
    - faced problems with JUnit testing and needed to do research on es6 but finally got it working
  - Sam
    - Added event listener attached to keyDown object.
    - Implemented Javascript checking that the keyDown was space and dealing with it properly if so.
    - Implemented multiple mockups of the progress bar with the CSS team (Ian and Jasmine) for group to ultimately decide between.
    - [Progress Bar MockUp1](sprint-3-images/progress-mock-1.png)
    - [Progress Bar MockUp2](sprint-3-images/progress-mock-2.png)
  - Zachary
    - worked on [html](sprint-3-images/toggle-html.png), [css](sprint-3-images/toggle-css.png) [more css](sprint-3-images/toggle-css2.png) for the toggle features in the custom time limits modal
    - worked on [js](sprint-3-images/notif-toggle-js.png) for turning on and off notifications
    - integrated the notifications methods into timer.js file
    - worked on UI team for custom time limits (part of html, css, and javascript)
  - Sydney
    - completed the [html](sprint-3-images/help-modal-html.png), [css](sprint-3-images/help-modal-css.png), javascript and [testing](sprint-3-images/help-modal-jest.png) for the help modal (instructions)
    - worked on UI team for custom time limits (part of html, css, and javascript)
    - needed to research html modals
    - faced problems with JUnit testing and needed to do research on es6 but finally got it working
    - added [event listeners](sprint-3-images/html-eventlisteners.png) to the modal buttons
    - added [methods](sprint-3-images/help-modal-functions.png) that were called once the help modal are opened (internal logic of disabling buttons and revealing/hiding modals)
    - added [methods](sprint-3-images/custom-time-limits-reveal-hide.png) that were called once the custom time limit modal are opened
    - continued to make sure the Jest tests worked on the pipeline using the GitHub action
    - began creating documentation using GitHub action
    - began making repository look consistent and running lint locally
  - Nidhi
    - correct issues with slow timer and the initial delay when start button was clicked
    - worked on html and javascript for custom time limits
    - faced problems with JUnit testing and needed to do research on es6 but finally got it working
    - kept ADRs updated
    - approved pull requests made by team from feature branches to sprint3 branch
    - faced problems with JUnit testing and needed to do research on es6 but finally got it working
- Planning Sprint 4 [board found here](https://github.com/nidhigiridhar/cse110-w21-group35/projects/5)
  - more unit testing
  - more integration testing
  - clean code/repo
  - finalize documentation
  - create readme
  - responsive design

## TODOs:

## To discuss at next meeting:
