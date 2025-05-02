import fs from "fs";
import path from "path";
import open from "open";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function generateHtmlReport(results) {
  const total = results.length;
  const successCount = results.filter((r) => r.success).length;
  const errorCount = total - successCount;

  const filePath = path.join(__dirname, "..", "report", "report.html");

  const rows = results
    .map((result) => {
      let statusColor = result.success ? "success" : "error";
      if (result.warning) statusColor = "warning";

      let action = "-";
      if (result.error && result.warning) {
        action = `<button class="view-error" onclick="showErrorModal(\`${escapeHtml(
          result.error
        )}\`)">Ver aviso</button>`;
      } else if (result.error) {
        action = `<button class="view-error" onclick="showErrorModal(\`${escapeHtml(
          result.error
        )}\`)">Ver erro</button>`;
      }

      return `
      <tr class="${statusColor}">
        <td>${result.method}</td>
        <td>${result.route}</td>
        <td>${result.status}</td>
        <td>${result.responseTime}ms</td>
        <td>${action}</td>
      </tr>
    `;
    })
    .join("");

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Relatório de Testes</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: #f4f6f8;
      margin: 0;
      padding: 20px;
      color: #333;
    }
    h1, h2 {
      text-align: center;
    }
    .filters {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin-bottom: 20px;
    }
    .filters button {
      padding: 8px 16px;
      border: none;
      background: #007BFF;
      color: white;
      border-radius: 6px;
      cursor: pointer;
    }
    .filters button:hover {
      background: #0056b3;
    }
    table {
      width: 100%;
      margin-top: 20px;
      border-collapse: collapse;
      background: white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      border-radius: 8px;
      overflow: hidden;
    }
    th, td {
      padding: 12px;
      border-bottom: 1px solid #eee;
      text-align: center;
    }
    tr.success { background-color: #e6ffed; }
    tr.error { background-color: #ffe6e6; }
    tr.warning { background-color: #fff3cd; }
    .chart-container {
      width: 100%;
      max-width: 400px;
      margin: 30px auto 0;
    }
    /* Modal */
    .modal {
      display: none;
      position: fixed;
      z-index: 999;
      padding-top: 100px;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      background-color: rgba(0,0,0,0.4);
      animation: fadeIn 0.3s;
    }
    .modal-content {
      background-color: #fff;
      margin: auto;
      padding: 20px;
      border: 1px solid #ccc;
      width: 80%;
      max-width: 500px;
      border-radius: 8px;
      animation: slideIn 0.4s;
    }
    .close {
      color: #aaa;
      float: right;
      font-size: 28px;
      font-weight: bold;
      cursor: pointer;
    }
    .close:hover {
      color: black;
    }
    .view-error {
      background: #dc3545;
      border: none;
      color: white;
      padding: 5px 10px;
      border-radius: 4px;
      cursor: pointer;
    }
    .view-error:hover {
      background: #c82333;
    }

    @keyframes fadeIn {
      from {opacity: 0;}
      to {opacity: 1;}
    }
    @keyframes slideIn {
      from {transform: translateY(-50px);}
      to {transform: translateY(0);}
    }
  </style>
</head>
<body>

<h1>📊 Relatório de Testes</h1>

<div class="filters">
  <button onclick="filterResults('all')">Todos</button>
  <button onclick="filterResults('success')">Sucessos</button>
  <button onclick="filterResults('error')">Erros</button>
  <button onclick="filterResults('warning')">Avisos</button>
</div>

<div class="chart-container">
  <canvas id="chart"></canvas>
</div>

<table id="resultsTable">
  <thead>
    <tr>
      <th>Método</th>
      <th>Rota</th>
      <th>Status</th>
      <th>Tempo</th>
      <th>Erro</th>
    </tr>
  </thead>
  <tbody>
    ${rows}
  </tbody>
</table>

<!-- Modal -->
<div id="errorModal" class="modal">
  <div class="modal-content">
    <span class="close" onclick="closeErrorModal()">&times;</span>
    <h2>Detalhes do Erro</h2>
    <pre id="errorText" style="white-space: pre-wrap;"></pre>
  </div>
</div>

<script>
const ctx = document.getElementById('chart').getContext('2d');
new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['Sucesso', 'Erro', 'Aviso'],
    datasets: [{
      data: [${successCount}, ${errorCount}, ${
    results.filter((r) => r.warning).length
  }],
      backgroundColor: ['#28a745', '#dc3545', '#ffc107'],
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' }
    }
  }
});

function filterResults(type) {
  const rows = document.querySelectorAll("#resultsTable tbody tr");
  rows.forEach(row => {
    if (type === 'all') {
      row.style.display = '';
    } else if (row.classList.contains(type)) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}

function showErrorModal(error) {
  const modal = document.getElementById("errorModal");
  const errorText = document.getElementById("errorText");
  errorText.textContent = error;
  modal.style.display = "block";
}

function closeErrorModal() {
  const modal = document.getElementById("errorModal");
  modal.style.display = "none";
}

window.onclick = function(event) {
  const modal = document.getElementById("errorModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
</script>

</body>
</html>
`;

  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, html, "utf-8");

  open(filePath);
}
