require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bookRoutes = require("./routes/bookRoutes");
const authorRoutes = require("./routes/authorRoutes");
const loanRoutes = require("./routes/loanRoutes");
const userRoutes = require("./routes/userRoutes")
const session = require("express-session");
const passport = require("./auth/passport");


const PORT = 3000;

const app = express();
app.use(express.urlencoded({extended: false})); // imp for passport to get the data 
app.use(express.json())

app.use(
    session({
        secret: process.env.Session_Secret || "dev_secret_change_me",
        resave: false,
        saveUninitialized: false

    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/users", userRoutes)
app.use("/books", bookRoutes);
app.use("/authors", authorRoutes);
app.use("/loans", loanRoutes);

app.get("/", (req, res) => {
    res.json({greet: "Hello World"});
});

const MONGODB_URI = process.env.MONGODB_URI;

mongoose
    .connect(MONGODB_URI)
    .then( () => {
        console.log("Connected to MongoDB")

        app.listen(PORT, () => {
            console.log(`App is running on http://localhost:${PORT}`);
        });
    })

    .catch((err) => {
        console.log("Mongo connection error ", err)
    })