import fs from "fs";
import path from "path";
import open from "open";

export function generateHtmlReport(results) {
  const total = results.length;
  const passed = results.filter((result) => result.success).length;
  const failed = total - passed;

  const totalTime = results.reduce(
    (acc, result) => acc + result.responseTime,
    0
  );
  const html = `
  <html>
    <head>
      <title>Relatório de Testes</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; background: #f7f7f7; }
        h1 { color: #333; }
        .summary { margin-bottom: 20px; }
        .summary span { display: inline-block; margin-right: 15px; font-weight: bold; }
        .result { padding: 10px; margin-bottom: 5px; border-left: 5px solid; background: #fff; }
        .success { border-color: green; }
        .fail { border-color: red; }
      </style>
    </head>
    <body>
      <h1>📊 Relatório de Testes</h1>
      <div class="summary">
        <span>Total: ${total}</span>
        <span>Passaram: ${passed}</span>
        <span>Falharam: ${failed}</span>
        <span>Tempo Total: ${totalTime}ms</span>
      </div>
      <div>
        ${results
          .map(
            (r) => `
          <div class="result ${r.success ? "success" : "fail"}">
            <strong>${r.method} ${r.route}</strong> — 
            Status: ${r.status} — 
            Tempo: ${r.responseTime}ms 
            ${r.error ? `— Erro: ${r.error}` : ""}
          </div>
        `
          )
          .join("")}
      </div>
    </body>
  </html>
`;

  const reportPath = path.resolve("report.html");
  fs.writeFileSync(reportPath, html);
  open(reportPath);
}
