# Disabling Buttons

- Status: accepted
- Deciders: Nidhi Giridhar, Sydney Wong, Jasmine Chen, Alejandro Malanche, Alejandro Marquez, Ian Rebmann, Zachary Chan, Samuel Burkholder
- Date: Sprint 2

## Context and Problem Statement

When do we want to enable/disable the start and reset buttons?

## Considered Options

- Leave both buttons enabled at all times.
- Disable reset button when the timer is not running
- Disbale start button while the timer is counting down
- Disable both buttons during break states.

## Decision Outcome

Chosen options:

- We decided to disable the reset button when the timer is not running so the user doesn't play around with it and distract themselves.
- Similarly, we decided to disable the start button when the timer is counting down.
- We decided to disbale both buttons when the timer is in the break state since it goes against the pomo method to be able to reset a break state.
