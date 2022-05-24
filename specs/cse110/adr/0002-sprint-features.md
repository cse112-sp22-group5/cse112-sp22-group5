# Feature Decisions for Other Sprints

* Status: rejected
* Deciders: Nidhi Giridhar, Sydney Wong, Jasmine Chen, Alejandro Malanche, Alejandro Marquez, Ian Rebmann, Zachary Chan, Samuel Burkholder
* Date: 2021-01-28
  
## Context and Problem Statement

We want to prioritize the rest of the features that we want to include down the line. Which features are most important and which ones can we do without if we don't have enough time?

## Considered Options

  * task input: ability to hit 'finished' after a task is done and pick next task to do, user can finish early
  * progress bar showing how long you have until long break (reset once long break is hit)
  * display only current task to do when timer is running
  * make instructions non-static (move to different tab)
  * keyboard shortcuts (start, stop, reset, finished)
  * different colors for pomo and break
  * customizable time limits
  * reminder to step away from screen during breaks
  * incentives: earn points for every pomo completed (store data on local browser) and unlock themes after certain number of points
  * daily/weekly progress (most likely gonna need user profile)

## Decision Outcome

  Chosen option:
  ### High
  * task input: ability to hit 'finished' after a task is done and pick next task to do, user can finish early
  * progress bar showing how long you have until long break (reset once long break is hit)
  * display only current task to do when timer is running
  * make instructions non-static (move to different tab)

  ### Medium
  * keyboard shortcuts (start, reset, finished)
  * different colors for pomo and break
  * customizable time limits
  * reminder to step away from screen during breaks

  ### Low
  * incentives: earn points for every pomo completed (store data on local browser) and unlock themes after certain number of points
  * daily/weekly progress (most likely gonna need user profile)

  because:
  * we felt that this was a reasonable way to split up the features we wanted in a way that the most important ones were prioritized and most likely to be added
