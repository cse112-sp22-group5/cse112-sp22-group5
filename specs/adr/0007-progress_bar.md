# Progress Bar

- Status: accepted
- Deciders: Nidhi Giridhar, Sydney Wong, Jasmine Chen, Alejandro Malanche, Alejandro Marquez, Ian Rebmann, Zachary Chan, Samuel Burkholder
- Date: Sprint 2

## Context and Problem Statement

Do we need to have a progress bar or not?  
The progress bar esentially shows the user the current timer state they are at and how far until they reach a long break.

## Considered Options

- We considered removing the progress bar since we thought it was not esentially to the core functionality of a pomodoro timer and might distract the user.
- On the other hand, we argued to keep the progress bar since there is no other way for the user to tell how far into the current 4 pomo cycle they are and when to anticipate a long break.
- We also considered different options of displaying the progress bar
  - tomatoes stacking up after each timer session is completed.
  - continuously increasing progress bar (Every second) until the long break is reached
  - have a bar with 8 dots, they would get dimmer from left to right as the user completes a session.

## Decision Outcome

Chosen options:

- We decided to keep the progress bar as it will be helpful to the user to know how long they have until their next long break.
- For the display, we decided to go with the 8 dots method as it is clean and simple and having a bar that increments evry second along with the timer would be too distracting.
