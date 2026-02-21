import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Orders from "../components/Orders.jsx";
import Button from "../components/buttons/Button";
import Footer from "../components/Footer";
import baseURL from "../routes/api.js";

export default function OrdersPage() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoadingList] = useState(false);
  const [error, setError] = useState("");
  const [searchId, setSearchId] = useState("");

  async function loadOrders() {
    try {
      setError("");
      setLoadingList(true);

      const res = await fetch(`${baseURL}/orders`);
      if (!res.ok) throw new Error(`HTTP ${res.sktatus}`);

      const json = await res.json();
      const list = Array.isArray(json)
        ? json
        : (json.content ?? json.orders ?? []);
      setOrders(list);
    } catch (e) {
      setError(e?.message || "Erro ao carregar pedidos");
    } finally {
      setLoadingList(false);
    }
  }

  async function findOrderById() {
    if (!searchId) {
      await loadOrders();
      return;
    }

    try {
      setError("");
      setLoadingList(true);

      const res = await fetch(`${baseURL}/orders/${searchId}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const order = await res.json();

      // Coloca o usuário encontrado na lista
      setOrders([order]);
    } catch (e) {
      setError(e?.message || "Order not found");
      setOrders([]);
    } finally {
      setLoadingList(false);
    }
  }

  return (
    <div class="flex flex-col min-h-screen">
      <div class="flex flex-col flex-grow m-12 p-6 max-w-5xl mx-auto">
        <h2 class="flex justify-center">Orders</h2>

        <div className="flex gap-2 justify-center my-4">
          <input
            type="number"
            placeholder="Search for ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            class="border p-2 rounded"
          />

          <Button onClick={findOrderById}>Search</Button>
        </div>

        <div class="border bg-gray-200 m-9 min-inline-xs">
          <Orders orders={orders} />
        </div>

        <Button onClick={loadOrders} disabled={loading}>
          {loading ? "Loading..." : "Load orders"}
        </Button>
      </div>
      <Footer />
    </div>
  );
}
