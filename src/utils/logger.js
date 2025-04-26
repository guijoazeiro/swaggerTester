import chalk from "chalk";
import Table from "cli-table3";

const groupedResults = {
  GET: [],
  POST: [],
  PUT: [],
  DELETE: [],
  UNKNOWN: [],
};

export function logResult(result) {
  const { method = "UNKNOWN" } = result;
  const key = groupedResults[method] ? method : "UNKNOWN";
  groupedResults[key].push(result);
}

function createTable(results, method) {
  const table = new Table({
    head: [
      chalk.bold("Status"),
      chalk.bold("Rota"),
      chalk.bold("Código HTTP"),
      chalk.bold("Tempo"),
      chalk.bold("Erro"),
    ],
    colWidths: [8, 45, 12, 10, 40],
    style: { head: [], border: [] },
  });

  results.forEach(({ route, status, success, responseTime, error }) => {
    const statusIcon = success ? chalk.green("✅") : chalk.red("❌");

    const statusColor = success ? chalk.green(status) : chalk.red(status);

    const timeColor =
      responseTime > 1000
        ? chalk.red(`${responseTime}ms`)
        : responseTime > 500
        ? chalk.yellow(`${responseTime}ms`)
        : chalk.green(`${responseTime}ms`);

    table.push([
      statusIcon,
      chalk.blue(route),
      statusColor,
      timeColor,
      error ? chalk.redBright(error) : "-",
    ]);
  });

  return table;
}

export function showGroupedTables() {
  let total = 0;
  let passed = 0;
  let failed = 0;

  for (const method of ["GET", "POST", "PUT", "DELETE", "UNKNOWN"]) {
    const results = groupedResults[method];
    if (results.length === 0) continue;

    console.log(`\n${chalk.bold.underline(`${method} Requests:`)}\n`);
    console.log(createTable(results, method).toString());

    total += results.length;
    passed += results.filter((r) => r.success).length;
    failed += results.filter((r) => !r.success).length;
  }

  console.log("\n" + chalk.bold("📊 Resumo Final:"));
  console.log(
    `${chalk.green(`✅ Passaram: ${passed}`)} | ${chalk.red(
      `❌ Falharam: ${failed}`
    )} | ${chalk.blue(`🔢 Total: ${total}`)}`
  );
}
