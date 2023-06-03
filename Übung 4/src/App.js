import { useState } from "react";

// global styles
import "./App.css";

// (styled) sub components
import { Exercise } from "./components/Exercise";

// data
import { exercises } from ".//data/data.js";

//TODO add ** for next.js

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
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the exercises of MKG - 2023</h1>
        <p>
          This ExerciseApp is based on the initial project you can get via
          create-react-app and is extended by Christina Mika-Michalski
        </p>
        <p>
          Please note, that this app is still a work in progress. So if you
          don`t like something, feel free to optimize it.
        </p>
        <p>Surprise: some exercises will adress gaps within this version.</p>
      </header>
      <main>{listItems}</main>
    </div>
  );
}

export default App;
