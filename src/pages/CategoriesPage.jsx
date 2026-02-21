import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Categories from "../components/Categories.jsx";
import Button from "../components/buttons/Button";
import Footer from "../components/Footer";
import baseURL from "../routes/api.js";

export default function CategoriesPage() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoadingList] = useState(false);
  const [error, setError] = useState("");
  const [searchId, setSearchId] = useState("");

  async function loadCategories() {
    try {
      setError("");
      setLoadingList(true);

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
      setLoadingList(false);
    }
  }

  async function findCategoryById() {
    if (!searchId) {
      await loadCategories();
      return;
    }

    try {
      setError("");
      setLoadingList(true);

      const res = await fetch(`${baseURL}/categories/${searchId}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const category = await res.json();

      // Coloca o usuário encontrado na lista
      setCategories([category]);
    } catch (e) {
      setError(e?.message || "Category not found");
      setCategories([]);
    } finally {
      setLoadingList(false);
    }
  }

  return (
    <div class="flex flex-col min-h-screen">
      <div class="flex flex-col flex-grow m-12 p-6 max-w-5xl mx-auto">
        <h2 class="flex justify-center">Categories</h2>

        <div className="flex gap-2 justify-center my-4">
          <input
            type="number"
            placeholder="Search for ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            class="border p-2 rounded"
          />

          <Button onClick={findCategoryById}>Search</Button>
        </div>

        <div class="border bg-gray-200 m-9 min-inline-xs">
          <Categories categories={categories} />
        </div>

        <Button
          onClick={loadCategories}
          disabled={loading}
          style={{ padding: "8px 12px" }}
        >
          {loading ? "Carregando..." : "Load categories"}
        </Button>

      </div>
      <Footer />
    </div>
  );
}
