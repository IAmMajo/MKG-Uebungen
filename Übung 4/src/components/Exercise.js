import { useState } from "react";
import styled from "styled-components";
import Task from "./Task";

/*
 * To arrange the exercise-boxes at once:
 */
const StyledDiv = styled.div`
  border-radius: 3px;
  background-color: #282c34;
  margin: 0.5em 0.5em;
  padding: 0.5em 1em;
  color: white;
`;

/*
 * Just a styled version of h4
 */
const StyledH4 = styled.h4`
  color: #17a934;
  margin-left: 0.5em;
  font-size: 0.8em;
  font-style: "italic";
  font-family: "Helvetica Neue" sans-serif;
`;

/*
 * TaskArea represents content-area
 * and wrt. this app, the contents of a Task are given as
 * subtasks
 *
 * The words superTask and exercise are used interchangeable
 */
function TaskArea({ subtasks, superTaskId, onCheckboxToggle }) {
  const listItems = subtasks.map((task) => (
    <Task
      task={task}
      length={subtasks.length}
      superTaskId={superTaskId}
      key={task.id}
      onCheckboxToggle={onCheckboxToggle}
    ></Task>
  ));
  return listItems;
}

export function Exercise({ exercise }) {
  const [checked, setChecked] = useState(areAllTasksChecked());

  function areAllTasksChecked() {
    return exercise.subtasks.every(
      (currentExe) =>
        localStorage.getItem(
          `exercise-${exercise.id}-task-${currentExe.id}`
        ) === "checked"
    );
  }

  return (
    <StyledDiv key={exercise.id}>
      <h2>
        Exercise {exercise.id}: {exercise.title} {checked && "✔"}
      </h2>
      {exercise.subtitle ? <StyledH4>{exercise.subtitle}</StyledH4> : ""}

      <TaskArea
        subtasks={exercise.subtasks}
        superTaskId={exercise.id}
        onCheckboxToggle={() => setChecked(areAllTasksChecked())}
      ></TaskArea>
    </StyledDiv>
  );
}
