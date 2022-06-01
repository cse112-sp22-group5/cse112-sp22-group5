# Start/Stop/Reset

* Status: accepted
* Deciders: Nidhi Giridhar, Sydney Wong, Jasmine Chen, Alejandro Malanche, Alejandro Marquez, Ian Rebmann, Zachary Chan, Samuel Burkholder
* Date: 2021-02-04
  
## Context and Problem Statement

Which buttons are needed and which aren't? What are their functions?

## Considered Options

* infinite timer after start is pressed and stop ends it for the day
* get rid of stop button since user shouldn't be able to stop timer
* after user hits reset, need to hit start button to start timer again (doesn't auto start)
* keep stop button for closure if someone wants to end early
* reset button resets entire session (0 pomos done)

## Decision Outcome

Chosen options:
* start button
* reset button = resets current pomo
* no stop button
* check that user is still working after long break (2nd sprint)

because stop button isn't necessary. If user wants to end early, they can just exit out of the webpage. 
