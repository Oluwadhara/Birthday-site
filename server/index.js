const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

const messagesFile = "./messages.json";

app.get("/api/messages", (req, res) => {
  fs.readFile(messagesFile, (err, data) => {
    if (err) return res.status(500).send("Error reading messages.");
    res.send(JSON.parse(data));
  });
});

app.post("/api/messages", (req, res) => {
  const newMessage = req.body;

  fs.readFile(messagesFile, (err, data) => {
    if (err) return res.status(500).send("Error reading messages.");

    const messages = JSON.parse(data);
    messages.push(newMessage);

    fs.writeFile(messagesFile, JSON.stringify(messages, null, 2), (err) => {
      if (err) return res.status(500).send("Error saving message.");
      res.status(201).send("Message saved!");
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
