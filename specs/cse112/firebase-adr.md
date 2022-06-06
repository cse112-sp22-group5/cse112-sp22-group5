# Architecture Decision Record: Production Deployment
- Status: Accepted
- Deciders: Entire Team
- Date: 06/03/2022
## Context and Problem Statement
This ADR was written after the fact to communicate with developers potentially picking up this project in the future as to why firebase was chosen as the production deployment method. The team wanted to move the project away from Github pages hosting where it was previously being hosted as pages is primarily used for static pages. Considerations were also being made at the time regarding the addition of a backend that would store information such as user settings, statistics, and other user-inputted data like tasks for easy synchronization across devices. 

## Considered Options
- Heroku
- Netlify
- Firebase

## Decision Outcome
Chosen option(s):
- Firebase

Firebase was ultimately chosen as the deployment method since it would make adding a backend to the application a very streamlined process since both hosting and the database could be under the same platform using only one account. Several team members were also familiar with working with firebase github actions for deployment as well as using the database options that firebase offers. While the backend was ultimately scrapped, having the workflow for firebase deployment already in place should make it much easier for developers wanting to add a backend or analytics to the application to add these features.

