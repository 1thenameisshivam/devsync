import mongoose from "mongoose";
import validator from "validator";
//Password Strength Libraries: You can use third-party libraries like zxcvbn or password-validator to measure the strength of the password and enforce stronger security rules.
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      minLength: [3, "First name must be at least 3 characters long"],
      maxLength: [50, "First name must be at most 50 characters long"],
      validate(value) {
        if (!validator.isAlpha(value)) {
          throw new Error("First name must contain only letters");
        }
      },
    },
    lastName: {
      type: String,
      minLength: [3, "Last name must be at least 3 characters long"],
      maxLength: [50, "Last name must be at most 50 characters long"],
      validate(value) {
        if (!validator.isAlpha(value)) {
          throw new Error("Last name must contain only letters");
        }
      },
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    password: {
      type: String,
      select: false,
      required: true,
      maxLength: [150, "Password must be at most 150 characters long"],
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Password is not strong enough");
        }
      },
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("Gender must be mail, female or other");
        }
      },
    },
    age: {
      type: Number,
      min: [18, "Age must be at least 18 years"],
    },
    photoUrl: {
      type: String,
      default:
        "https://st.depositphotos.com/1779253/5140/v/450/depositphotos_51405259-stock-illustration-male-avatar-profile-picture-use.jpg",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Photo URL is invalid");
        }
      },
    },
    about: {
      type: String,
      default: "Hey there! I'm using DevSync.",
      maxLength: [150, "About must be at most 150 characters long"],
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
