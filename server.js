const express = require('express')
const server = express()
require('dotenv').config()
const path = require('path')
const ejs = require('ejs')
const helmet = require('helmet')
const { session, sessionStore } = require('./services/database')

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
    expires: new Date(Date.now() + (30 * 86400 * 1000)),
    cookie: { maxAge: new Date(Date.now() + (30 * 86400 * 1000)) }
}));

server.set("view engine", "ejs")
server.set("views", path.join(__dirname, 'views'))

server.use(express.static(path.join(__dirname, 'views')))
server.use(express.static(path.join(__dirname, 'views', 'assets')))

server.get('/', (req, res) => {
    res.render("home", {
        title: "Welcome to NADP Server (I)"
    })
})

server.get('/login', (req, res) => {
    res.render("login", {
        title: "Login | NADP Server (I)",
        isConnected: req.session.dbconnected
    })
})

const dashboardRoute = require('./routes/dashboard')
server.use('/dashboard', dashboardRoute)

const loginRoute = require('./routes/login')
server.use('/forms', loginRoute)

server.get('*', (req, res) => {
    res.render('404', {
        title: "NADP (I) - Page not found"
    })
})

const port = process.env.PORT || 4000
server.listen(port, () => {
    console.log(`Server is running on ${port}`)
})