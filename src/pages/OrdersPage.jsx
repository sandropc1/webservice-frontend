import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Orders from "../components/Orders.jsx";

const API = "http://localhost:8080";

export default function OrdersPage() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadOrders() {
    try {
      setError("");
      setLoading(true);

      const res = await fetch(`${API}/orders`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const json = await res.json();
      const list = Array.isArray(json) ? json : (json.content ?? json.orders ?? []);
      setOrders(list);
    } catch (e) {
      setError(e?.message || "Erro ao carregar pedidos");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>

      <h2>Orders</h2>

      <button onClick={loadOrders} disabled={loading} style={{ padding: "8px 12px" }}>
        {loading ? "Carregando..." : "Carregar pedidos"}
      </button>

      {error && <p style={{ color: "crimson" }}>Erro: {error}</p>}

      <div style={{ marginTop: 12 }}>
        <Orders orders={orders} />
      </div>

      <button onClick={() => navigate("/")} style={{ padding: "6px 10px", marginBottom: 12 }}>
        Voltar para Home
      </button>
    </div>
  );
}