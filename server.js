const express = require('express')
const server = express()
require('dotenv').config()
const helmet = require('helmet')
const cors = require('cors')
const morgan = require("morgan");
const compression = require("compression");
const { verifyAPI } = require('./middlewares')

server.use(express.urlencoded({ extended: false, limit: "30mb" }))
server.use(express.json({ limit: "30mb" }))
server.use(helmet())
server.use(cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
server.use(morgan('common'));
server.use(compression())

// Verify the API Key
server.use(verifyAPI);
// Verify the API Key


//V1 endpoints//
const { requests, users, archives, divisions, states, logs } = require('./routes/v1')
server.use("/api/v1/users", users);
server.use("/api/v1/requests", requests);
server.use("/api/v1/divisions", divisions);
server.use("/api/v1/archives", archives);
server.use("/api/v1/logs", logs);
server.use("/api/v1/states", states);
//V1 endpoints//

server.get('*', (req, res) => {
    res.status(500).json({ status: 0, err: 0, errMsg: "Invalid API endpoint", data: {} })
})

const port = process.env.PORT || 4000
server.listen(port, () => {
    console.log(`Server is running on ${port}`)
})