import dotenv from "dotenv";

dotenv.config();

export const { MONGO_URI, JWT_SECRET, PORT, FRONTEND_URL } = process.env;
