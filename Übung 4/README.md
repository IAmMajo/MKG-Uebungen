# Exercise 4: Introduction to React

## a) Add a component (recommended)\*

Add a Checkbox to visualize if you have already done an exercise. This boxes
should be placed next to each subtask and as a user you should be able to use
them: once checked, this should be visibile if you restart your page. In
addition, if all subtasks of an exercise are checked as solved, a checkmark
should appear next to the exercise-header.

Since all new pull-request will update the data.js file (you will pull for new
exercises each week): How does these git-requests will effect your local
version?

At the beginning, work with

```
localStorage
```

to let your ExerciseApp remember the Checkbox states. What about writing the
changes directly to the "data.js" with JavaScript?

## b) Add Usability - solving this task may take some time\*\*

Inserting a new task directly from the source code can be cumbersome. Add a
button to the interface

```
Add new task
```

which offers the user the interface that provides the following functions:
"Enter and save a new task in the data set". A click on this button links to a
form that enables the creation of new tasks.

HINT: to export content into files you should consider:
https://www.npmjs.com/package/fs-browsers or consider the first option of the
next subtask.

Note, the form-elements should fit to the data structure of the ExerciseApp.

For the subtasks, your formular needs to differentiate between the following
content-types:

- text
- url
- img
- number

Recommended: First, you should create the requirements (user stories) for the
Add New Exercise page. Then develope a prototype (user guidance and layout).
After these steps you should start developing the site including its
functionalities.

## c) Mock Data, API Mocking\*

In early stage of your project, you need to define and structure your data.

In case you do not have a real-data set, you need to work with so called Mock
Data and there exist several ways to set up your data.

Provide your data in one of the following ways or start a research on your own:

- Create a server which simulates some API (usually a placeholder for backend
  database)
- Fake-Api such as the REST Mock-Data Demo
- json-server

## d) next.js\*\*

Get started with next.js. You can create your own inital app or rework the
ExerciseApp.

[next.js](https://nextjs.org/)

Hint: try to understand the terminology and file conventions; explained here:

[important stuff to know](https://nextjs.org/docs/app/building-your-application/routing)

## e) Restyle your ExerciseApp\*

Play around with styled-components to change the styles of the different react
components.

In case you rework the UI based on some arguments wrt. UX and create a complete
new Layout, this subtask counts\*\*
