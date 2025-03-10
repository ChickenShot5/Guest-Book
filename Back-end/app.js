const express = require("express");
const cors = require("cors");
const { getEntries, addEntry } = require("./database");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/entries", (req, res) => {
  const entries = getEntries();
  res.json(entries);
});

app.post("/entries", (req, res) => {
  const { name, message } = req.body;
  if (!name || !message) {
    return res
      .status(400)
      .json({ error: "Both name and message are required." });
  }

  addEntry(name, message);
  res.status(201).json({ success: "Entry added successfully." });
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
