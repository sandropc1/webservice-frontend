import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Categories from "../components/Categories.jsx";
import Button from "../components/buttons/Button";
import Footer from "../components/Footer";
import baseURL from "../routes/api.js";

export default function CategoriesPage() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadCategories() {
    try {
      setError("");
      setLoading(true);

      const res = await fetch(`${baseURL}/categories`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const json = await res.json();
      const list = Array.isArray(json)
        ? json
        : (json.content ?? json.categories ?? []);
      setCategories(list);
    } catch (e) {
      setError(e?.message || "Erro ao carregar categorias");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div class="flex flex-col min-h-screen">
      <div class="flex flex-col flex-grow m-12 p-6 max-w-5xl mx-auto">
        <h2 class="flex justify-center">Categories</h2>

        <Button
          onClick={loadCategories}
          disabled={loading}
          style={{ padding: "8px 12px" }}
        >
          {loading ? "Carregando..." : "Carregar categorias"}
        </Button>

        <div class="border bg-gray-200 m-9 min-inline-xs">
          <Categories categories={categories} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
