# Pomodoro Timer Project Roadmap

### Created by: Dream Team

## Sprint 1 Tasks:

- Documentation:
  - ADRs
  - User centered thinking documents (personas, user stories, use cases)
  - System diagrams (C4 diagram, event modeling diagram, UML)
  - Project Roadmap
  - Style guideline
- Interface:
  - Fat marker sketches
  - Wireframes
  - High fidelity prototype

## Sprint 2 - MVP Features:

The associated GitHub issues are below each feature

- Timer (25 min for pomo, 5 min for break)
  1. Implement working clock that automatically follows this order: 25 min pomo -> 5 min break (with a 25 min long break every four pomos)
  2. Implement counters that keep track of the number of pomos completed in a row (without clicking reset) and in a day
     - story points: big (for both parts)
     - should be assigned to at least two people
- Start and Reset (restarts current pomo) buttons
  1.  Implement start and reset buttons which begin a countdown from 25 minutes
      - story points: big
      - should be assigned to at least two people
- Notifications
  1. Implement banner notifications notifying the beginning of a short break and the beginning of a long break
     - story points: medium
  2. Implement audio notifications notifying the beginning of a short break and the beginning of a long break (with 2 different tones)
     - story points: medium
- Static instructions explaining how to use the timer
  1. Implement instructions text box below the timer and buttons
     - story points: medium
- CSS/Styling (at least two people should be assigned to each CSS issue)
  1. Use CSS to set background and font color
     - story points: medium
  2. Use CSS to style start and reset button
     - story points: big
  3. Use CSS to style timer
     - story points: big
  4. Use CSS to create tomato icon to hold counters
     - story points: big

## Sprint 3 Features:

- Non-static instructions
- Keyboard shortcuts (for start and reset)
- Different screen colors depending on whether there is a pomo or break in progress
- Progress bar
  - At the top of the screen
  - Shows how long until the next break begins
- Reminder to step away from the screen during breaks

## Sprint 4 Features:

- Customizable time limits
- Task
  - Ability to create list of tasks
  - Ability to assign a number of pomos to each task
  - Ability to check mark 'finished' after completing a task
  - Ability to drag and drop to reorder the list of tasks
  - Ability to delete tasks
  - Ability to clear the tasks list

## Sprint 5 - beyond the quarter Features:

- User profiles
- Progress reports
  - Daily and weekly statistical reports on the number of pomos completed
- Incentives
  - Points are awarded for pomos completed
  - Themes/colors/buzzer sounds can be unlocked after earning a certain number of points
