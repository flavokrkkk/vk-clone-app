const express = require("express");
const cors = require("cors");
const events = require("events");

const PORT = 5000;

const emmiter = new events.EventEmitter();

const app = express();

app.get("get-messages", (req, res) => {
  emmiter.once("new-message", (message) => {
    res.json(message);
  });
});

app.post("new-messages", (req, res) => {
  const message = req.body;
  emmiter.emit("new-messsage", message);
  res.status(200);
});

const serverStart = () =>
  app.listen(() => console.log(`Server started on port ${PORT}`));

serverStart();
