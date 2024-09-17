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

app.get("/user", async (req, res) => {
  try {
    const user = await User.find({ email: req.body.email });
    if (user.length === 0) {
      return res.status(404).send("user not found");
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.delete("/user", async (req, res) => {
  const id = req.body.id;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).send("user deleted successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.patch("/user/:id", async (req, res) => {
  const { id } = req.params;
  const ALLOWED_FIELDS = ["about", "gender", "age", "photoUrl", "skills"];
  const isUpdateAllowed = Object.keys(req.body).every((key) =>
    ALLOWED_FIELDS.includes(key)
  );
  if (!isUpdateAllowed) {
    return res.status(400).send("Invalid fields for update");
  }
  try {
    await User.findByIdAndUpdate({ _id: id }, req.body, {
      runValidators: true,
    });
    res.status(200).send("user updated successfully");
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
