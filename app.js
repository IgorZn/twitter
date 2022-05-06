const express = require('express');
const app = express();
const path = require('path')
const bodyParser = require('body-parser');

require('dotenv').config()

const PORT = 4000
const connectDB = require("./config/db");

// Connect to DB
connectDB()

app.set('view engine', 'pug');
app.set('views', 'views');

// Middleware
const { requireLogin } = require("./middleware/login.middleware");

// Body parsers
    /* Pure POST */
app.use(express.json());
    /* Form-data POST */
app.use(bodyParser.urlencoded({ extended: false }))


// Static files
app.use(express.static(path.join(__dirname, '/public')));

// Routes
const loginRoute = require('./routes/login.routes')
const registerRoute = require('./routes/register.routes')


// Mount routes
app.use('/login', loginRoute)
app.use('/register', registerRoute)


// Root path
app.get('/', requireLogin, (req, res, next) => {
    let payload = {
        pageTitle: "Home page title"
    }

    res.status(200).render("home", payload)
})


// Start server
const server = app.listen(PORT, function () {
    console.log(`Server running on ${PORT}`)
    console.log(`http://localhost:${PORT}`)
})