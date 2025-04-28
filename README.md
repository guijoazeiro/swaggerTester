# 📋 API Test Runner

Automatizador de testes de API baseado em Swagger/OpenAPI.

Este projeto carrega um arquivo Swagger, gera chamadas HTTP automaticamente para cada rota (GET, POST, PUT, DELETE), e gera relatórios de execução.

---

## 🚀 Tecnologias usadas

- Node.js
- Axios
- Swagger/OpenAPI (arquivo JSON)
- HTML Report Generator (customizado)
- Dotenv (variáveis de ambiente)

---

## 📂 Estrutura do projeto

```
src/
 ├── config/
 │    └── envConfig.js        # Configurações de ambiente (baseUrl, credenciais, etc.)
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

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env` na raiz:

```bash
# .env
BASE_URL=https://sua.api.aqui.com
TEST_USERNAME=admin
TEST_PASSWORD=admin
```

---

## 📈 Como rodar

1. Instale as dependências:

```bash
pnpm install
```

2. Certifique-se de ter o arquivo `api_example.json` em `src/examples/`.

3. Execute:

```bash
pnpm start
```

Ou:

```bash
node src/service/testManager.js
```

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
