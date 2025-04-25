export const mockPayloads = {
  "/users": {
    post: { name: "Novo Usuário", email: "novo@exemplo.com" },
    put: { name: "Usuário Atualizado" },
  },
  "/users/1": {
    put: { name: "Atualizando Usuário 1" },
    delete: {},
  },
};
