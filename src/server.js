require("dotenv").config();
const express = require("express");
const app = express();
const SQLconnection = require("./db/connection");
const userRouter = require("./routes/userroutes");
const gamesRouter = require("./routes/gamesrouter");
const User = require("./models/user");
const Games = require("./models/games");

const cors = require("cors");

const port = process.env.PORT || 5002

app.use(cors());

app.use(express.json());

app.use(userRouter, gamesRouter);

function syncTables() {
    User.sync()
    Games.sync()
};

app.get("/health", (req,res) => {
    res.status(200).json({message: "API is up and running"})
});

app.listen (port, () => {
    console.log(`app is listening on Port ${port}`)
    syncTables();
});