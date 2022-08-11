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


const v1Router = require('./routes/ver1');
server.use("/ver/1/", v1Router);

server.get('*', (req, res) => {
    res.status(200).json({ result: 0, data: [], err: 0, errMsg: "Access denied" })
})

const port = process.env.PORT || 4000
server.listen(port, () => {
    console.log(`Server is running on ${port}`)
})