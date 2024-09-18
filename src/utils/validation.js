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
