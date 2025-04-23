import express from "express";

const app = express();
app.use(express.json());

let users = [
  { id: 1, nome: "João", email: "joao@email.com" },
  { id: 2, nome: "Maria", email: "maria@email.com" },
];

// GET /users
app.get("/users", (req, res) => {
  res.status(200).json(users);
});

// GET /users/:id
app.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (user) return res.status(200).json(user);
  return res.status(404).json({ message: "Usuário não encontrado" });
});

// POST /users
app.post("/users", (req, res) => {
  const newUser = {
    id: users.length + 1,
    nome: req.body.nome,
    email: req.body.email,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT /users/:id
app.put("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

  user.nome = req.body.nome || user.nome;
  user.email = req.body.email || user.email;

  res.status(200).json(user);
});

// DELETE /users/:id
app.delete("/users/:id", (req, res) => {
  users = users.filter((u) => u.id !== parseInt(req.params.id));
  res.status(204).send();
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Mock API rodando em http://localhost:${PORT}`);
});
