const express = require('express')
const server = express()
require('dotenv').config()
const path = require('path')
const helmet = require('helmet')
const { authJwt } = require("./middlewares")

const dbCon = require('./models')

server.use(express.urlencoded({ extended: true }))
server.use(express.json())
server.use(helmet())

const setup = require('./utils/setup')
dbCon.mongoose.connection
    .on('open', () => {
        console.log('Db Connected!')
        setup(dbCon)
    })
    .on('error', (err) => {
        console.log('Db failed to connect!')
    });


//V1 endpoints//
const { requests, users, roles } = require('./routes/v1')
server.use("/api/v1/roles", roles);
server.use("/api/v1/users", users);
server.use("/api/v1/requests", requests);


server.get('*', (req, res) => {
    res.status(200).json({ status: 0, err: 0, errMsg: "Invalid API endpoint", data: [] })
})

const port = process.env.PORT || 4000
server.listen(port, () => {
    console.log(`Server is running on ${port}`)
})