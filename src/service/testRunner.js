import dotenv from "dotenv";
import { requestWithFormat } from "../utils/requestWithFormat.js";

dotenv.config();

const baseUrl = process.env.BASE_URL;

function formatRoute(route) {
  console;
  return route.replace(/{[^}]+}/g, "1");
}

export async function runGetTests(paths) {
  const results = [];

  for (const route in paths) {
    if (paths[route].get) {
      const formattedRoute = formatRoute(route);
      const url = `${baseUrl}${formattedRoute}`;

      const result = await requestWithFormat({
        method: "GET",
        url,
        route,
      });

      results.push(result);
    }
  }

  return results;
}

export async function runPostTests(paths) {
  const results = [];

  for (const route in paths) {
    if (paths[route].post) {
      const formattedRoute = formatRoute(route);
      const url = `${baseUrl}${formattedRoute}`;

      const result = await requestWithFormat({
        method: "POST",
        url,
        route,
      });

      results.push(result);
    }
  }

  return results;
}

export async function runPutTests(paths) {
  const results = [];
  for (const route in paths) {
    if (paths[route].put) {
      const formattedRoute = formatRoute(route);
      const url = `${baseUrl}${formattedRoute}`;

      const result = await requestWithFormat({
        method: "PUT",
        url,
        route,
      });

      results.push(result);
    }
  }
  return results;
}

export async function runDeleteTests(paths) {
  const results = [];
  for (const route in paths) {
    if (paths[route].delete) {
      const formattedRoute = formatRoute(route);
      const url = `${baseUrl}${formattedRoute}`;

      const result = await requestWithFormat({
        method: "DELETE",
        url,
        route,
      });

      results.push(result);
    }
  }
  return results;
}
