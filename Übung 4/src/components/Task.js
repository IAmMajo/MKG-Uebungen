import "@material/web/checkbox/checkbox";
import "material-icons/iconfont/outlined.css";
import { useState } from "react";
import styled from "styled-components";

const StyledWrap = styled.div`
  margin-right: 24px;
`;

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  height: 56px;
`;

const StyledH5 = styled.h5`
  margin: 0;
  display: flex;
  align-items: center;
  font-family: var(--md-sys-typescale-body-large-font-family-name);
  font-style: var(--md-sys-typescale-body-large-font-family-style);
  font-weight: var(--md-sys-typescale-body-large-font-weight);
  font-size: var(--md-sys-typescale-body-large-font-size);
  line-height: var(--md-sys-typescale-body-large-line-height);
  letter-spacing: var(--md-sys-typescale-body-large-letter-spacing);
  user-select: none;
`;

const StyledButton = styled.button`
  border: none;
  background: none;
  color: var(--md-sys-color-on-surface);
  font-family: "Material Icons Outlined";
  font-size: 24px;
`;

// use this component for demo in lecture:
const StyledParagraph = styled.p`
  background-color: ${(props) =>
    props.type === "code" ? "var(--md-sys-color-surface-variant)" : "unset"};
  margin-left: 16px;
  font-family: ${(props) =>
    props.type === "code"
      ? "Courier New"
      : "var(--md-sys-typescale-body-medium-font-family-name)"};
  font-style: var(--md-sys-typescale-body-medium-font-family-style);
  font-weight: var(--md-sys-typescale-body-medium-font-weight);
  font-size: var(--md-sys-typescale-body-medium-font-size);
  line-height: var(--md-sys-typescale-body-medium-line-height);
  letter-spacing: var(--md-sys-typescale-body-medium-letter-spacing);

  & > a {
    color: var(--md-sys-color-primary);
  }
  & > a:hover {
    color: var(--md-sys-color-secondary);
  }
`;

const StyledUl = styled.ul`
  margin-left: 16px;
  padding-left: 16px;
  font-family: var(--md-sys-typescale-body-medium-font-family-name);
  font-style: var(--md-sys-typescale-body-medium-font-family-style);
  font-weight: var(--md-sys-typescale-body-medium-font-weight);
  font-size: var(--md-sys-typescale-body-medium-font-size);
  line-height: var(--md-sys-typescale-body-medium-line-height);
  letter-spacing: var(--md-sys-typescale-body-medium-letter-spacing);
`;

const StyledImg = styled.img`
  margin-left: 16px;
  width: 35%;
`;

const StyledImgSmall = styled.img`
  margin-left: 16px;
  width: 20%;
`;

/*
 * return pure text or provide a link? a list? whatever
 * prototype
 * TODO: rework the datastructure wrt. to some build in editor
 *       for editing tasks
 *       adapt the component-generation wrt. the new datastructure or input-mask
 *
 *       switch to switch-case
 */
function ItemType({ item }) {
  if (item.type === "url") {
    const link = <a href={item.content}>{item.name}</a>;
    return <StyledParagraph type={item.type}>{link}</StyledParagraph>;
  } else if (item.type === "img") {
    return <StyledImg src={item.content} alt={item.alt}></StyledImg>;
  } else if (item.type === "img-small") {
    return <StyledImgSmall src={item.content} alt={item.alt}></StyledImgSmall>;
  } else if (item.type === "list") {
    const listItems = item.content.map((entry, index) => (
      <li key={"li" + index}>{entry}</li>
    ));
    return <StyledUl>{listItems}</StyledUl>;
  } else {
    return <StyledParagraph type={item.type}>{item.content}</StyledParagraph>;
  }
}

/*
 * component-generation wrt. subtask-contents
 * to get a specific ItemType wrt. to the subtask contents
 */
function Content({ content }) {
  const listItems = content.map((item, index) => (
    <ItemType item={item} key={index}></ItemType>
  ));

  return <div>{listItems}</div>;
}

/*
 * Subtask title + checkbox:
 * Sets the checkbox wrt. the state of the data
 *
 * returns the subtitle wrt. the state of the single subtask
 * wrt. the state of the exercise-data propagated from the parent component
 * to keep the data consistent: manipulation of the exercise-data is happening in the parent-component
 * and the data flows from top to bottom
 * PROPS ARE READ ONLY
 *
 * for more explanation please look into:
 * https://beta.reactjs.org/learn/sharing-state-between-components
 */
function H4({ length, task, superTask, onCheckboxToggle }) {
  const key = `exercise-${superTask}-task-${task.id}`;

  const [checked, setChecked] = useState(localStorage.getItem(key));

  function onClick() {
    if (checked) {
      setChecked(null);
      localStorage.removeItem(key);
    } else {
      setChecked("checked");
      localStorage.setItem(key, "checked");
    }
    onCheckboxToggle();
  }

  if (length < 2) {
    return (
      <>
        <StyledH5 onClick={onClick}>
          <md-checkbox checked={checked}></md-checkbox>
          {task.title}
        </StyledH5>
      </>
    );
  }
  return (
    <>
      <StyledH5 onClick={onClick}>
        <md-checkbox checked={checked}></md-checkbox>
        {/* Generation of a) b) c) etc. 
        TODO: Strongly depends on task.id, make sure the task-id generation fits this */}
        {String.fromCharCode(97 + task.id)}) {task.title}
      </StyledH5>
    </>
  );
}

/*
 * This component represents a subtask
 *
 * internal state object wrt. hide and show
 * this state belongs to each subtask, since this information
 * is specific to the single subtask
 */
function Task({ task, length, superTaskId, onCheckboxToggle }) {
  // interactivity and state-managment:
  const [showMore, setShowMore] = useState(false);

  function handleMoreClick() {
    setShowMore(!showMore);
  }
  return (
    <StyledWrap key={task.title + " " + task.id}>
      <StyledDiv>
        <H4
          task={task}
          length={length}
          superTask={superTaskId}
          onCheckboxToggle={onCheckboxToggle}
        ></H4>
        <StyledButton onClick={handleMoreClick}>
          {showMore ? "expand_less" : "expand_more"}
        </StyledButton>
      </StyledDiv>
      {showMore && (
        <Content
          key={task.title + " " + task.id}
          content={task.content}
        ></Content>
      )}
    </StyledWrap>
  );
}

export default Task;
