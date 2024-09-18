import {
  updatePasswordValidation,
  updateProfileValidation,
} from "../utils/validation.js";
import bcrypt from "bcrypt";

export const view = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).send({ user, status: true });
  } catch (err) {
    res.status(500).send({ message: err.message, status: false });
  }
};

export const updateProfile = async (req, res) => {
  try {
    updateProfileValidation(req);
    const user = req.user;
    Object.keys(req.body).forEach((keys) => (user[keys] = req.body[keys]));
    await user.save();
    res
      .status(200)
      .send({ message: "Profile updated successfully", status: true });
  } catch (err) {
    res.status(400).send({ message: err.message, status: false });
  }
};

export const updatePassword = async (req, res) => {
  try {
    updatePasswordValidation(req);
    const { password, newPassword } = req.body;

    const user = req.user;
    const isValid = await user.validatePassword(password);
    if (!isValid) {
      return res
        .status(401)
        .send({ message: "Invalid password", status: false });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user["password"] = hashedPassword;

    await user.save();
    res
      .status(200)
      .send({ message: "Password updated successfully", status: true });
  } catch (err) {
    res.status(400).send({ message: err.message, status: false });
  }
};
