import fs from "fs";
import path from "path";

import { runTestsByMethod } from "./testRunner.js";
import { logResult } from "../utils/logger.js";

export async function runAllTests() {
  const swaggerPath = path.resolve("src", "examples", "api_example.json");
  const swaggerRaw = fs.readFileSync(swaggerPath, "utf-8");
  const swaggerJson = JSON.parse(swaggerRaw);

  const paths = swaggerJson.paths;

  const allResults = [];
  const methods = ["get", "post", "put", "delete"];

  console.log("📊 Resultados dos testes:");

  for (const method of methods) {
    const results = await runTestsByMethod[method](paths);
    results.forEach(logResult);
    allResults.push(...results);
  }

  return allResults;
}
