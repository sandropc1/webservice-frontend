import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Products from "../components/Products.jsx";
import Button from "../components/buttons/Button";
import Footer from "../components/Footer";
import baseURL from "../routes/api.js";

export default function ProductsPage() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadProducts() {
    try {
      setError("");
      setLoading(true);

      const res = await fetch(`${baseURL}/products`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const json = await res.json();
      const list = Array.isArray(json)
        ? json
        : (json.content ?? json.products ?? []);
      setProducts(list);
    } catch (e) {
      setError(e?.message || "Erro ao carregar produtos");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div class="flex flex-col min-h-screen">
      <div class="flex flex-col flex-grow m-12 p-6 max-w-5xl mx-auto">
        <h2 class="flex justify-center">Products</h2>

        <Button
          onClick={loadProducts}
          disabled={loading}
        >
          {loading ? "Carregando..." : "Carregar produtos"}
        </Button>

        <div class="border bg-gray-200 m-9 min-inline-xs">
          <Products products={products} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
