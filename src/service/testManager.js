import fs from "fs";
import path from "path";

import { runGetTests, runPostTests } from "./testRunner.js";

export async function runAllTests() {
  const swaggerPath = path.resolve("src", "examples", "api_example.json");
  const swaggerRaw = fs.readFileSync(swaggerPath, "utf-8");
  const swaggerJson = JSON.parse(swaggerRaw);

  const paths = swaggerJson.paths;
  const [getResults, postResults] = await Promise.all([
    runGetTests(paths),
    runPostTests(paths),
  ]);

  return [...getResults, ...postResults];
}
