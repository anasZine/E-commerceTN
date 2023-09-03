const express = require('express')
const path = require('path')
const RouterHome = require('./routers/home.route')
const RouterBook = require('./routers/book.route')
const routerAuth = require('./routers/auth.route')
const routerId = require('./routers/id.route')
const flash = require('connect-flash')//mte3 lalert
const session = require('express-session')
const { Collection } = require('mongoose')
const MongoDBStore = require('connect-mongodb-session')(session);

const app = express()

app.use(express.static(path.join(__dirname, 'assets')))
app.set('view engine', 'ejs')
app.set('views', 'views')


var Store = new MongoDBStore({
    uri: 'mongodb://localhost:27017/library',
    collection: 'sessions'
})
app.use(flash())
app.use(session({
    secret: 'this is my secret key kfgqeflbadskfvadkfvALSDFVJA',

    store: Store,
    resave: true,
    saveUninitialized: true

}))
app.get('/contact', (req, res, next) => {
    res.render('contact', { verifUser: req.session.userId })
})
app.get('/about', (req, res, next) => {
    res.render('about', { verifUser: req.session.userId })
})
app.get('/dashboard', (req, res, next) => {
    res.render('dashboard', { verifUser: req.session.userId })
})
app.get('/tables', (req, res, next) => {
    res.render('tables', { verifUser: req.session.userId })
})
app.use('/', RouterHome)
app.use('/', RouterBook)
app.use('/', routerAuth)
app.use('/', routerId)



/*
app.get('/mybooks', (req, res, next) => {
    res.render('mybooks', { verifUser: req.session.userId })
})
 */











app.listen(9000, () => console.log('server run on port 9000'))

