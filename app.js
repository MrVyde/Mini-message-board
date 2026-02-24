require("dotenv").config();
const express = require("express");
const path = require("node:path");

const PORT = 4000;

const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const app = express(); // ← create the app FIRST

const { body, validationResult } = require("express-validator");

// Validation rules for the message form
const validateMessage = [
  body("author")
    .trim()
    .notEmpty().withMessage("Author name is required.")
    .isLength({ max: 50 }).withMessage("Author name must be at most 50 characters.")
    .matches(/^[A-Za-z\s]+$/).withMessage("Author name must only contain letters and spaces."),
  
  body("messageText")
    .trim()
    .notEmpty().withMessage("Message text is required.")
    .isLength({ max: 500 }).withMessage("Message text must be at most 500 characters."),
];

function escapeHtml(text) {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

// Tell Express to use EJS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// parse the incoming data and put it into req.body.”
app.use(express.urlencoded({ extended: true }));

// Route
app.get("/", async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM messages ORDER BY added DESC"
    );

    res.render("index", {
      title: "Mini Messageboard",
      messages: rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

app.get("/new", (req, res) => {
    res.render("form", { 
      errors: [], 
      author: "", 
      messageText: "" })
});


app.post("/submit", validateMessage, async (req, res) => {
  const errors = validationResult(req);
  const { author, messageText } = req.body;

  if (!errors.isEmpty()) {
    // Send errors and previous input back to form
    return res.status(400).render("form", {
      errors: errors.array().map(e => e.msg),
      author,
      messageText
    });
  }

  try {
    // Escape HTML to prevent XSS
    const safeAuthor = escapeHtml(author);
    const safeMessage = escapeHtml(messageText);

    await pool.query(
      "INSERT INTO messages (user_name, message_text) VALUES ($1, $2)",
      [safeAuthor, safeMessage]
    );

    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving message");
  }
});

app.get("/newmessage/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const { rows } = await pool.query(
      "SELECT * FROM messages WHERE id = $1",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).send("Message not found");
    }

    res.render("newmessage", { msg: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port  http://localhost:${PORT}`);
});


