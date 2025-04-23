import fs from "fs";
import path from "path";

import {
  runGetTests,
  runPostTests,
  runPutTests,
  runDeleteTests,
} from "./testRunner.js";

export async function runAllTests() {
  const swaggerPath = path.resolve("src", "examples", "api_example.json");
  const swaggerRaw = fs.readFileSync(swaggerPath, "utf-8");
  const swaggerJson = JSON.parse(swaggerRaw);

  const paths = swaggerJson.paths;

  const postResults = await runPostTests(paths);
  const getResults = await runGetTests(paths);
  const putResults = await runPutTests(paths);
  const deleteResults = await runDeleteTests(paths);

  return [...postResults, ...getResults, ...putResults, ...deleteResults];
}
