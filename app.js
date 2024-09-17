import express from "express";
import { DataBase } from "./src/config/DataBase.js";
import User from "./src/models/user.js";
const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send("user added successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

DataBase()
  .then(() => {
    console.log("Database connected");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("database is not able to connect", err);
  });
