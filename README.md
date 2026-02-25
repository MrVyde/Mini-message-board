##  Mini Message Board

A simple Node.js + Express application using EJS templates to create a mini message board. Users can view messages, add new ones, and open individual message details.

## Live Demo

Deployed on Render:
https://mini-message-board-rb3o.onrender.com

## Features

Display a list of messages on the index page.

Add a new message via a form.

View details of a single message.

Simple in-memory storage (no database).

Persistent storage using PostgreSQL

Environment-based configuration (local + production)

Deployed on Render

## Tech Stack

Node.js

Express

EJS

PostgreSQL

pg (node-postgres)

Render (deployment)

## Project Structure

mini-message-board/
├── app.js # Main Express server
├── pool.js # PostgreSQL connection configuration
├── views/
│ ├── index.ejs # Displays all messages
│ ├── form.ejs # Form to add a new message
│ ├── newmessage.ejs # Displays details of a single message
├── package.json
├── .env # Local environment variables (not committed)
└── README.md

## Database Setup

### This project uses PostgreSQL instead of in-memory storage.

#### Local Development

Install PostgreSQL locally.

Create a database:

createdb mini_message_board

Create a .env file in the root directory:

DATABASE_URL=postgres://username:password@localhost:5432/mini_message_board

Install dependencies and start the app:

npm install
npm start

### Production (Render)

The app is deployed on Render and uses:

A Render-managed PostgreSQL database

Environment variables configured in the Render dashboard

External database URL for connectivity

#### Note: The .env file is not used in production.

Environment variables are set in:

Render Dashboard → Web Service → Settings → Environment → Environment Variables

Example:

DATABASE_URL=postgres://username:password@external-host:5432/database_name

## Database Schema

Table: messages

Column	Type	Description
id	INTEGER	Primary key (auto-generated)
user_name	TEXT	Name of the message author
message_text	TEXT	Message content
added	TIMESTAMP	Date message was created

## Example Flow

Visit / → See all messages.

Click Add a new message → Go to /new.

Fill out form → POST /submit → Message added.

Redirect back to / → New message appears in list.

Click Open → Go to /message/:id → See message details.

## Notes

Messages are stored in PostgreSQL and persist between restarts.

Environment variables are used for database configuration.

.env is ignored in Git (do not commit secrets).

Production deployment is handled by Render.


## How to Run

Install dependencies:

npm install express ejs

Start the server:

node app.js

Open in browser:

http://localhost:4000/ → Index page

http://localhost:4000/new → Add new message

http://localhost:4000/message/0 → View first message
