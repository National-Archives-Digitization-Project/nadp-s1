const express = require('express')
const server = express()
require('dotenv').config()
const helmet = require('helmet')
const cors = require('cors')

server.use(express.urlencoded({ extended: false, limit: "30mb" }))
server.use(express.json({ limit: "30mb" }))
server.use(helmet())
server.use(cors({
    origin: "*"
}));

//V1 endpoints//
const { requests, users, roles, archives, divisions, states, logs } = require('./routes/v1')
server.use("/api/v1/roles", roles);
server.use("/api/v1/users", users);
server.use("/api/v1/requests", requests);
server.use("/api/v1/divisions", divisions);
server.use("/api/v1/archives", archives);
server.use("/api/v1/logs", logs);
server.use("/api/v1/states", states);
//V1 endpoints//

server.get('*', (req, res) => {
    res.status(200).json({ status: 0, err: 0, errMsg: "Invalid API endpoint", data: {} })
})

const port = process.env.PORT || 4000
server.listen(port, () => {
    console.log(`Server is running on ${port}`)
})