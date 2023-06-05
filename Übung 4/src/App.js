import "@fontsource/roboto/latin-400.css";
import "@fontsource/roboto/latin-500.css";
import { useState } from "react";
import styled from "styled-components";
import "./theme/theme.dark.css";
import "./theme/tokens.css";

// global styles
import "./App.css";

// (styled) sub components
import { Exercise } from "./components/Exercise";

// data
import { exercises } from ".//data/data.js";

//TODO add ** for next.js

const StyledDiv = styled.div`
  margin: 16px;
  color: var(--md-sys-color-on-surface);
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (min-width: 600px) {
    margin: 24px;
    gap: 24px;
  }
`;

const StyledHeader = styled.header`
  background-color: unset;
  color: unset;
  padding: unset;
  gap: 16px;
  min-height: unset;

  @media (min-width: 600px) {
    gap: 24px;
    width: 100%;
    max-width: 1200px;
    margin: auto;
  }
`;

const StyledH1 = styled.h1`
  margin: 0;
  font-family: var(--md-sys-typescale-display-medium-font-family-name);
  font-style: var(--md-sys-typescale-display-medium-font-family-style);
  font-weight: var(--md-sys-typescale-display-medium-font-weight);
  font-size: var(--md-sys-typescale-display-medium-font-size);
  line-height: var(--md-sys-typescale-display-medium-line-height);
  letter-spacing: var(--md-sys-typescale-display-medium-letter-spacing);
`;

const StyledP = styled.p`
  margin: 0;
  font-family: var(--md-sys-typescale-body-large-font-family-name);
  font-style: var(--md-sys-typescale-body-large-font-family-style);
  font-weight: var(--md-sys-typescale-body-large-font-weight);
  font-size: var(--md-sys-typescale-body-large-font-size);
  line-height: var(--md-sys-typescale-body-large-line-height);
  letter-spacing: var(--md-sys-typescale-body-large-letter-spacing);
`;

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  max-width: 1200px;
  margin: auto;
`;

/*
 * Main component embedded directly at index.js
 * first component in render-root-hierarchy
 */

function App() {
  /*
   * initial value of the exerciseList
   * in a real world application such data would be fetched from a database etc.
   *
   * At this point we work with the mock-data to train the following:
   *  1. propagation of content down to child-components
   *  2. work with hooks
   *  3. reuse of stateful application logic?
   */

  // init the list-state:
  // we'll use that more sensibly later
  const [list, setList] = useState([]);
  if (list.length === 0) setList(exercises);

  /*
   * for each exercise we create a title and task-area named TaskArea
   * all wrapped within a styled div
   * TODO: key-id generation: import { nanoid } from "nanoid";
   *
   * Discussion during lecture or exercise:
   * Prop drilling vs. Context: first ask yourself if React-Context is really necessary
   * NOTE: everytime list gets updated, does each child gets rerendered?
   *       how the fiber-recons. is acting here?
   */
  const listItems = list.map((exe) => (
    <Exercise key={exe.id} exercise={exe}></Exercise>
  ));
  return (
    <StyledDiv className="App">
      <StyledHeader className="App-header">
        <StyledH1>Welcome to the exercises of MKG - 2023</StyledH1>
        <StyledP>
          This ExerciseApp is based on the initial project you can get via
          create-react-app and is extended by Christina Mika-Michalski
        </StyledP>
        <StyledP>
          Please note, that this app is still a work in progress. So if you
          don`t like something, feel free to optimize it.
        </StyledP>
        <StyledP>
          Surprise: some exercises will adress gaps within this version.
        </StyledP>
      </StyledHeader>
      <StyledMain>{listItems}</StyledMain>
    </StyledDiv>
  );
}

export default App;
