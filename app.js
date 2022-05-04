const express = require('express');
const app = express();

const PORT = 4000

app.set('view engine', 'pug');
app.set('views', 'views');

// Middleware
const { requireLogin } = require("./middleware/login.middleware");


// Routes
const loginRoute = require('./routes/login.routes')

// Mount routes
app.use('/login', loginRoute)


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