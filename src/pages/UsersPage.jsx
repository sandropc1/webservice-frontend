import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Users from "../components/Users.jsx";
import baseURL from "../routes/api.js";

export default function UsersPage() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loadingList, setLoadingList] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  async function loadUsers() {
    try {
      setError("");
      setLoadingList(true);

      const res = await fetch(`${baseURL}/users`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const json = await res.json();
      const list = Array.isArray(json) ? json : (json.content ?? json.users ?? []);
      setUsers(list);
    } catch (e) {
      setError(e?.message || "Erro ao carregar usuários");
    } finally {
      setLoadingList(false);
    }
  }

  async function createUser(e) {
    e.preventDefault();

    try {
      setError("");
      setCreating(true);

      const payload = { name, email, phone, password };

      const res = await fetch(`${baseURL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `HTTP ${res.status}`);
      }

      const created = await res.json().catch(() => null);

      if (created) setUsers((prev) => [created, ...prev]);
      else await loadUsers();

      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setShowForm(false);
    } catch (e2) {
      setError(e2?.message || "Erro ao criar usuário");
    } finally {
      setCreating(false);
    }
  }

  return (
    <div>
      <h2>Usuários</h2>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        <button
          onClick={loadUsers}
          disabled={loadingList || creating}
          style={{ padding: "8px 12px" }}
        >
          {loadingList ? "Carregando..." : "Carregar usuários"}
        </button>

        <button
          onClick={() => setShowForm((v) => !v)}
          disabled={creating}
          style={{ padding: "8px 12px" }}
        >
          {showForm ? "Fechar cadastro" : "Adicionar usuário"}
        </button>
      </div>

      {error && <p style={{ color: "crimson" }}>Erro: {error}</p>}

      {showForm && (
        <div style={{ marginTop: 12, padding: 12, border: "1px solid #ddd", borderRadius: 8, maxWidth: 520 }}>
          <h3 style={{ marginTop: 0 }}>Criar usuário</h3>

          <form onSubmit={createUser} style={{ display: "grid", gap: 10 }}>
            <label style={{ display: "grid", gap: 6 }}>
              Nome
              <input value={name} onChange={(e) => setName(e.target.value)} required />
            </label>

            <label style={{ display: "grid", gap: 6 }}>
              Email
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
            </label>

            <label style={{ display: "grid", gap: 6 }}>
              Telefone
              <input value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="tel" />
            </label>

            <label style={{ display: "grid", gap: 6 }}>
              Senha
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                minLength={6}
                required
              />
            </label>

            <button type="submit" disabled={creating} style={{ padding: "8px 12px" }}>
              {creating ? "Salvando..." : "Salvar"}
            </button>

            <pre style={{ background: "#111", color: "#0f0", padding: 12, borderRadius: 8, overflow: "auto" }}>
              {JSON.stringify({ name, email, phone, password }, null, 2)}
            </pre>
          </form>
        </div>
      )}

      <div style={{ marginTop: 12 }}>
        <Users users={users} />
      </div>

      <button onClick={() => navigate("/")} style={{ padding: "6px 10px", marginBottom: 12 }}>
        Voltar para Home
      </button>
    </div>
  );
}