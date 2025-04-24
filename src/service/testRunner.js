import axios from "axios";
import dotenv from "dotenv";
import { response } from "express";

dotenv.config();

const baseUrl = process.env.BASE_URL;

function formatRoute(route) {
  return route.replace(/{[^}]+}/g, "1");
}

export async function runGetTests(paths) {
  const results = [];

  for (const route in paths) {
    if (paths[route].get) {
      const url = `${baseUrl}${formatRoute(route)}`;
      const start = Date.now();

      try {
        const response = await axios.get(url);
        const duration = Date.now() - start;
        results.push({
          method: "GET",
          route,
          responseTime: duration,
          error: null,
          status: response.status,
        });
      } catch (err) {
        const duration = Date.now() - start;
        const status = err.response?.status;
        results.push({
          method: "GET",
          route,
          responseTime: duration,
          error: err.message,
          status: status ?? "unknown",
        });
      }
    }
  }

  return results;
}

export async function runPostTests(paths) {
  const results = [];

  for (const route in paths) {
    if (paths[route].post) {
      const url = `${baseUrl}${formatRoute(route)}`;
      const start = Date.now();
      const payload = {
        nome: "Teste Nome",
        email: "teste@email.com",
      };

      try {
        const response = await axios.post(url, payload);
        const duration = Date.now() - start;
        results.push({
          method: "POST",
          route,
          responseTime: duration,
          error: null,
          status: response.status,
        });
      } catch (err) {
        const duration = Date.now() - start;
        const status = err.response?.status;
        results.push({
          method: "POST",
          responseTime: duration,
          route,
          error: err.message,
          status: status ?? "unknown",
        });
      }
    }
  }

  return results;
}

export async function runPutTests(paths) {
  const results = [];
  for (const route in paths) {
    if (paths[route].put) {
      const url = `${baseUrl}${formatRoute(route)}`;
      const start = Date.now();
      try {
        const response = await axios.put(url, {});
        const duration = Date.now() - start;
        results.push({
          method: "PUT",
          route,
          responseTime: duration,
          error: null,
          status: response.status,
        });
      } catch (err) {
        const duration = Date.now() - start;
        const status = err.response?.status ?? "unknown";
        results.push({
          method: "PUT",
          responseTime: duration,
          route,
          status,
          error: err.message,
        });
      }
    }
  }
  return results;
}

export async function runDeleteTests(paths) {
  const results = [];
  for (const route in paths) {
    if (paths[route].delete) {
      const url = `${baseUrl}${formatRoute(route)}`;
      const start = Date.now();
      try {
        const response = await axios.delete(url);
        const duration = Date.now() - start;
        results.push({
          method: "DELETE",
          route,
          responseTime: duration,
          error: null,
          status: response.status,
        });
      } catch (err) {
        const duration = Date.now() - start;
        const status = err.response?.status ?? "unknown";
        results.push({
          method: "DELETE",
          route,
          responseTime: duration,
          status,
          error: err.message,
        });
      }
    }
  }
  return results;
}
