import React, { useState } from "react";
import "./App.css";

function App() {

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    let newErrors = {};

    
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } 
    else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } 
    else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = "Must include one uppercase letter";
    } 
    else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = "Must include one number";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length === 0) {
      setErrors({});
      setSuccess("Signup successful!");
    } else {
      setErrors(validationErrors);
      setSuccess("");
    }
  };

  return (
    <div className="container">

      <h2>Smart Signup Form</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p className="error">{errors.password}</p>}

        <button type="submit">Sign Up</button>

        {success && <p className="success">{success}</p>}

      </form>

    </div>
  );
}

export default App;