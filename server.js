const express = require('express')
const server = express()
require('dotenv').config()
const path = require('path')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const { authJwt } = require("./middlewares")

const dbCon = require('./models')

server.use(express.urlencoded({ extended: true }))
server.use(express.json())
server.use(cookieParser())
server.use(helmet())
server.use(dbCon.session({
    secret: 'NADP1',
    name: 'NADP1',
    store: dbCon.sessionStore, // connect-mongo session store
    proxy: true,
    resave: true,
    saveUninitialized: false,
    expires: 600000,
    cookie: {
        expires: 600000
    }
}));

server.use('/dashboard', authJwt.verifyToken, (req, res, next) => {
    let verified = req.verified;
    if (!req.session.isLogggedIn || !verified) {
        res.redirect('/')
    }
    req.session.isLogggedIn = true
    next()
})


const setup = require('./utils/setup')
dbCon.mongoose.connection
    .on('open', () => {
        console.log('Db Connected!')
        setup(dbCon)
    })
    .on('error', (err) => {
        console.log('Db failed to connect!')
    });


server.set("view engine", "ejs")
server.set("views", path.join(__dirname, 'views'))

server.use(express.static(path.join(__dirname, 'views')))
server.use(express.static(path.join(__dirname, 'views', 'assets')))

server.get('/', (req, res) => {
    res.render("home", {
        title: "Welcome to NADP Server (I)"
    })
})

const dashboardRoute = require('./routes/dashboard')
server.use('/dashboard', dashboardRoute)

const loginRoute = require('./routes/login')
server.use('/login', loginRoute)

server.get('*', (req, res) => {
    res.render('404', {
        title: "NADP (I) - Page not found"
    })
})


const port = process.env.PORT || 4000
server.listen(port, () => {
    console.log(`Server is running on ${port}`)
})