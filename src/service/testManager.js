import fs from "fs";
import path from "path";

import { runTestsByMethod } from "./testRunner.js";
import { logResult, showGroupedTables } from "../utils/logger.js";
import { generateHtmlReport } from "../utils/reporter.js";
import authManager from "../utils/auth.js";

export async function runAllTests() {
  const swaggerPath = path.resolve("src", "examples", "api_example.json");
  const swaggerRaw = fs.readFileSync(swaggerPath, "utf-8");
  const swaggerJson = JSON.parse(swaggerRaw);

  const paths = swaggerJson.paths;
  const securitySchemes = swaggerJson.components?.securitySchemes || {};

  const allResults = [];
  const methods = ["get", "post", "put", "delete"];

  let token = "";

  const swaggerRequiresAuth = Object.keys(securitySchemes).length > 0;
  if (swaggerRequiresAuth) {
    token = await authManager.getToken();
  }

  console.log("📊 Resultados dos testes:");

  for (const method of methods) {
    const results = await runTestsByMethod[method](paths, token); // passa o token
    results.forEach(logResult);
    allResults.push(...results);
  }

  showGroupedTables();
  generateHtmlReport(allResults);

  return allResults;
}
