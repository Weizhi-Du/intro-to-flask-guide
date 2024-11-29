import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [name, setName] = useState(""); // Input state
  const [response, setResponse] = useState(null); // Response state

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent form refresh
    try {
      const res = await axios.post("http://127.0.0.1:5000/api/process", { name });
      setResponse(res.data); // Update response state with data from backend
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React + Flask App</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Enter your name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <button type="submit">Submit</button>
        </form>
        {response && (
          <div className="response">
            <p><strong>Original Name:</strong> {response.original}</p>
            <p><strong>Reversed Name:</strong> {response.reversed}</p>
            <p><strong>Vowel Count:</strong> {response.vowel_count}</p>
            <p><strong>Message:</strong> {response.message}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
