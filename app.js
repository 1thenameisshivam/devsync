import express from "express";
import { DataBase } from "./src/config/DataBase.js";
import User from "./src/models/user.js";
import { loginValidation, signupValidation } from "./src/utils/validation.js";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import { isAuthenticated } from "./src/middlewares/isAuthenticated.js";
const app = express();

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  const { password, firstName, lastName, email } = req.body;
  try {
    signupValidation(req);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await user.save();
    const token = await user.jwtToken();
    res.cookie("token", token);
    res.status(201).send("user added successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    loginValidation(req);
    const user = await User.find({ email }).select("+password");

    if (user.length === 0) {
      return res.status(404).send("Invalid credentials");
    }
    const isMatch = await user[0].validatePassword(password);
    if (!isMatch) {
      return res.status(401).send("Invalid credentials");
    }
    const token = await user[0].jwtToken();
    res.cookie("token", token);
    res.status(200).send("Login successful");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.get("/profile", isAuthenticated, async (req, res) => {
  try {
    res.status(200).send(req.user);
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
