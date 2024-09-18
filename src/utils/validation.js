import validator from "validator";
export const signupValidation = (req) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !email || !password) {
    throw new Error("All fields are required");
  }
};

export const loginValidation = (req) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error("Email and password are required");
  }
};

export const updateProfileValidation = (req) => {
  const ALLOWED_VALIDATION = ["gender", "age", "photoUrl", "skills"];
  const isUpdateAllowed = Object.keys(req.body).every((key) =>
    ALLOWED_VALIDATION.includes(key)
  );
  if (!isUpdateAllowed) {
    throw new Error("Invalid fields for update");
  }
  if (req.body?.skills.length > 100) {
    throw new Error("Skills must be less than 100 characters");
  }
};

export const updatePasswordValidation = (req) => {
  const ALLOWED_VALIDATION = ["password", "newPassword"];
  const isUpdateAllowed = Object.keys(req.body).every((key) =>
    ALLOWED_VALIDATION.includes(key)
  );
  if (!isUpdateAllowed) {
    throw new Error("Invalid fields for update");
  }
  if (!req.body.password || !req.body.newPassword) {
    throw new Error("Password and new password are required");
  }
  if (!validator.isStrongPassword(req.body.newPassword)) {
    throw new Error("New password is not strong enough");
  }
};
