require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json())
const bookRoutes = require("./routes/bookRoutes");
const authorRoutes = require("./routes/authorRoutes");
const loanRoutes = require("./routes/loanRoutes");

const PORT = 3000;

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