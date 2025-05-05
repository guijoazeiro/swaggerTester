import dotenv from "dotenv";
import { authCredentials, authUrl } from "../config/envConfig.js";
import { GlobalConfig } from "../config/globalConfig.js";
dotenv.config();

const authManager = {
  token: "",
  expiresAt: 0,
  credentials: {
    username: authCredentials.username,
    password: authCredentials.password,
  },
  authUrl: authUrl,

  override({ url, username, password }) {
    this.authUrl = GlobalConfig.authUrl;
    this.credentials.username = username;
    this.credentials.password = password;
  },

  async login() {
    try {
      const response = await fetch(this.authUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.credentials),
      });

      if (!response.ok) {
        throw new Error(
          `Erro na autenticação: ${response.status} ${response.statusText}`
        );
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
    } catch (err) {
      console.error("❌ Falha ao fazer login no sistema de autenticação:");
      console.error(err.message || err);
      throw new Error("Erro de autenticação: não foi possível obter o token");
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
