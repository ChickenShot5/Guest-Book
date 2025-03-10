import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const URL = "https://gladly-united-plant.mimo.dev";
  const [entries, setEntries] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchEntries = async () => {
    try {
      const response = await fetch(`${URL}/entries`);
      const data = await response.json();
      console.log(data);
      setEntries(data);
    } catch (error) {
      console.error("Error fetching entries:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !message) {
      setError("Both name and message are required.");
      return;
    }

    try {
      const response = await fetch(`${URL}/entries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message }),
      });

      if (response.ok) {
        setName("");
        setMessage("");
        fetchEntries();
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to add entry.");
      }
    } catch (error) {
      console.error("Error adding entry:", error);
      setError("Failed to connect to the server.");
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <div className="container">
      <h1>Digital Guest Book</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Message:
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="4"
          />
        </label>
        {error && <p className="error">{error}</p>}
        <button type="submit">Add Entry</button>
      </form>

      <h2>Guest Entries</h2>
      <ul className="entries-list">
        {entries.length > 0 ? (
          entries.map((entry) => (
            <li key={entry.id} className="entry">
              <p><strong>{entry.name}</strong></p>
              <p>{entry.message}</p>
              <p className="timestamp">
                {new Date(entry.created_at).toLocaleString()}
              </p>
            </li>
          ))
        ) : (
          <p>No entries yet. Be the first to sign the guest book!</p>
        )}
      </ul>
    </div>
  );
};

export default App;
