import axios from "axios";
import dotenv from "dotenv";

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

      try {
        const response = await axios.get(url);
        results.push({
          method: "GET",
          route,
          error: null,
          status: response.status,
        });
      } catch (err) {
        const status = err.response?.status;
        results.push({
          method: "GET",
          route,
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

      const payload = {
        nome: "Teste Nome",
        email: "teste@email.com",
      };

      try {
        const response = await axios.post(url, payload);
        results.push({
          method: "POST",
          route,
          error: null,
          status: response.status,
        });
      } catch (err) {
        const status = err.response?.status;
        results.push({
          method: "POST",
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
      try {
        const response = await axios.put(url, {}); // payload mockado
        results.push({
          method: "PUT",
          route,
          error: null,
          status: response.status,
        });
      } catch (err) {
        const status = err.response?.status ?? "unknown";
        results.push({
          method: "PUT",
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
      try {
        const response = await axios.delete(url);
        results.push({
          method: "DELETE",
          route,
          error: null,
          status: response.status,
        });
      } catch (err) {
        const status = err.response?.status ?? "unknown";
        results.push({
          method: "DELETE",
          route,
          status,
          error: err.message,
        });
      }
    }
  }
  return results;
}
