# Auto Start

- Status: accepted
- Deciders: Nidhi Giridhar, Sydney Wong, Jasmine Chen, Alejandro Malanche, Alejandro Marquez, Ian Rebmann, Zachary Chan, Samuel Burkholder
- Date: Sprint 2

## Context and Problem Statement

Do we need auto start between states or not?

## Considered Options

- Have auto start between states. The timer would directly start the next state countdown after the current state countdown completes without any user input/discretion
- Timer stops running after current countdown is completed and user has to manually start next state.

## Decision Outcome

Chosen options:

- We decided to remove the auto start between states and are allowing the user to start the next state as it gives them a little more flexibility on how they want to manage their schedule.
