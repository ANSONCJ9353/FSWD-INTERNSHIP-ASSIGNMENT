import React, { useState } from "react";
import "./App.css";

function App() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name === "" || email === "") {
      setError("All fields are required");
      setSuccess("");
      return;
    }

    if (!email.includes("@")) {
      setError("Enter a valid email");
      setSuccess("");
      return;
    }

    setError("");
    setSuccess("Form submitted successfully!");
  };

  return (
    <div className="container">

      <h2>Interactive Form</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit">Submit</button>

      </form>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

    </div>
  );
}

export default App;