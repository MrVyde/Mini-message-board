##  Mini Message Board

A simple Node.js + Express application using EJS templates to create a mini message board. Users can view messages, add new ones, and open individual message details.

## Features

Display a list of messages on the index page.

Add a new message via a form.

View details of a single message.

Simple in-memory storage (no database).

## Project Structure

mini-message-board/
├── app.js              # Main Express server
├── views/
│   ├── index.ejs       # Displays all messages
│   ├── form.ejs        # Form to add a new message
│   ├── newmessage.ejs  # Displays details of a single message
└── package.json

## Routes

GET / → Renders index.ejs with all messages.

GET /new → Renders form.ejs to add a new message.

POST /submit → Handles form submission, adds message to array, redirects to index.

GET /message/:id → Renders newmessage.ejs with details of a single message.

## Example Flow

Visit / → See all messages.

Click Add a new message → Go to /new.

Fill out form → POST /submit → Message added.

Redirect back to / → New message appears in list.

Click Open → Go to /message/:id → See message details.

# Sample Code

app.js

const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));

const messages = [
  { text: "Hi there!", user: "Amando", added: new Date() },
  { text: "Hello World!", user: "Charles", added: new Date() }
];

app.set("view engine", "ejs");

app.get("/", (req, res) => res.render("index", { messages }));
app.get("/new", (req, res) => res.render("form"));
app.post("/submit", (req, res) => {
  const { author, messageText } = req.body;
  messages.push({ text: messageText, user: author, added: new Date() });
  res.redirect("/");
});
app.get("/message/:id", (req, res) => {
  const msg = messages[req.params.id];
  if (!msg) return res.status(404).send("Message not found");
  res.render("newmessage", { msg });
});

app.listen(4000, () => console.log("Server running at http://localhost:4000"));

## How to Run

Install dependencies:

npm install express ejs

Start the server:

node app.js

Open in browser:

http://localhost:4000/ → Index page

http://localhost:4000/new → Add new message

http://localhost:4000/message/0 → View first message

## Notes

Messages are stored in memory; restarting the server clears them.

For production, replace with a database (MongoDB, PostgreSQL, etc.).