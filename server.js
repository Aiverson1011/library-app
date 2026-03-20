require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("./config/passport");

const bookRoutes = require("./routes/bookRoutes");
const authorRoutes = require("./routes/authorRoutes");
const loanRoutes = require("./routes/loanRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");


const app = express();
app.use(express.json())


app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());


app.use("/books", bookRoutes);
app.use("/authors", authorRoutes);
app.use("/loans", loanRoutes);
app.use("/users", userRoutes);
app.use("/auth", authRoutes);

const PORT = 3000;


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