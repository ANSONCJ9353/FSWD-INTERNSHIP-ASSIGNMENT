import React, { useState } from "react";
import "./App.css";

function App() {

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "a47237005718b7635dc07e666a29a6a0"; 

  const fetchWeather = async () => {

    if (!city) return;

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      setWeather(data);

    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="container">

      <h2>Weather Dashboard</h2>

      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button onClick={fetchWeather}>Get Weather</button>

      {loading && <p>Loading...</p>}

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-box">
          <h3>{weather.name}</h3>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Condition: {weather.weather[0].main}</p>
        </div>
      )}

    </div>
  );
}

export default App;