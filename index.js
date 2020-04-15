const express = require("express");
const config = require('config')
const mongoose = require('mongoose');
const customers = require('./routes/customers');
const genres = require("./routes/genres");
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth')
const app = express();
app.use(express.json());

if (!config.get('jwtPrivateKey')) {
    console.error("FATAL ERROR: jwtPrivateKey not defined")
    process.exit(1)
}
mongoose.connect("mongodb://localhost/vidlyApp", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true })
    .then(() => console.log("Connected to MongoBD..."))
    .catch((err) => console.error("Error", err))

app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/login", auth)

app.get("/", (req, res) => {
    res.send("WELCOME TO HOME PAGE");
});

app.listen(3000, () => console.log("Listening to port 3000..."));