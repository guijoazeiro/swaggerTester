import chalk from "chalk";

export function logResult(result) {
  const { method, route, status, success, responseTime, error = null } = result;
  const methodColor =
    {
      GET: chalk.cyan,
      POST: chalk.green,
      PUT: chalk.yellow,
      DELETE: chalk.red,
    }[method] || chalk.white;
  const statusColor = success ? chalk.green : chalk.red;
  const timeColor = responseTime > 1000 ? chalk.red : chalk.gray;

  console.log(
    `${methodColor(method)} ${chalk.blue(route)} - ` +
      `${statusColor(status)} - ${timeColor(`${responseTime}ms`)}` +
      (error ? ` - ${chalk.redBright(error)}` : "")
  );
}
