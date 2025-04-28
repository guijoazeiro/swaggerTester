import dotenv from "dotenv";
import { authCredentials, authUrl } from "../config/envConfig.js";
dotenv.config();

const authManager = {
  token: "",
  expiresAt: 0,
  credentials: {
    username: authCredentials.username,
    password: authCredentials.password,
  },
  authUrl: authUrl,

  async login() {
    const response = await fetch(this.authUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.credentials),
    });

    if (!response.ok) {
      throw new Error("Falha ao fazer login no sistema de autenticação");
    }

    const data = await response.json();
    this.token = data.token;

    if (data.expires_in) {
      this.expiresAt = Date.now() + data.expires_in * 1000;
    } else if (data.expireAt) {
      this.expiresAt = new Date(data.expireAt).getTime();
    } else {
      this.expiresAt = Date.now() + 3600 * 1000;
    }
  },

  async getToken() {
    if (!this.token || Date.now() >= this.expiresAt) {
      await this.login();
    }
    return this.token;
  },
};

export default authManager;
