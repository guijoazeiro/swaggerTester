import { runAllTests } from "./service/testManager.js";

const results = await runAllTests();

console.log("📊 Resultados dos testes:");
for (const result of results) {
  if (!result.error) {
    console.log(
      `✅ ${result.method} ${result.route} - Status: ${result.status} - Tempo de resposta: ${result.responseTime}ms`
    );
  } else {
    console.log(
      `❌ ${result.method} ${result.route} - Status: ${result.status} - Error: ${result.error} - Tempo de resposta: ${result.responseTime}ms`
    );
  }
}
