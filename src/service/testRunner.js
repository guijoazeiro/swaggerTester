import { requestWithFormat } from "../utils/requestWithFormat.js";
import { getRequestBody } from "../utils/getRequestBody.js";
import { GlobalConfig } from "../config/globalConfig.js";

function formatRoute(route) {
  return route.replace(/{[^}]+}/g, "1");
}

function extractResponseSchema(pathData, method) {
  const response200 = pathData[method]?.responses?.["200"];
  const jsonContent = response200?.content?.["application/json"];
  return jsonContent?.schema || null;
}

async function runMethodTests(paths, method, token = "") {
  const results = [];
  const baseUrl = GlobalConfig.baseUrl;

  for (const route in paths) {
    if (paths[route][method]) {
      const formattedRoute = formatRoute(route);
      const url = `${baseUrl}${formattedRoute}`;

      const headers = {};
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const data = getRequestBody(route, paths[route][method]);
      const expectedSchema = extractResponseSchema(paths[route], method);

      const result = await requestWithFormat({
        method,
        url,
        data,
        route,
        headers,
        expectedSchema,
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
