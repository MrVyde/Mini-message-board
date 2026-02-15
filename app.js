const express = require("express");
const path = require("node:path");


const app = express(); // ← create the app FIRST

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

// Tell Express to use EJS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// parse the incoming data and put it into req.body.”
app.use(express.urlencoded({ extended: true }));

// Route
app.get("/", (req, res) => {
  res.render("index", { title: "Mini Messageboard", messages });
});

app.get("/new", (req, res) => {
    res.render("form")
});

app.post("/submit", (req, res) => {
  const messageUser = req.body.author;
  const messageText = req.body.messageText;

  messages.push({ text: messageText, user: messageUser, added: new Date() });

  res.redirect("/"); // send user back to index after submitting
});

app.get("/newmessage/:id", (req, res) => {
  const id = req.params.id;
  const msg = messages[id];

  if (!msg) {
    return res.status(404).send("Message not found");
  }

  res.render("newmessage", { msg });
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

