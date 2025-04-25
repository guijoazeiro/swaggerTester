import dotenv from "dotenv";
import { requestWithFormat } from "../utils/requestWithFormat.js";

dotenv.config();

const baseUrl = process.env.BASE_URL;

function formatRoute(route) {
  return route.replace(/{[^}]+}/g, "1");
}

async function runMethodTests(paths, method) {
  const results = [];

  for (const route in paths) {
    if (paths[route][method]) {
      const formattedRoute = formatRoute(route);
      const url = `${baseUrl}${formattedRoute}`;

      const result = await requestWithFormat({
        method,
        url,
        route,
      });

      results.push(result);
    }
  }

  return results;
}

export const runTestsByMethod = {
  get: (paths) => runMethodTests(paths, "get"),
  post: (paths) => runMethodTests(paths, "post"),
  put: (paths) => runMethodTests(paths, "put"),
  delete: (paths) => runMethodTests(paths, "delete"),
};
