import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Products from "../components/Products.jsx";
import Button from "../components/buttons/Button";
import Footer from "../components/Footer";
import baseURL from "../routes/api.js";

export default function ProductsPage() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoadingList] = useState(false);
  const [error, setError] = useState("");
  const [searchId, setSearchId] = useState("");

  async function loadProducts() {
    try {
      setError("");
      setLoadingList(true);

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
      setLoadingList(false);
    }
  }

  async function findProductById() {
    if (!searchId) {
      await loadProducts();
      return;
    }

    try {
      setError("");
      setLoadingList(true);

      const res = await fetch(`${baseURL}/products/${searchId}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const product = await res.json();

      // Coloca o usuário encontrado na lista
      setProducts([product]);
    } catch (e) {
      setError(e?.message || "Product not found");
      setProducts([]);
    } finally {
      setLoadingList(false);
    }
  }

  return (
    <div class="flex flex-col min-h-screen">
      <div class="flex flex-col flex-grow m-12 p-6 max-w-5xl mx-auto">
        <h2 class="flex justify-center">Products</h2>

        <div className="flex gap-2 justify-center my-4">
          <input
            type="number"
            placeholder="Search for ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            class="border p-2 rounded"
          />

          <Button onClick={findProductById}>Search</Button>
        </div>

        <div class="border bg-gray-200 m-9 min-inline-xs">
          <Products products={products} />
        </div>

        <Button onClick={loadProducts} disabled={loading}>
          {loading ? "Loading..." : "Load products"}
        </Button>
      </div>
      <Footer />
    </div>
  );
}
