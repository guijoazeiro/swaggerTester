import { requestWithFormat } from "../utils/requestWithFormat.js";
import { baseUrl } from "../config/envConfig.js";

function formatRoute(route) {
  return route.replace(/{[^}]+}/g, "1");
}

const specialRequestBodies = {
  "/auth/login": {
    username: process.env.TEST_USERNAME || "admin",
    password: process.env.TEST_PASSWORD || "admin",
  },
};

async function runMethodTests(paths, method, token = "") {
  const results = [];

  for (const route in paths) {
    if (paths[route][method]) {
      const formattedRoute = formatRoute(route);
      const url = `${baseUrl}${formattedRoute}`;

      const headers = {};
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const result = await requestWithFormat({
        method,
        url,
        route,
        headers,
      });

      results.push(result);
    }
  }

  return results;
}

export const runTestsByMethod = {
  get: (paths, token) => runMethodTests(paths, "get", token),
  post: (paths, token) => runMethodTests(paths, "post", token),
  put: (paths, token) => runMethodTests(paths, "put", token),
  delete: (paths, token) => runMethodTests(paths, "delete", token),
};
