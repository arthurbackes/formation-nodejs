const express = require("express");
const errorHandler = require("./middleware/errorHandler.js")
const connectDb = require("./config/dbConnection.js")
const dotenv = require("dotenv").config();

connectDb();

const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));



app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes.js"));
app.use("/api/mylists", require("./routes/listsRoutes"));
app.use(errorHandler);


app.get("/", (req, res, next) => {
    res.render("index");
});

app.get('/login', (req, res) => {
    res.render("login");
})

app.get("/register", (req, res) => {
    res.render("register");
})


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
