import prompts from "prompts";
import path from "path";
import { runAllTests } from "./service/testManager.js";

async function main() {
  const response = await prompts([
    {
      type: "text",
      name: "swaggerPath",
      message: "Qual o caminho para o arquivo Swagger?",
      initial: "src/examples/api_example.json",
    },
    {
      type: "text",
      name: "baseUrl",
      message: "Qual a URL base da API?",
      initial: "http://localhost:3000",
    },
    {
      type: "multiselect",
      name: "methods",
      message: "Quais métodos deseja testar?",
      choices: [
        { title: "GET", value: "get" },
        { title: "POST", value: "post" },
        { title: "PUT", value: "put" },
        { title: "DELETE", value: "delete" },
      ],
      min: 1,
    },
    {
      type: "confirm",
      name: "requiresAuth",
      message: "A API exige autenticação?",
      initial: true,
    },
    {
      type: (prev) => (prev ? "text" : null),
      name: "authUrl",
      message: "Caminho de autenticação: ",
      initial: "/auth/login",
    },
    {
      type: (prev) => (prev ? "text" : null),
      name: "username",
      message: "Usuário:",
    },
    {
      type: (prev) => (prev ? "password" : null),
      name: "password",
      message: "Senha:",
    },
    {
      type: "number",
      name: "maxDuration",
      message: "Tempo máximo de resposta (ms):",
      initial: 10,
    },
    {
      type: "confirm",
      name: "generateReport",
      message: "Deseja gerar o relatório HTML?",
      initial: true,
    },
  ]);

  await runAllTests({
    swaggerPath: path.resolve(response.swaggerPath),
    methods: response.methods,
    baseUrl: response.baseUrl,
    requiresAuth: response.requiresAuth,
    auth: response.requiresAuth
      ? {
          url: response.authUrl,
          username: response.username,
          password: response.password,
        }
      : null,
    maxDuration: response.maxDuration,
    generateReport: response.generateReport,
  });
}

main();
