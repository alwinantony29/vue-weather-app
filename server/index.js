require("dotenv").config();
const express = require("express");
const app = express();
const User = require("./api/user/user.controller");
const connectDB = require("./config/database");

app.use(express.json());
app.get("/", (_, res) => res.send("Hello from server"));
app.use("/users", User);

connectDB()
  .then(() => {
    console.log("Database connected, starting server 🚀");
    app.listen(process.env.PORT || 3001, () => {
      console.log(
        "server started at ",
        `http://localhost:${process.env.PORT || 3001}`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
