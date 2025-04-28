import dotenv from "dotenv";
dotenv.config();

export const baseUrl = process.env.BASE_URL;
export const authUrl = process.env.AUTH_URL;
export const authCredentials = {
  username: process.env.AUTH_USERNAME,
  password: process.env.AUTH_PASSWORD,
};
