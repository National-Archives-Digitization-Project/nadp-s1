const express = require('express')
const server = express()
require('dotenv').config()
const path = require('path')
const ejs = require('ejs')
const helmet = require('helmet')
const { session, sessionStore, connected } = require('./services/database')

server.use(express.urlencoded({ extended: true }))
server.use(express.json())
server.use(helmet())
server.use(session({
    secret: 'NADP1',
    name: 'NADP1',
    store: sessionStore, // connect-mongo session store
    proxy: true,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

server.set("view engine", "ejs")
server.set("views", path.join(__dirname, 'views'))

server.get("/", (req, res) => {
    res.send("We are here")
})

const port = process.env.PORT || 4000
server.listen(port, () => {
    console.log(`Server is running on ${port}`)
})