import Button from "../buttons/Button";

export default function UsersActions({
  usersCount,
  onLoad,
  onToggleForm,
  loading,
  creating,
  showForm
}) {
  return (
    <div class = "flex item-center flex-wrap gap-8 ">
      <Button
        onClick={onLoad}
        disabled={loading || creating}
        style={{ padding: "8px 12px" }}
      >
        {loading ? "Carregando..." : "Carregar usuários"}
      </Button>

      <Button
        onClick={onToggleForm}
        disabled={creating}
        style={{ padding: "8px 12px" }}
      >
        {showForm ? "Fechar cadastro" : "Adicionar usuário"}
      </Button>

    </div>
  );
}