import fs from "fs";
import path from "path";

import { runTestsByMethod } from "./testRunner.js";

export async function runAllTests() {
  const swaggerPath = path.resolve("src", "examples", "api_example.json");
  const swaggerRaw = fs.readFileSync(swaggerPath, "utf-8");
  const swaggerJson = JSON.parse(swaggerRaw);

  const paths = swaggerJson.paths;

  const allResults = [];
  const methods = ["get", "post", "put", "delete"];

  for (const method of methods) {
    const results = await runTestsByMethod[method](paths);
    allResults.push(...results);
  }

  return allResults;
}
