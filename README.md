# 📋 API Test Runner

Automatizador de testes de API baseado em Swagger/OpenAPI.

Este projeto carrega um arquivo Swagger, gera chamadas HTTP automaticamente para cada rota (GET, POST, PUT, DELETE), e gera relatórios de execução.

---

## 🚀 Tecnologias usadas

- Node.js
- Axios
- Swagger/OpenAPI (arquivo JSON)
- Prompts
- HTML Report Generator (customizado)

---

## 📂 Estrutura do projeto

```
src/
 ├── config/
 │    └── globalConfig.js     # Configuração global utilizada pela CLI e módulos
 │
 ├── examples/
 │    └── api_example.json    # Exemplo de Swagger para rodar os testes
 │
 ├── report/
 │    └── report.html         # Relatório HTML de execução dos testes
 |
 ├── service/
 │    └── testManager.js      # Gerenciador dos testes (roda todos os testes)
 │    ├── swaggerParse.js     # Parseia o Swagger
 │    ├── testRunner.js       # Executa os testes
 │
 ├── utils/
 |    ├── auth.js             # Gera token de autenticação
 |    |── formatResult.js     # Formata o resultado da requisição
 │    ├── logger.js            # Funções para logar resultados no console
 │    ├── reporter.js          # Gera relatório HTML dos testes
 │    ├── requestWithFormat.js # Faz requisições HTTP formatadas e padronizadas
 │
 └── index.js             # Executa testes baseado nas rotas/métodos do Swagger
```

---

## 📈 Como rodar

1. Instale as dependências:

```bash
pnpm install
```

2. Execute a CLI:

```bash
pnpm start
```

Ou:

```bash
node src/service/testManager.js
```

### A CLI perguntará:

- Caminho do Swagger

- URL base da API

- Métodos que deseja testar (GET, POST, PUT, DELETE)

- Se precisa de autenticação

- Credenciais (usuário, senha, URL de login)

- Tempo máximo de resposta permitido

- Se deseja gerar relatório HTML

---

## 📋 Como funciona

- Lê todas as rotas do Swagger.
- Para cada rota:
  - Faz requisição HTTP para GET, POST, PUT e DELETE (se existirem).
  - Para rotas especiais (ex: `/auth/login`), envia payloads específicos.
- Registra os resultados:
  - Sucesso (✅) ou Erro (❌).
  - Tempo de resposta.
- Gera:
  - Um relatório visual no console (por grupos).
  - Um relatório em HTML.

---

## 📄 Licença

MIT License.

---
