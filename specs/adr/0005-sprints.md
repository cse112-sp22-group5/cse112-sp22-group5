# Feature Decisions for Sprints

* Status: accepted
* Deciders: Nidhi Giridhar, Sydney Wong, Jasmine Chen, Alejandro Malanche, Alejandro Marquez, Ian Rebmann, Zachary Chan, Samuel Burkholder
* Date: 2021-02-04
  
## Context and Problem Statement

Are tasks as important as keyboard shortcuts and screen color changes? Is the progress bar necessary?

## Considered Options

  ### High
  * task input: ability to hit 'finished' after a task is done and pick next task to do, user can finish early
  * progress bar showing how long you have until long break (reset once long break is hit)
  * display only current task to do when timer is running
  * make instructions non-static (move to different tab)

  ### Medium
  * keyboard shortcuts (start, stop, reset, finished)
  * different colors for pomo and break
  * customizable time limits
  * reminder to step away from screen during breaks

  ### Low
  * incentives: earn points for every pomo completed (store data on local browser) and unlock themes after certain number of points
  * daily/weekly progress (most likely gonna need user profile)

## Decision Outcome

  Chosen option:
  ### Sprint3
  * progress bar showing how long you have until long break (still considering; may not use)
  * make instructions non-static (move to different tab)
  * keyboard shortcuts (start, stop)
  * different screen colors for pomo and break
  * reminder to step away from screen during break
 
  ### Sprint4
  * task list
  * customizable time limits

  because tasks and customizable time limits aren't as important to the timer itself as the other features so the task bar can be implemented in a later sprint