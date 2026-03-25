import React, { useState } from "react";
import "./App.css";

function App() {

  const [mood, setMood] = useState("");

  return (
    <div className="container">

      <h2>Mood Tracker</h2>

      <div className="buttons">
        <button onClick={() => setMood("Happy 😊")}>Happy</button>
        <button onClick={() => setMood("Sad 😢")}>Sad</button>
        <button onClick={() => setMood("Excited 🤩")}>Excited</button>
        <button onClick={() => setMood("Angry 😡")}>Angry</button>
      </div>

      {mood && (
        <div className="result">
          <h3>Your Mood: {mood}</h3>
        </div>
      )}

    </div>
  );
}

export default App;