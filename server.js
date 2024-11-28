const express = require("express");
const errorHandler = require("./middleware/errorHandler.js")
const connectDb = require("./config/dbConnection.js")
const dotenv = require("dotenv").config();
connectDb();
const app = express();
app.set("view engine", "ejs");
app.set("views", "./views");
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes.js"));
app.use("/api/mylists", require("./routes/listsRoutes"));
app.use(errorHandler);




app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})