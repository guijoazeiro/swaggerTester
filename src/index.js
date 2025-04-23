import { parseSwagger } from "./service/swaggerParse.js";
import { runGetTests } from "./service/testRunner.js";

async function main() {
  const swaggerPath = "src/examples/api_example.json";
  const api = await parseSwagger(swaggerPath);
  if (!api) return;

  const results = await runGetTests(api.paths);
  for (const result of results) {
    if (result.status) {
      console.log(`${result.route} - ${result.status} - ✅ OK`);
    } else {
      console.log(`${result.route} - ${result.error} - ❌ FAIL`);
    }
  }
}
main();
