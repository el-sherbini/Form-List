import React, { useState } from "react";
import Form from "./components/Form";
import List from "./components/List";
import "./App.css";

const App = () => {
  const [check, setCheck] = useState(false);

  return (
    <div className="App">
      <h1>YDS - Task</h1>

      <Form check={check} setCheck={setCheck} />

      <div className="divider" />
      <List check={check} setCheck={setCheck} />
    </div>
  );
};

export default App;
