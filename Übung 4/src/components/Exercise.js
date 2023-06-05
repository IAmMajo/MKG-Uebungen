import { useState } from "react";
import styled from "styled-components";
import Task from "./Task";

/*
 * To arrange the exercise-boxes at once:
 */
const StyledDiv = styled.div`
  box-shadow: 0px 0px 0px 1px var(--md-sys-color-outline);
  border-radius: 12px;
  padding: 16px;
`;

const StyledH2 = styled.h2`
  margin: 0;
  font-family: var(--md-sys-typescale-headline-medium-font-family-name);
  font-style: var(--md-sys-typescale-headline-medium-font-family-style);
  font-weight: var(--md-sys-typescale-headline-medium-font-weight);
  font-size: var(--md-sys-typescale-headline-medium-font-size);
  line-height: var(--md-sys-typescale-headline-medium-line-height);
  letter-spacing: var(--md-sys-typescale-headline-medium-letter-spacing);
  margin-bottom: 16px;

  @media (min-width: 600px) {
    margin-bottom: 24px;
  }
`;

/*
 * Just a styled version of h4
 */
const StyledH4 = styled.h4`
  margin: 0;
  font-family: var(--md-sys-typescale-body-medium-font-family-name);
  font-style: var(--md-sys-typescale-body-medium-font-family-style);
  font-weight: var(--md-sys-typescale-body-medium-font-weight);
  font-size: var(--md-sys-typescale-body-medium-font-size);
  line-height: var(--md-sys-typescale-body-medium-line-height);
  letter-spacing: var(--md-sys-typescale-body-medium-letter-spacing);
  margin-bottom: 16px;

  @media (min-width: 600px) {
    margin-bottom: 24px;
  }
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
      <StyledH2>
        Exercise {exercise.id}: {exercise.title} {checked && "✔"}
      </StyledH2>
      {exercise.subtitle ? <StyledH4>{exercise.subtitle}</StyledH4> : ""}

      <TaskArea
        subtasks={exercise.subtasks}
        superTaskId={exercise.id}
        onCheckboxToggle={() => setChecked(areAllTasksChecked())}
      ></TaskArea>
    </StyledDiv>
  );
}
