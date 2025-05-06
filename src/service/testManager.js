import fs from "fs";
import path from "path";

import { runTestsByMethod } from "./testRunner.js";
import { logResult, showGroupedTables } from "../utils/logger.js";
import { generateHtmlReport } from "../utils/reporter.js";
import authManager from "../utils/auth.js";
import { GlobalConfig } from "../config/globalConfig.js";

export async function runAllTests(options = {}) {
  const {
    swaggerPath = path.resolve("src", "examples", "api_example.json"),
    baseUrl = "http://localhost:3000",
    methods = ["get", "post", "put", "delete"],
    auth = null,
    maxDuration = 100,
    generateReport = true,
  } = options;

  const swaggerRaw = fs.readFileSync(swaggerPath, "utf-8");
  const swaggerJson = JSON.parse(swaggerRaw);

  const paths = swaggerJson.paths;
  const securitySchemes = swaggerJson.components?.securitySchemes || {};

  const allResults = [];

  GlobalConfig.init({
    baseUrl,
    authUrl: auth ? `${baseUrl}${auth.url}` : null,
    authUsername: auth ? auth.username : null,
    authPassword: auth ? auth.password : null,
    maxDuration,
  });

  if (auth) {
    authManager.override(auth);
  }

  let token = "";

  if (auth || Object.keys(securitySchemes).length > 0) {
    token = await authManager.getToken();
  }

  const swaggerRequiresAuth = Object.keys(securitySchemes).length > 0;
  if (swaggerRequiresAuth) {
    token = await authManager.getToken();
  }

  console.log("\n📊 Resultados dos testes:");

  for (const method of methods) {
    const results = await runTestsByMethod[method](paths, token); // passa o token
    results.forEach(logResult);
    allResults.push(...results);
  }

  showGroupedTables();
  if (generateReport) generateHtmlReport(allResults);

  return allResults;
}
