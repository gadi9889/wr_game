import "./App.css";
import Home from "./components/Home";
import Game from "./components/Game";
import React from "react";
import { useState } from "react";

function App() {
  const [gameProperties, setGameProperties] = useState();

  return (
    <div className="App">
      {gameProperties && <Game gameProperties={gameProperties} />}
      <Home setGameProperties={setGameProperties} />
    </div>
  );
}

export default App;
