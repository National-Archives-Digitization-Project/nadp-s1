const express = require('express');
const server = express();
require('dotenv').config();
const helmet = require('helmet');
const cors = require('cors');

// const morgan = require("morgan");
const compression = require("compression");
const { verifyAPIRequests } = require('./middlewares');

server.use(express.urlencoded({ extended: false, limit: "30mb" }));
server.use(express.json({ limit: "30mb" }));
server.use(helmet());

//CORS middleware
// var allowCrossDomain = function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,HEAD');
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// }

server.use(cors({
    origin: true,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    allowCrossDomain: true,
    optionsSuccessStatus: 200,
    preflightContinue: true,
    credentials: true,
    maxAge: 3600,
    allowedHeaders: ["Content-Type", "x-api-key", "Origin", "X-Requested-With", "Accept"]
}));


// server.use(morgan('common'));
server.use(compression());

// Verify the API Key
server.use(verifyAPIRequests);
// Verify the API Key

// V1 endpoints //
const { requests, users, archives, divisions, states, provinces, logs, contexts } = require('./routes/v1');
server.use("/api/v1/users", users);
server.use("/api/v1/requests", requests);
server.use("/api/v1/divisions", divisions);
server.use("/api/v1/provinces", provinces);
server.use("/api/v1/archives", archives);
server.use("/api/v1/logs", logs);
server.use("/api/v1/states", states);
server.use("/api/v1/contexts", contexts);
// V1 endpoints //

server.get('*', (req, res) => {
    res.status(500).json({ status: 0, err: 0, errMsg: "Invalid API endpoint", data: {} });
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`Server is running on ${port}`);
});