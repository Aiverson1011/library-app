const express = require("express");
const app = express();
app.use(express.json())
const bookRoutes = require("./routes/bookRoutes");

const PORT = 3000;

app.use("/books", bookRoutes);
app.get("/", (req, res) => {
    res.json({greet: "Hello World"});
});

app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`);
});