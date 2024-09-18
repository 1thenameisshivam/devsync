import User from "../models/user.js";
import { signupValidation, loginValidation } from "../utils/validation.js";
import bcrypt from "bcrypt";

export const signUp = async (req, res) => {
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
    res.status(201).send({ message: "user added successfully", status: true });
  } catch (err) {
    res.status(400).send({ message: err.message, status: false });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    loginValidation(req);
    const user = await User.find({ email }).select("+password");

    if (user.length === 0) {
      return res
        .status(404)
        .send({ message: "Invalid credentials", status: false });
    }
    const isMatch = await user[0].validatePassword(password);
    if (!isMatch) {
      return res
        .status(401)
        .send({ message: "Invalid credentials", status: false });
    }
    const token = await user[0].jwtToken();
    res.cookie("token", token);
    res.status(200).send({ message: "Login successful", sucess: true });
  } catch (err) {
    res.status(400).send({ message: err.message, status: false });
  }
};

export const logOut = async (req, res) => {
  res.cookie("token", "", { expires: new Date(Date.now()) });
  res.status(200).send({ message: "Logged out successfully", status: true });
};
