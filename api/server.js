const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

// Routers
const AuthRouter = require('../auth/authRouter');
const UserRouter = require('../users/userRouter');

// init server
const server = express();

//server config
server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api', AuthRouter);
server.use('/api', UserRouter);

server.get("/", (req, res) => {
    res.send("Server running");
});

module.exports = server;