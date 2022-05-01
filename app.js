const express = require('express');
const app = express();

const PORT = 4000

app.set('view engine', 'pug');
app.set('views', 'views');

app.get('/', (req, res, next) => {
    res.status(200).render("home")
})


const server = app.listen(PORT, function () {
    console.log(`Server running on ${PORT}`)
    console.log(`http://localhost:${PORT}`)
})